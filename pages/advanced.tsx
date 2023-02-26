import type { NextPage } from 'next';
import Head from 'next/head';

import { BranchIsWalletConnected } from '../components/shared/branch-is-wallet-connected';
import AdvancedIdentityCredentials from '@/components/advanced/advanced-identity-credentials';
import AdvancedIdentityGetProfile from '@/components/advanced/advanced-identity-get-profile';
import AdvancedIdentitySetProfile from '@/components/advanced/advanced-identity-set-profile';
import AdvanedOrbisConnect from '@/components/advanced/advaned-orbis-connect';
import ConnectWallet from '@/components/examples/connect-wallet';
import OrbisDiscussion from '@/components/identity/orbis-discussion';
import { BranchIsIdentityConnected } from '@/components/shared/branch-is-identity-connected';

const Home: NextPage = () => {
  return (
    <div className="px-10">
      <Head>
        <title>Introduction to Web3 Frontend Applications</title>
        <meta name="description" content="Building Web3 Applications" />
      </Head>
      <main className="flex flex-col items-center justify-center space-y-10 py-32">
        <h3 className="bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-5xl font-bold text-transparent lg:text-9xl">
          Advanced Mode
        </h3>
        <p className="text-2xl text-gray-500">Decentralized Identity</p>
        <div className="container flex max-w-screen-md flex-col gap-10">
          <BranchIsWalletConnected>
            <>
              <AdvanedOrbisConnect />
              <BranchIsIdentityConnected>
                <>
                  <AdvancedIdentityGetProfile />
                  <AdvancedIdentitySetProfile />
                  <AdvancedIdentityCredentials />
                </>
              </BranchIsIdentityConnected>
              <OrbisDiscussion />
            </>
            <ConnectWallet />
          </BranchIsWalletConnected>
        </div>
      </main>
    </div>
  );
};

export default Home;
