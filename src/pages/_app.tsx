import Layout from '@/components/Layout';
import '@/styles/globals.css';
import { BASIC_URL } from '@/lib/config';
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
// type AppOwnProps = { headerHtml: string; footerHtml: string };

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            queryFn: async ({ queryKey }) => {
              const [url, { method = 'get', ...params }] = queryKey as [
                string,
                ParamsT,
              ];

              const fullUrl = `${BASIC_URL}${url.toLowerCase()}`;
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

// MyApp.getInitialProps = async (
//   context: AppContext
// ): Promise<AppOwnProps & AppInitialProps> => {
//   const ctx = await App.getInitialProps(context);
//   const headerHtml = await fetchHeader();
//   const footerHtml = await fetchFooter();
//   return { ...ctx, headerHtml, footerHtml };
// };

// const fetchHeader = async () => {
//   const res = await fetch(
//     'https://clinicsarmayeh.com/wp-json/custom-section/v1/header/'
//   );
//   return res.text();
// };

// const fetchFooter = async () => {
//   const res = await fetch(
//     'https://clinicsarmayeh.com/wp-json/custom-section/v1/footer/'
//   );
//   return res.text();
// };
