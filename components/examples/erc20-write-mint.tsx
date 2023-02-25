import { ConnectButton } from "@rainbow-me/rainbowkit";
import BranchIsWalletConnected from "../shared/branch-is-wallet-connected";
import { useContractAutoLoad } from "../../hooks/use-contract-auto-load";
import { useForm } from "react-hook-form";
import { utils } from "ethers";
import { useAccount } from "wagmi";
import ERC20EventMint from "./erc20-event-mint";
import { useErc20Mint } from "../../lib/blockchain";
import { useToken } from "../../lib/state";

function ERC20ContractMintTokens() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [token] = useToken();
  const { address } = useAccount();
  const mintAction = useErc20Mint({
    address: token,
  });

  const onSubmit = async (data: any) => {
    const tx = await mintAction.writeAsync({
      recklesslySetUnpreparedArgs: [address, utils.parseEther(data.amount)],
    });
    console.log(tx);
  };

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <label>Amount</label>
        <input className="input" placeholder="1000" {...register("amount")} />
        {errors.exampleRequired && <span>This field is required</span>}
        <input type="submit" className="btn-normal" />
      </form>
    </>
  );
}

export default function ERC20WriteMint() {
  const contract = useContractAutoLoad("TokenUSDC");

  return (
    <div className="card w-full">
      <BranchIsWalletConnected>
        <div className="w-full">
          <h3 className="font-bold">Mint</h3>
          <hr className="my-2" />
          <ERC20ContractMintTokens />
          <hr className="my-4" />
          <ERC20EventMint />
          <hr className="my-4" />
          <h3 className="text-center">ERC20 Mint</h3>
          <p className="text-center text-sm text-gray-500">
            Mint tokens to yourself!
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