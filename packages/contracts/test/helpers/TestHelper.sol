// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import {UbiquityAlgorithmicDollarManager} from "../../src/dollar/UbiquityAlgorithmicDollarManager.sol";
import {UbiquityGovernance} from "../../src/dollar/UbiquityGovernance.sol";
import {MockDebtCoupon} from "../../src/dollar/mocks/MockDebtCoupon.sol";
import {MockuADToken} from "../../src/dollar/mocks/MockuADToken.sol";
import {MockTWAPOracle} from "../../src/dollar/mocks/MockTWAPOracle.sol";

import "forge-std/Test.sol";
import "forge-std/console.sol";

abstract contract TestHelper is Test {
    address public constant NATIVE_ASSET = address(0);

    address public admin = address(0x123abc);

    function helpers_deployUbiquityAlgorithmicDollarManager() public returns (address) {
        UbiquityAlgorithmicDollarManager _manager = new UbiquityAlgorithmicDollarManager(admin);

        vm.startPrank(admin);
        // deploy debt token
        MockDebtCoupon _debtCoupon = new MockDebtCoupon(100);
        _manager.setDebtCouponAddress(address(_debtCoupon));

        // deploy uAD token
        MockuADToken _uAD = new MockuADToken(10000e18);
        _manager.setDollarTokenAddress(address(_uAD));

        // deploy twapPrice oracle
        MockTWAPOracle _twapOracle = new MockTWAPOracle(address(0x100), address(_uAD), address(0x101), 100, 100);
        _manager.setTwapOracleAddress(address(_twapOracle));

        // deploy governance token
        UbiquityGovernance _uGov = new UbiquityGovernance(address(_manager));
        _manager.setGovernanceTokenAddress(address(_uGov));
        vm.stopPrank();

        return address(_manager);
    }
}