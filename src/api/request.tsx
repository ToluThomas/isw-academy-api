import axios from 'axios';
import Netinfo from '@react-native-community/netinfo';

export const client = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

client.interceptors.request.use(async config => {
  const internetConnection = await Netinfo.fetch();
  const isConnected = internetConnection.isConnected;
  const isOnline = typeof isConnected === 'boolean' ? isConnected : true;
  if (!isOnline) {
    return Promise.reject(new Error('No internet connection'));
  }
  return config;
});
