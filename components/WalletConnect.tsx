import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ethers } from 'ethers';
import React, { useState } from 'react';

export default function WalletConnect() {
  const [injectedWallet, setInjectedWallet] = useState<string | null>(null);

  // Request access to injected wallet
  const connectWalletHandler = async () => {
    console.log(process.env.NEXT_PUBLIC_ALCHEMY_API_KEY);
    console.log('Requesting account connection...');
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
    <div className="relative p-12 col-span-1 overflow-hidden rounded-xl flex flex-col justify-between border border-gray-200 bg-white px-4 shadow-md md:col-span-2">
      <div className="flex items-center justify-around">
        <div className="flex flex-col items-center justify-center">
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
        </div>

        <ConnectButton />
      </div>

      <h2 className="mt-6 text-center text-xl font-bold md:text-3xl md:font-normal">
        Connecting To Wallets
      </h2>
    </div>
  );
}
