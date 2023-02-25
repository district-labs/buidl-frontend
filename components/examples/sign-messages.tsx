import { useState } from 'react';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ethers } from 'ethers';
import { useSignMessage } from 'wagmi';

import BranchIsWalletConnected from '../shared/branch-is-wallet-connected';

export default function SignMessages() {
  const [signedMessage, setSignedMessage] = useState();
  const signWithEthers = async () => {
    try {
      if (!window.ethereum) throw new Error('No wallet found');
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const msg = await signer.signMessage('Hello Ethers');
      setSignedMessage(msg);
    } catch (error) {
      console.log(error);
    }
  };

  const { data, signMessage } = useSignMessage({
    message: 'Hello Wagmi',
  });

  return (
    <div className="card">
      <BranchIsWalletConnected>
        <div>
          <div className="flex items-center justify-center space-x-6">
            <button onClick={signWithEthers} className="btn-normal">
              Hello Ethers.js
            </button>
            <button onClick={() => signMessage()} className="btn-normal">
              WAGMI
            </button>
          </div>
          {!signedMessage && !data ? null : (
            <div className="break-words py-10 text-center">
              {!signedMessage ? null : (
                <p>
                  {' '}
                  Ethers
                  <br />
                  {signedMessage}
                </p>
              )}
              {!data ? null : (
                <p>
                  WAGMI
                  <br />
                  {data}
                </p>
              )}
            </div>
          )}
          <hr className="my-4" />
          <h3 className="text-center">Sign Messages</h3>
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
