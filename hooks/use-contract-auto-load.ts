import { useNetwork } from 'wagmi'

export function useContractAutoLoad(contract: string, chainId?: number): any {
  const { chain } = useNetwork()
  switch (chainId || chain?.id) {
    case 1:
      switch (contract) {
        case 'TokenUSDC':
          return {
            address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
            abi: [],
          }
        default:
          throw new Error(`Unknown contract ${contract}`)
      }
    default:
      return undefined
  }
}