import { useEffect, useState } from "react";

import { allPools } from "../pools";
import useDeployedAddress from "@/components/lib/hooks/use-deployed-address";
import useWeb3 from "@/components/lib/hooks/use-web-3";
import {
  getChainlinkPriceFeedContract,
  getERC20Contract,
  getSimpleBondContract,
  getUbiquiStickContract,
  getUbiquiStickSaleContract,
} from "@/components/utils/contracts";
import { UbiquiStick, UbiquiStickSale, SimpleBond, ERC20 } from "types";
import { Contract } from "ethers";

const ChainLinkEthUsdAddress = "0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419";

export type Contracts = {
  ubiquiStick: UbiquiStick;
  ubiquiStickSale: UbiquiStickSale;
  simpleBond: SimpleBond;
  rewardToken: ERC20;
  chainLink: Contract; // ChainlinkPriceFeed
};

const useLaunchPartyContracts = (): [Contracts | null, ERC20[], { isSaleContractOwner: boolean; isSimpleBondOwner: boolean }] => {
  const [UbiquiStickAddress, UbiquiStickSaleAddress, SimpleBondAddress] = useDeployedAddress("ubiqui-stick", "ubiqui-stick-sale", "simple-bond");
  const { provider, walletAddress } = useWeb3();
  const [contracts, setContracts] = useState<Contracts | null>(null);
  const [tokensContracts, setTokensContracts] = useState<ERC20[]>([]);
  const [isSaleContractOwner, setIsSaleContractOwner] = useState<boolean>(false);
  const [isSimpleBondOwner, setIsSimpleBondOwner] = useState<boolean>(false);

  useEffect(() => {
    if (!provider || !walletAddress || !provider.network) {
      return;
    }

    (async () => {
      const simpleBond = getSimpleBondContract(SimpleBondAddress, provider);
      const rewardToken = await simpleBond.tokenRewards();
      const contracts = {
        ubiquiStick: getUbiquiStickContract(UbiquiStickAddress, provider),
        ubiquiStickSale: getUbiquiStickSaleContract(UbiquiStickSaleAddress, provider),
        simpleBond,
        rewardToken: getERC20Contract(rewardToken, provider),
        chainLink: getChainlinkPriceFeedContract(ChainLinkEthUsdAddress, provider),
      };

      setContracts(contracts);
      setTokensContracts(allPools.map((pool) => getERC20Contract(pool.tokenAddress, provider)));
      setIsSaleContractOwner((await contracts.ubiquiStickSale.owner()).toLowerCase() === walletAddress.toLowerCase());
      setIsSimpleBondOwner((await contracts.simpleBond.owner()).toLowerCase() === walletAddress.toLowerCase());
    })();
  }, [provider, walletAddress, provider?.network]);

  return [contracts, tokensContracts, { isSaleContractOwner, isSimpleBondOwner }];
};

export default useLaunchPartyContracts;
