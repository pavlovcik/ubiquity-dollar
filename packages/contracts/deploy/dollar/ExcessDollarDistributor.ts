import { DeployFuncParam } from "../utils";
import { create } from "../create"

export const optionDefinitions = [
    { name: 'task', defaultOption: true },
    { name: 'manager', alias: 'm', type: String }
]

const func = async (params: DeployFuncParam) => {
    const contractInstance = "src/dollar/ExcessDollarDistributor.sol:ExcessDollarDistributor";
    const { env, args } = params;
    const manager = args.manager;

    const { result, stderr } = await create({ ...env, name: args.task, contractInstance, constructorArguments: [manager] });
    return !stderr ? "succeeded" : "failed"
}
export default func;