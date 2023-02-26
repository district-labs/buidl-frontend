import { ConnectButton } from '@rainbow-me/rainbowkit';
import { utils } from 'ethers';
import { useForm } from 'react-hook-form';
import { useSendTransaction } from 'wagmi';

import BranchIsWalletConnected from '../shared/branch-is-wallet-connected';

export function FormSignTransaction() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const fields = watch();
  const { sendTransaction } = useSendTransaction({
    mode: 'recklesslyUnprepared',
    request: { to: fields.to, value: utils.parseEther(fields.amount || '0') },
  });

  const onSubmit = async (data: any) => {
    sendTransaction?.();
  };

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <label>Amount</label>
        <input placeholder="1" {...register('amount')} className="input" />
        <label>To</label>
        <input placeholder="kames.eth" {...register('to')} className="input" />
        <input type="submit" className="btn-normal" />
      </form>
    </>
  );
}

export default function SignTransaction() {
  return (
    <div className="card">
      <BranchIsWalletConnected>
        <div className="w-full">
          <FormSignTransaction />
          <hr className="my-4" />
          <h3 className="text-center">Send Transaction</h3>
          <p className="text-center text-sm text-gray-500">
            Send a transaction from your account to any address.
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
