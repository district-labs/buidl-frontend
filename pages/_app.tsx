import '../styles/globals.css';
import '@orbisclub/components/dist/index.modern.css';
import '@rainbow-me/rainbowkit/styles.css';
import {
  ConnectButton,
  RainbowKitProvider,
  getDefaultWallets,
} from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import { WagmiConfig, configureChains, createClient } from 'wagmi';
import { arbitrum, goerli, mainnet, optimism, polygon } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import { useIsMounted } from '../hooks/use-is-mounted';

const { chains, provider, webSocketProvider } = configureChains(
  [
    mainnet,
    optimism,
    arbitrum,
    polygon,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [
    alchemyProvider({
      // This is Alchemy's default API key.
      // You can get your own at https://dashboard.alchemyapi.io
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string,
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  const isMounted = useIsMounted();
  return (
    <>
      {isMounted && (
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains}>
            <header className="p-3 text-center">
              <Link href={'/'}>
                <a className="text-blue-500">Essentials</a>
              </Link>
              <span className="mx-3">|</span>
              <Link href={'/advanced'}>
                <a className="text-blue-500">Advanced</a>
              </Link>
            </header>
            <Component {...pageProps} />
            <div className="fixed right-5 bottom-5">
              <ConnectButton
                showBalance={false}
                accountStatus={{
                  smallScreen: 'avatar',
                  largeScreen: 'avatar',
                }}
                chainStatus={{
                  smallScreen: 'icon',
                  largeScreen: 'icon',
                }}
              />
            </div>
          </RainbowKitProvider>
        </WagmiConfig>
      )}
    </>
  );
}

export default MyApp;
