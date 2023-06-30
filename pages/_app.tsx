import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import "@rainbow-me/rainbowkit/styles.css";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, optimism, polygon } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string,
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Next Mui Rainbow",
  projectId: "YOUR_PROJECT_ID",
  chains,
});

const wagmiConfig = createConfig({
  connectors,
  publicClient,
});
export default function App({ Component, pageProps }: AppProps) {
  return <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
    </RainbowKitProvider>
  </WagmiConfig>
}
