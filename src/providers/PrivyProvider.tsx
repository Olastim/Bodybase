'use client';

import {PrivyProvider as PrivyWagmiProvider} from '@privy-io/react-auth';
import {base} from 'viem/chains';
import {useRouter} from 'next/navigation';
import {WagmiProvider} from '@privy-io/wagmi';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { http } from 'viem'
import { createConfig } from 'wagmi';

const queryClient = new QueryClient();

export function PrivyProvider({children}: {children: React.ReactNode}) {
  const router = useRouter();

  const wagmiConfig = createConfig({
    chains: [base],
    transports: {
      [base.id]: http(),
    },
  });

  return (
    <PrivyWagmiProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
      onSuccess={() => router.push('/dashboard')}
      config={{
        loginMethods: ['email'],
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
          requireUserPasswordOnCreate: true,
        },
        appearance: {
          theme: 'dark',
          accentColor: '#A259FF',
          logo: 'https://placehold.co/200x80/261747/A259FF?text=BodyBase&font=spacegrotesk',
        },
        defaultChain: base,
        supportedChains: [base],
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          {children}
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyWagmiProvider>
  );
}
