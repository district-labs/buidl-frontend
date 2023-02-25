import { useState } from 'react';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Signer, ethers } from 'ethers';
import { useForm } from 'react-hook-form';
import { useSigner } from 'wagmi';

import { erc20ABI } from '../../abis/erc20ABI';
import { erc20ByteCode } from '../../abis/erc20ByteCode';
import BranchIsWalletConnected from '../shared/branch-is-wallet-connected';

export function ERC20ContractMintTokens() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { data: signer } = useSigner();

  const [contractAddress, setContractAddress] = useState<string | undefined>();
  const onSubmit = async (data: any) => {
    const factory = new ethers.ContractFactory(
      erc20ABI,
      erc20ByteCode,
      signer as Signer
    );
    const contract = await factory.deploy(
      ethers.utils.parseEther('1000'),
      data.name || 'Token',
      18,
      data.symbol
    );
    const deployed = await contract.deployTransaction.wait();
    setContractAddress(deployed.contractAddress);
  };

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <label>Amount</label>
        <input
          placeholder="1000"
          {...(register('amount'), { required: true })}
          className="input"
        />
        {errors.exampleRequired && <span>This field is required</span>}
        <input type="submit" className="btn-normal" />
      </form>
      {!contractAddress ? null : (
        <span className="my-5 inline-block">{contractAddress}</span>
      )}
    </>
  );
}

export function ERC20ContractTransferTokens() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { data: signer } = useSigner();

  const [contractAddress, setContractAddress] = useState<string | undefined>();
  const onSubmit = async (data: any) => {
    const factory = new ethers.ContractFactory(
      erc20ABI,
      erc20ByteCode,
      signer as Signer
    );
    const contract = await factory.deploy(
      ethers.utils.parseEther('1000'),
      data.name || 'Token',
      18,
      data.symbol
    );
    const deployed = await contract.deployTransaction.wait();
    setContractAddress(deployed.contractAddress);
  };

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <label>Amount</label>
        <input
          placeholder="10"
          {...(register('amount'), { required: true })}
          className="input"
        />
        <label>To</label>
        <input
          placeholder="kames.eth"
          {...register('symbol', { required: true })}
          className="input"
        />
        {errors.exampleRequired && <span>This field is required</span>}
        <input type="submit" className="btn-normal" />
      </form>
      {!contractAddress ? null : (
        <span className="my-5 inline-block">{contractAddress}</span>
      )}
    </>
  );
}

export default function ERC20Write() {
  return (
    <div className="card w-full">
      <BranchIsWalletConnected>
        <div className="w-full">
          <div className="flex w-full justify-center space-x-10">
            <div>
              <h3 className="font-bold">Mint</h3>
              <hr className="my-2" />
              <ERC20ContractMintTokens />
            </div>
            <div>
              <h3 className="font-bold">Transfer</h3>
              <hr className="my-2" />
              <ERC20ContractTransferTokens />
            </div>
          </div>
          <hr className="my-4" />
          <h3 className="text-center">ERC20 Write</h3>
          <p className="text-center text-sm text-gray-500">
            Mint and transfer tokens to a friend.
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
