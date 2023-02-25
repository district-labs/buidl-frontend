import { ConnectButton } from "@rainbow-me/rainbowkit";
import BranchIsWalletConnected from "../shared/branch-is-wallet-connected";
import { useContractAutoLoad } from "../../hooks/use-contract-auto-load";
import { useForm } from "react-hook-form";
import { ethers, Signer, utils } from "ethers";
import { useSigner } from "wagmi";
import { useState } from "react";
import { erc20ABI } from "../../abis/erc20ABI";
import { erc20ByteCode } from "../../abis/erc20ByteCode";
import ERC20EventTransfer from "./erc20-event-transfer";
import { useErc20Transfer } from "../../lib/blockchain";
import { useToken } from "../../lib/state";

export function ERC20ContractTransferTokens() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { data: signer } = useSigner();

  const [token] = useToken();
  const mintAction = useErc20Transfer({
    address: token,
  });

  const onSubmit = async (data: any) => {
    const tx = await mintAction.writeAsync({
      recklesslySetUnpreparedArgs: [data.to, utils.parseEther(data.amount)],
    });
    console.log(tx);
  };

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <label>Amount</label>
        <input placeholder="10" {...register("amount")} className="input" />
        <label>To</label>
        <input placeholder="kames.eth" {...register("to")} className="input" />
        {errors.exampleRequired && <span>This field is required</span>}
        <input type="submit" className="btn-normal" />
      </form>
    </>
  );
}

export default function ERC20WriteTransfer() {
  const contract = useContractAutoLoad("TokenUSDC");

  return (
    <div className="card w-full">
      <BranchIsWalletConnected>
        <div className="w-full">
          <h3 className="font-bold">Transfer</h3>
          <hr className="my-2" />
          <ERC20ContractTransferTokens />
          <hr className="my-4" />
          <ERC20EventTransfer />
          <hr className="my-4" />
          <h3 className="text-center">ERC20 Transfer</h3>
          <p className="text-center text-sm text-gray-500">
            Transer tokens to a friend.
          </p>
        </div>
        <div className="flex items-center gap-10 justify-center">
          <>
            <ConnectButton />
          </>
        </div>
      </BranchIsWalletConnected>
    </div>
  );
}
