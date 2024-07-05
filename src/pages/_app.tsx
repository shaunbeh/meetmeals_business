import '@/styles/globals.scss';

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
  token?: string;
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
              const [url, { method = 'get', token, ...params }] = queryKey as [
                string,
                ParamsT,
              ];

              const fullUrl = `${appConfig.apiUrl}/api${url.toLowerCase()}`;
              let response;

              if (method.toLowerCase() === 'post') {
                response = await axios.post(fullUrl, params ?? {}, {
                  headers: {
                    ...(token && { Authorization: `Bearer ${token}` }),
                  },
                });
              } else {
                response = await axios.get(fullUrl, {
                  params,
                  headers: {
                    ...(token && { Authorization: `Bearer ${token}` }),
                  },
                });
              }
              return response.data;
            },
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <Component {...pageProps} />
        <Toaster />
      </HydrationBoundary>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
