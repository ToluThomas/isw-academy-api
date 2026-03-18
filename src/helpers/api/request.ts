import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';

export const client = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

client.interceptors.request.use(async config => {
  const internetConnection = await NetInfo.fetch();
  const isConnected = internetConnection.isConnected;
  const isOnline = typeof isConnected === 'boolean' ? isConnected : true;

  if (!isOnline) {
    return Promise.reject(new Error('Please connect to the internet'));
  }
  return config;
});

// client.interceptors.response.use();
