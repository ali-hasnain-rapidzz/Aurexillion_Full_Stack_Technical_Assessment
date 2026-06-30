import axios, { AxiosError } from 'axios';
import type { ApiErrorResponse } from '../types/ticket';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const message =
      error.response?.data?.message ?? error.message ?? 'An unexpected error occurred';
    return Promise.reject(new Error(message));
  },
);

export default apiClient;
