import Axios from 'axios';
import { toast } from 'sonner';

import { useAppStore } from '@/store';

import { appConfig } from './constants';

export const apiClient = Axios.create({
  baseURL: appConfig.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const logout = useAppStore.getState().removeCredentials;
    const { token } = useAppStore.getState().auth;
    if (error.response) {
      if (error.response.status === 403 && token) {
        logout();
        // window.location.replace('/login');
        toast.error(error.response.data.message, { id: 403 });
      } else {
        toast.error(error.response.data.message);
      }
    }
    return Promise.reject(error);
  },
);
