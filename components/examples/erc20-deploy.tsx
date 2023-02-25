import { useState } from 'react';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Signer, ethers } from 'ethers';
import { useForm } from 'react-hook-form';
import { useSigner } from 'wagmi';

import ERC20ABI from '../../abis/MintableERC20.json';
import { useToken } from '../../lib/state';
import BranchIsWalletConnected from '../shared/branch-is-wallet-connected';

export function DeployERC20Contract() {
  const [token, setToken] = useToken();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { data: signer } = useSigner();

  const [contractAddress, setContractAddress] = useState<string | undefined>();
  const onSubmit = async (data: any) => {
    // https://docs.ethers.org/v5/api/contract/example/#example-erc-20-contract--deploying-a-contract
    const factory = new ethers.ContractFactory(
      ERC20ABI.abi,
      ERC20ABI.bytecode,
      signer as Signer
    );
    const contract = await factory.deploy(data.name, data.symbol);
    const deployed = await contract.deployTransaction.wait();

    setToken(deployed.contractAddress);
    setContractAddress(deployed.contractAddress);
  };

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <label>Name</label>
        <input {...register('name')} className="input" />
        <label>Symbol</label>
        <input {...register('symbol')} className="input" />
        {errors.exampleRequired && <span>This field is required</span>}
        <input type="submit" className="btn-normal" />
      </form>
      {!token ? null : <p className="my-5 text-center">{token}</p>}
    </>
  );
}

export default function ERC20Deploy() {
  return (
    <div className="card">
      <BranchIsWalletConnected>
        <div className="w-full">
          <DeployERC20Contract />
          <hr className="my-4" />
          <h3 className="text-center">ERC20 Deploy</h3>
          <p className="text-center text-sm text-gray-500">
            Deploy a new ERC20 token to any blockchain.
          </p>
        </div>
        <div className="flex items-center justify-center gap-10">
          <>
            <ConnectButton />
          </>
        </div>
      </BranchIsWalletConnected>
    </div>
  );
}
