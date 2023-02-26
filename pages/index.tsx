import type { NextPage } from 'next';
import Head from 'next/head';

import ConnectWallet from '../components/examples/connect-wallet';
import ERC20Deploy from '../components/examples/erc20-deploy';
import ERC20Read from '../components/examples/erc20-read';
import ERC20WriteMint from '../components/examples/erc20-write-mint';
import ERC20WriteTransfer from '../components/examples/erc20-write-transfer';
import SignInWithEthereum from '../components/examples/sign-in-with-ethereum';
import SignMessages from '../components/examples/sign-messages';
import SignTransaction from '../components/examples/sign-transaction';
import OrbisDiscussion from '../components/identity/orbis-discussion';
import { BranchIsWalletConnected } from '../components/shared/branch-is-wallet-connected';
import { BranchTokenMinted } from '../components/shared/branch-token-minted';
import { DEPLOY_URL } from '../lib/config';

const Home: NextPage = () => {
  return (
    <div className="px-10">
      <Head>
        <title>Introduction to Web3 Frontend Applications</title>
        <meta name="description" content="Building Web3 Applications" />
      </Head>
      <main className="flex flex-col items-center justify-center space-y-10 py-10">
        <h1 className="bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-5xl font-bold text-transparent lg:text-9xl">
          Welcome To
          <br />
          BUIDL WEEK
        </h1>
        <p className="text-center text-gray-500 lg:text-xl">
          Introduction to Web3 frontend applications using React
        </p>
        <div className="flex items-center gap-10">
          <a
            className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
            href={DEPLOY_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="h-4 w-4 group-hover:text-black"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4L20 20H4L12 4Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p>Deploy to Vercel</p>
          </a>
          <a
            className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800"
            href="https://github.com/District-Labs/buidl-frontend"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>Star on GitHub</p>
          </a>
        </div>
        <div className="container flex max-w-screen-md flex-col gap-10">
          <ConnectWallet />
          <BranchIsWalletConnected>
            <>
              <SignMessages />
              <SignInWithEthereum />
              <SignTransaction />
              <ERC20Deploy />
              <BranchTokenMinted>
                <>
                  <ERC20Read />
                  <ERC20WriteMint />
                  <ERC20WriteTransfer />
                </>
                <></>
              </BranchTokenMinted>
              <span className="mb-0 text-center text-4xl font-bold leading-3">
                Comment Section
              </span>
              <span className="text-center text-lg leading-4 text-neutral-600">
                Leave a comment, ask a question or just say hi 👋
              </span>
              <hr className="my-4" />
              <OrbisDiscussion />
            </>
          </BranchIsWalletConnected>
        </div>
      </main>
    </div>
  );
};

export default Home;
