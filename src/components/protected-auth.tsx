import { Loader } from 'lucide-react';
import { useRouter } from 'next/router';
import { type ReactNode, useEffect, useState } from 'react';
import { useIsClient } from 'usehooks-ts';

import { apiClient } from '@/lib/axios';
import { useAppStore } from '@/store';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();
  const isClient = useIsClient();
  const { token } = useAppStore((store) => store.auth);
  const hasHydrated = useAppStore.persist?.hasHydrated();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (hasHydrated) {
      setIsLoading(false);
    }
  }, [hasHydrated]);

  useEffect(() => {
    if (!isLoading && !token) {
      router.replace('/login');
    }
  }, [token, router, isLoading]);

  useEffect(() => {
    if (hasHydrated) {
      if (token) {
        apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
      }

      if (!token) {
        apiClient.defaults.headers.common.Authorization = undefined;
      }

      return () => {
        apiClient.defaults.headers.common.Authorization = undefined;
      };
    }
    return () => {};
  }, [token, hasHydrated]);

  if (!isClient || !token || isLoading)
    return (
      <div className='flex h-screen items-center justify-center'>
        <Loader className='animate-spin' />
      </div>
    );

  return children;
};
