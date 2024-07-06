import '@/styles/globals.scss';

import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios, { type AxiosError } from 'axios';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { Toaster } from '@/components/ui/sonner';
import { appConfig } from '@/lib/constants';

interface ParamsT {
  method?: 'get' | 'post';
  token?: string;
  [key: string]: unknown;
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

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
                try {
                  response = await axios.post(fullUrl, params ?? {}, {
                    headers: {
                      ...(token && { Authorization: `Bearer ${token}` }),
                    },
                  });
                } catch (error) {
                  const e = error as AxiosError<{ message: string }>;
                  if (e.response?.status === 403) {
                    toast.error(e.response?.data?.message, {
                      position: 'top-right',
                      style: { color: 'red' },
                    });
                    router.push('/login');
                  }
                }
              } else {
                try {
                  response = await axios.get(fullUrl, {
                    params,
                    headers: {
                      ...(token && { Authorization: `Bearer ${token}` }),
                    },
                  });
                } catch (error) {
                  const e = error as AxiosError<{ message: string }>;
                  if (e.response?.status === 403) {
                    toast.error(e.response?.data?.message, {
                      position: 'top-right',
                      style: { color: 'red' },
                    });
                    router.push('/login');
                  }
                }
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
        <Toaster />
      </HydrationBoundary>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
