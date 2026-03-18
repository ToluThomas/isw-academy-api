import axios from 'axios';
import axiosRetry from 'axios-retry';
import { createMMKV } from 'react-native-mmkv';
import NetInfo from '@react-native-community/netinfo';

const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
});

axiosRetry(apiClient, {
  retries: 3,
  retryDelay: retryCount => {
    return Math.pow(2, retryCount) * 1000;
  },
  retryCondition: error => {
    const isNetworkError = axiosRetry.isNetworkError(error);
    console.log({ isNetworkError, error });
    return (
      axiosRetry.isNetworkError(error) || axiosRetry.isRetryableError(error)
    );
  },
  onRetry: (count, error) => {
    console.log(`Retry ${count}: ${error.message}`);
  },
});

const Fetch_base_url = 'https://jsonplaceholder.typicode.com';

const storage = createMMKV();

apiClient.interceptors.request.use(async config => {
  const internetConnection = await NetInfo.fetch();
  const isConnected = internetConnection.isConnected;
  const isOnline = typeof isConnected === 'boolean' ? isConnected : true;

  if (!isOnline)
    return Promise.reject(new Error('Please connect to the internet'));

  return config;
});

export { apiClient, storage, Fetch_base_url };
