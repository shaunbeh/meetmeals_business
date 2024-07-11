import axios from 'axios';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/router';
import { type ReactNode, useEffect } from 'react';
import { useIsClient } from 'usehooks-ts';

import { useAppStore } from '@/store';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();
  const isClient = useIsClient();
  const accessToken = useAppStore((store) => store.auth.token);

  // if no auth token, redirect to login page
  useEffect(() => {
    if (!accessToken) {
      router.replace('/login');
    }
  }, [accessToken, router]);

  // if auth token, set axios auth header
  useEffect(() => {
    if (accessToken) {
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    }

    if (!accessToken) {
      axios.defaults.headers.common.Authorization = undefined;
    }

    return () => {
      axios.defaults.headers.common.Authorization = undefined;
    };
  }, [accessToken]);

  if (!isClient || !accessToken)
    return (
      <div className='flex h-screen items-center justify-center'>
        <Loader className='animate-spin' />
      </div>
    );

  return children;
};
