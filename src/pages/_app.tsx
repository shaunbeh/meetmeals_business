import '@/styles/globals.scss';
import '@/styles/customTable.scss';

import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';
import type { AppProps } from 'next/app';
import { useState } from 'react';

import { Toaster } from '@/components/ui/sonner';
import { appConfig } from '@/lib/constants';

interface ParamsT {
  method?: 'get' | 'post';
  [key: string]: unknown;
}

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
                response = await axios.post(fullUrl, otherParams ?? {});
              } else {
                response = await axios.get(fullUrl, {
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
        <Component {...pageProps} />
        <Toaster
          position='top-center'
          toastOptions={{
            unstyled: true,
            classNames: {
              error: 'text-red-500',
              success: 'text-green-500',
              info: 'text-blue-500',
              warning: 'text-yellow-500',
            },
          }}
        />
      </HydrationBoundary>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
