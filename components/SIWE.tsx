/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { SiweMessage } from 'siwe';
import { useAccount, useNetwork, useSignMessage } from 'wagmi';

export default function SIWE() {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { signMessageAsync } = useSignMessage();
  const [signedIn, setSignedIn] = useState(false);

  const siweLogin = async () => {
    // 1. Get random nonce from API
    const nonce = await fetch('/api/account/nonce').then((res) => res.text());

    // 2. Create SIWE message with pre-fetched nonce, then sign with wallet
    const message = new SiweMessage({
      domain: window.location.host,
      address: address,
      statement: 'Sign in with Ethereum to Buidl Week',
      uri: window.location.origin,
      version: '1',
      chainId: chain?.id,
      nonce: nonce,
    });

    // 3. Sign message
    const signature = await signMessageAsync({
      message: message.prepareMessage(),
    });

    // 4. Verify Signature
    const verifySignature = await fetch('/api/account/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, signature }),
    });

    if (!verifySignature.ok) {
      setSignedIn(false);
      throw new Error('Error validating signature');
    }
    if (verifySignature.status === 200) {
      setSignedIn(true);
    }
  };

  return (
    <div className="relative p-12 space-y-4 col-span-1 overflow-hidden rounded-xl border border-gray-200 bg-white flex flex-col justify-between shadow-md">
      <div className="flex flex-col items-center justify-center space-y-4">
        <img src="/siwe.svg" alt="SIWE" className="h-24" />
        {signedIn ? (
          <button
            onClick={() => setSignedIn(false)}
            className="px-4 py-2 bg-stone-500 rounded-xl hover:scale-105 font-bold text-white"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={siweLogin}
            className="px-4 py-2 bg-orange-500 rounded-xl hover:scale-105 font-bold text-white"
          >
            Authenticate
          </button>
        )}
      </div>
      <h2 className="text-center text-xl font-bold md:text-3xl md:font-normal">
        Sign in with Ethereum
      </h2>
    </div>
  );
}
