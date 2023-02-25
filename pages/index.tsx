import type { NextPage } from "next";
import Head from "next/head";
import SignMessages from "../components/examples/sign-messages";
import SignInWithEthereum from "../components/examples/sign-in-with-ethereum";
import ConnectWallet from "../components/examples/connect-wallet";
import ERC20Read from "../components/examples/erc20-read";
import ERC20Deploy from "../components/examples/erc20-deploy";
import ERC20WriteTransfer from "../components/examples/erc20-write-transfer";
import ERC20WriteMint from "../components/examples/erc20-write-mint";
import { BranchTokenMinted } from "../components/shared/branch-token-minted";
import { BranchIsWalletConnected } from "../components/shared/branch-is-wallet-connected";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Introduction to Web3 Frontend Applications</title>
        <meta name="description" content="Building Web3 Applications" />
      </Head>
      <main className="flex flex-col items-center justify-center space-y-10 py-10">
        <h1 className="mt-40 text-7xl lg:text-9xl font-bold text-transparent bg-clip-text from-red-500 to-blue-500 bg-gradient-to-r">
          Welcome To
          <br />
          BUIDL WEEK
        </h1>
        <p className="text-xl text-gray-500">
          Introduction to Web3 frontend applications using React
        </p>
        <div className="flex flex-col gap-10 container max-w-screen-md">
          <ConnectWallet />
          <BranchIsWalletConnected>
            <>
              <SignMessages />
              <SignInWithEthereum />
              <ERC20Deploy />
              <BranchTokenMinted>
                <>
                  <ERC20Read />
                  <ERC20WriteMint />
                  <ERC20WriteTransfer />
                </>
                <></>
              </BranchTokenMinted>
            </>
          </BranchIsWalletConnected>
        </div>
      </main>
    </div>
  );
};

export default Home;
