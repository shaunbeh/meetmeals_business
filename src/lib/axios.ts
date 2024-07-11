import Axios from 'axios';
import Router from 'next/router';

import { appConfig } from './constants';

export const axios = Axios.create({
  baseURL: appConfig.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      Router.push('/login');
    }
    return Promise.reject(error);
  },
);
