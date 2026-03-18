import axios from 'axios';
import axiosRetry from 'axios-retry';
import { createMMKV } from 'react-native-mmkv';

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

export { apiClient, storage, Fetch_base_url };
