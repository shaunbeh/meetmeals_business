import Axios from 'axios';
import { toast } from 'sonner';

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
    if (error.response) {
      toast.error(error.response.data.message);
    }
    return Promise.reject(error);
  },
);
