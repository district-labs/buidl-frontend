import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'
import ERC20ABI from "./abis/MintableERC20.json";

export default defineConfig({
  out: 'lib/blockchain.ts',
  contracts: [
    {
      name: 'erc20',
      abi: ERC20ABI.abi,
    },
  ],
  plugins: [react()],
})