import axios from 'axios';
import axiosRetry from 'axios-retry';

const client = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

// Configure automatic retries
axiosRetry(client, {
  retries: 3,
  retryDelay: retryCount => {
    // Exponential backoff: 1s, 2s, 4s...
    return Math.pow(2, retryCount) * 1000;
  },
  retryCondition: error => {
    // Retry on network errors or 5xx responses
    // Don't retry on 4xx client errors
    return (
      axiosRetry.isNetworkError(error) || axiosRetry.isRetryableError(error)
    );
  },
  onRetry: (count, error) => {
    console.log(`Retry ${count}: ${error.message}`);
  },
});

export default client;
