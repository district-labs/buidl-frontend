import { useState } from 'react';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { SiweMessage } from 'siwe';
import { useAccount, useNetwork, useSignMessage } from 'wagmi';

import BranchIsWalletConnected from '../shared/branch-is-wallet-connected';

export default function SignInWithEthereum() {
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
    <div className="card">
      <BranchIsWalletConnected>
        <div>
          <div className="flex flex-col items-center justify-center space-y-4">
            {/* <img src="/siwe.svg" alt="SIWE" className="h-24" /> */}
            {signedIn ? (
              <button
                onClick={() => setSignedIn(false)}
                className="rounded-xl bg-stone-500 px-4 py-2 font-bold text-white hover:scale-105"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={siweLogin}
                className="rounded-md bg-emerald-500 px-4 py-2 font-bold text-white hover:scale-105"
              >
                Web3 Login
              </button>
            )}
          </div>

          <hr className="my-4" />
          <h3 className="text-center">Sign In With Ethereum</h3>
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
