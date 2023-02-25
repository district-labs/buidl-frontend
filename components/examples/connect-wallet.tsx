import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useState } from "react";
import BranchIsWalletConnected from "../shared/branch-is-wallet-connected";

export default function ConnectWallet() {
  const [injectedWallet, setInjectedWallet] = useState<string | null>(null);

  // Request access to injected wallet
  const connectWalletHandler = async () => {
    // Check if extension exists
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setInjectedWallet(accounts[0]);
      } catch (error: any) {
        console.log("Error connecting account");
      }
    }
  };

  return (
    <div className="card">
      <BranchIsWalletConnected>
        <div className="text-center flex justify-center items-center">
          <ConnectButton />
        </div>
        <div>
          <div className="flex items-center gap-10 justify-center">
            <>
              <ConnectButton />
              <button
                onClick={connectWalletHandler}
                className="px-4 py-2 bg-green-600 rounded-xl hover:scale-105 font-bold text-white"
              >
                Injected Web3 Connect
              </button>
              {injectedWallet && (
                <p className="font-bold">
                  Address: {injectedWallet.substring(0, 4)}...
                  {injectedWallet.slice(-4)}
                </p>
              )}
            </>
          </div>
          <hr className="my-4" />
          <h3 className="text-center">Connect Wallet</h3>
        </div>
      </BranchIsWalletConnected>
    </div>
  );
}
