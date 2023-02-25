// @ts-nocheck
/* eslint-disable @next/next/no-img-element */
import ERC20ABI from "../../abis/MintableERC20.json";
import { useContractEvent } from "wagmi";
import { useToken } from "../../lib/state";
import { useState } from "react";
import { utils } from "ethers";

export default function ERC20EventMint() {
  const [token] = useToken();
  const [event, setEvent] = useState<{
    from: string;
    to: string;
    amount: string;
  }>();

  useContractEvent({
    address: token,
    abi: ERC20ABI.abi,
    eventName: "Transfer",
    listener(from, to, amount) {
      if (from == constants.AddressZero) {
        setEvent({
          from,
          to,
          amount,
        });
      }
    },
  });

  return (
    <div className="card">
      <div className="col-span-6">
        {!event?.to ? null : (
          <>
            <p className="">From: {event?.from}</p>
            <p className="">To: {event?.to}</p>
            <p className="">
              Amount: {utils.formatEther(event?.amount.toString() || "0")}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
