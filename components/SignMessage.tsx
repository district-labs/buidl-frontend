import { ethers } from 'ethers';
import React from 'react';
import { useSignMessage } from 'wagmi';

export default function SignMessage() {
  const signWithEthers = async () => {
    try {
      if (!window.ethereum) throw new Error('No wallet found');

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      await signer.signMessage('Hello Ethers');
    } catch (error) {
      console.log(error);
    }
  };

  const { data, signMessage } = useSignMessage({
    message: 'Hello Wagmi',
  });

  return (
    <div className="relative p-12 space-y-4 col-span-1 overflow-hidden rounded-xl border border-gray-200 bg-white flex flex-col justify-between shadow-md">
      <div className="flex w-full items-center justify-around">
        <div className="flex flex-col items-center justify-center space-y-2">
          <button
            onClick={signWithEthers}
            className="px-4 py-2 bg-red-600 rounded-xl hover:scale-105 font-bold text-white"
          >
            Hello Ethers
          </button>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2">
          <button
            onClick={() => signMessage()}
            className="px-4 py-2 bg-red-600 rounded-xl hover:scale-105 font-bold text-white"
          >
            Hello Wagmi
          </button>
        </div>
      </div>
      <h2 className="text-center text-xl font-bold md:text-3xl md:font-normal">
        Signing Messages
      </h2>
    </div>
  );
}
