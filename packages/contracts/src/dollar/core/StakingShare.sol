// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Pausable.sol";
import "../../dollar/utils/SafeAddArray.sol";
import "../interfaces/IAccessControl.sol";
import "../libraries/Constants.sol";

contract StakingShare is
    ERC1155URIStorage,
    ERC1155Pausable,
    ERC1155Burnable
{
    using SafeAddArray for uint256[];

    struct Stake {
        // address of the minter
        address minter;
        // lp amount deposited by the user
        uint256 lpFirstDeposited;
        uint256 creationBlock;
        // lp that were already there when created
        uint256 lpRewardDebt;
        uint256 endBlock;
        // lp remaining for a user
        uint256 lpAmount;
    }

    // Mapping from account to operator approvals
    mapping(address => uint256[]) private _holderBalances;
    mapping(uint256 => Stake) private _stakes;
    uint256 private _totalLP;
    uint256 private _totalSupply;

    IAccessControl public accessCtrl;

    // ----------- Modifiers -----------
    modifier onlyMinter() {
        require(
            accessCtrl.hasRole(STAKING_SHARE_MINTER_ROLE, msg.sender),
            "Staking Share: not minter"
        );
        _;
    }

    modifier onlyBurner() {
        require(
            accessCtrl.hasRole(STAKING_SHARE_BURNER_ROLE, msg.sender),
            "Staking Share: not burner"
        );
        _;
    }

    modifier onlyPauser() {
        require(
            accessCtrl.hasRole(PAUSER_ROLE, msg.sender),
            "Staking Share: not pauser"
        );
        _;
    }

    /**
     * @dev constructor
     */
    constructor(
        address _manager,
        string memory uri
    ) ERC1155(uri) {
        accessCtrl = IAccessControl(_manager);
    }

    /// @dev update stake LP amount , LP rewards debt and end block.
    /// @param _stakeId staking share id
    /// @param _lpAmount amount of LP token deposited
    /// @param _lpRewardDebt amount of excess LP token inside the staking contract
    /// @param _endBlock end locking period block number
    function updateStake(
        uint256 _stakeId,
        uint256 _lpAmount,
        uint256 _lpRewardDebt,
        uint256 _endBlock
    ) external onlyMinter whenNotPaused {
        Stake storage stake = _stakes[_stakeId];
        uint256 curLpAmount = stake.lpAmount;
        if (curLpAmount > _lpAmount) {
            // we are removing LP
            _totalLP -= curLpAmount - _lpAmount;
        } else {
            // we are adding LP
            _totalLP += _lpAmount - curLpAmount;
        }
        stake.lpAmount = _lpAmount;
        stake.lpRewardDebt = _lpRewardDebt;
        stake.endBlock = _endBlock;
    }

    // @dev Creates `amount` new tokens for `to`, of token type `id`.
    /// @param to owner address
    /// @param lpDeposited amount of LP token deposited
    /// @param lpRewardDebt amount of excess LP token inside the staking contract
    /// @param endBlock block number when the locking period ends
    function mint(
        address to,
        uint256 lpDeposited,
        uint256 lpRewardDebt,
        uint256 endBlock
    ) public virtual onlyMinter whenNotPaused returns (uint256 id) {
        id = _totalSupply + 1;
        _mint(to, id, 1, bytes(""));
        _totalSupply += 1;
        _holderBalances[to].add(id);
        Stake storage _stake = _stakes[id];
        _stake.minter = to;
        _stake.lpFirstDeposited = lpDeposited;
        _stake.lpAmount = lpDeposited;
        _stake.lpRewardDebt = lpRewardDebt;
        _stake.creationBlock = block.number;
        _stake.endBlock = endBlock;
        _totalLP += lpDeposited;
    }

    /**
     * @dev Pauses all token transfers.
     *
     * See {ERC1155Pausable} and {Pausable-_pause}.
     *
     */
    function pause() public virtual onlyPauser {
        _pause();
    }

    /**
     * @dev Unpauses all token transfers.
     *
     * See {ERC1155Pausable} and {Pausable-_unpause}.
     *
     */
    function unpause() public virtual onlyPauser {
        _unpause();
    }

    /**
     * @dev See {IERC1155-safeTransferFrom}.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public override whenNotPaused {
        super.safeTransferFrom(from, to, id, amount, data);
        _holderBalances[to].add(id);
    }

    /**
     * @dev See {IERC1155-safeBatchTransferFrom}.
     */
    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public virtual override whenNotPaused {
        super.safeBatchTransferFrom(from, to, ids, amounts, data);
        _holderBalances[to].add(ids);
    }

    /**
     * @dev Total amount of tokens  .
     */
    function totalSupply() public view virtual returns (uint256) {
        return _totalSupply;
    }

    /**
     * @dev Total amount of LP tokens deposited.
     */
    function totalLP() public view virtual returns (uint256) {
        return _totalLP;
    }

    /**
     * @dev return stake details.
     */
    function getStake(uint256 id) public view returns (Stake memory) {
        return _stakes[id];
    }

    /**
     * @dev array of token Id held by the msg.sender.
     */
    function holderTokens(
        address holder
    ) public view returns (uint256[] memory) {
        return _holderBalances[holder];
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override(ERC1155, ERC1155Pausable) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function uri(
        uint256 tokenId
    ) public view virtual override(ERC1155, ERC1155URIStorage) returns (string memory) {
        return super.uri(tokenId);
    }

    function _burn(
        address account,
        uint256 id,
        uint256 amount
    ) internal virtual override whenNotPaused {
        require(amount == 1, "amount <> 1");
        super._burn(account, id, 1);
        Stake storage _stake = _stakes[id];
        require(_stake.lpAmount == 0, "LP <> 0");
        _totalSupply -= 1;
    }

    /**
     *@dev this function is used to allow the staking manage to fix the uri should anything be wrong with the current one.
     */

    function setUri(uint256 tokenId, string memory tokenUri) external onlyMinter {
        _setURI(tokenId, tokenUri);
    }

    function setUri(string memory tokenUri) external onlyMinter {
        _setURI(tokenUri);
    }

    /**
     *@dev this function is used to allow the staking manage to fix the base uri should anything be wrong with the current one.
     */
    function setBaseUri(string memory newUri) external onlyMinter {
        _setBaseURI(newUri);
    }
}
