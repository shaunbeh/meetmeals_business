import Layout from '@/components/Layout';
import '@/styles/globals.css';
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';
import type { AppProps } from 'next/app';
import { useState } from 'react';

interface ParamsT {
  method?: 'get' | 'post';
  [key: string]: unknown;
}
export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            queryFn: async ({ queryKey }) => {
              const [url, { method = 'get', ...params }] = queryKey as [
                string,
                ParamsT,
              ];

              const fullUrl = `http://64.21.191.118:8000/api${url.toLowerCase()}`;
              let response;

              if (method.toLowerCase() === 'post') {
                response = await axios.post(fullUrl, params ?? {});
              } else {
                response = await axios.get(fullUrl, {
                  params,
                });
              }
              return response.data;
            },
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </HydrationBoundary>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
