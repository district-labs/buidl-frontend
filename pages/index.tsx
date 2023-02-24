import type { NextPage } from 'next';
import Head from 'next/head';
import WalletConnect from '../components/WalletConnect';
import SignMessage from '../components/SignMessage';
import SIWE from '../components/SIWE';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>BUIDL WEEK</title>
        <meta name="description" content="Building Web3 Applications" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main className="flex flex-col items-center justify-center p-10 space-y-10">
        <h1 className="mt-40 text-7xl font-bold text-transparent bg-clip-text from-red-500 to-blue-500 bg-gradient-to-r">
          Welcome to
          <br />
          BUIDL WEEK
        </h1>
        <p className="text-2xl text-gray-600">
          Intro to building frontend applications
        </p>
        <div className="grid lg:grid-cols-3 w-full gap-6">
          <WalletConnect />
          <SignMessage />
          <SIWE />
        </div>
      </main>
    </div>
  );
};

export default Home;
