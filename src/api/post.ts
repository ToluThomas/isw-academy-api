import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiClient, Fetch_base_url, storage } from './client';

export type PostProp = {
  title: string;
  body: string;
  userId?: number;
  id?: number;
};

export type ResponseError = {
  message: string;
};

export function getPostsWithThen(): Promise<PostProp[]> {
  return fetch(Fetch_base_url + '/posts').then(response => response.json());
}

export async function getPostsWithAsync(): Promise<PostProp[]> {
  const response = await fetch(Fetch_base_url + '/posts');
  const responseJson = await response.json();
  return responseJson;
}

function getPostsWithAxios(): Promise<PostProp[]> {
  return apiClient.get('/posts').then(async response => {
    await AsyncStorage.setItem('Posts', JSON.stringify(response.data));
    return response.data;
  });
}

export async function getPostsWithAxiosError(): Promise<PostProp[]> {
  return apiClient.get('/yhoung').then(response => response.data);
}

export const getPostFromAsyncStorage = async (): Promise<PostProp[]> => {
  const availablePost = await AsyncStorage.getItem('Posts');
  if (availablePost) {
    return JSON.parse(availablePost);
  } else {
    return getPostsWithAxios();
  }
};

export function retrivePostFromMMKV() {
  const post = storage.getString('posts');
  if (post) return JSON.parse(post);
  return [];
}

export function savePostToMMKV(posts: PostProp) {
  storage.set('posts', JSON.stringify(posts));
}
