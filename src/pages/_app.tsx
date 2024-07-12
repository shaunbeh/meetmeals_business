import '@/styles/globals.scss';
import '@/styles/customTable.scss';

import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import { Roboto } from 'next/font/google';
import { useState } from 'react';

import { Toaster } from '@/components/ui/sonner';
import { apiClient } from '@/lib/axios';
import { appConfig } from '@/lib/constants';

interface ParamsT {
  method?: 'get' | 'post';
  [key: string]: unknown;
}

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            queryFn: async ({ queryKey }) => {
              const [url, params] = queryKey as [string, ParamsT];
              const { method = 'get', ...otherParams } = params ?? {};

              const fullUrl = `${appConfig.apiUrl}/api${url.toLowerCase()}`;
              let response;

              if (method.toLowerCase() === 'post') {
                response = await apiClient.post(fullUrl, otherParams ?? {});
              } else {
                response = await apiClient.get(fullUrl, {
                  params: otherParams ?? {},
                });
              }
              return response?.data;
            },
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <main className={roboto.className}>
          <Component {...pageProps} />
        </main>
        <Toaster
          position='top-center'
          toastOptions={{
            className:
              'bg-surface-secondary border-line-primary text-text-primary',
            duration: 1500,
            classNames: {
              error: '!text-red',
              success: '!text-primary',
              info: '!text-blue-500',
              warning: '!text-yellow-500',
            },
          }}
        />
      </HydrationBoundary>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
