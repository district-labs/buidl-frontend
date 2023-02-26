import React, { useState } from 'react';

import { ConnectButton } from '@rainbow-me/rainbowkit';

import BranchIsWalletConnected from '../shared/branch-is-wallet-connected';

export default function ConnectWalletWithInjected() {
  const [injectedWallet, setInjectedWallet] = useState<string | null>(null);

  // Request access to injected wallet
  const connectWalletWithInjectedHandler = async () => {
    // Check if extension exists
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setInjectedWallet(accounts[0]);
      } catch (error: any) {
        console.log('Error connecting account');
      }
    }
  };

  return (
    <div className="card">
      <BranchIsWalletConnected>
        <div className="flex items-center justify-center text-center">
          <ConnectButton />
        </div>
        <div>
          <div className="flex items-center justify-center gap-10">
            <>
              <ConnectButton />
              <button
                onClick={connectWalletWithInjectedHandler}
                className="rounded-xl bg-green-600 px-4 py-2 font-bold text-white hover:scale-105"
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
