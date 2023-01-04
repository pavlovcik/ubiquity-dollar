export type HardhatRpcMethods =
  | "hardhat_getStackTraceFailuresCount"
  | "hardhat_addCompilationResult"
  | "hardhat_impersonateAccount"
  | "hardhat_intervalMine"
  | "hardhat_getAutomine"
  | "hardhat_stopImpersonatingAccount"
  | "hardhat_reset"
  | "hardhat_setLoggingEnabled"
  | "hardhat_setMinGasPrice"
  | "hardhat_dropTransaction"
  | "hardhat_setBalance"
  | "hardhat_setCode"
  | "hardhat_setNonce"
  | "hardhat_setStorageAt"
  | "hardhat_setNextBlockBaseFeePerGas"
  | "hardhat_setCoinbase"
  | "hardhat_mine";
