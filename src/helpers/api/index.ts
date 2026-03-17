import AsyncStorage from '@react-native-async-storage/async-storage';
import { TPostProps } from '../../components/molecules/PostItem';
import { createMMKV } from 'react-native-mmkv';
const storage = createMMKV();

export async function retrievePostsFromAsyncStorage(): Promise<TPostProps[]> {
  const storedPosts = await AsyncStorage.getItem('posts');
  if (storedPosts) return JSON.parse(storedPosts);
  return [];
}

export function retrievePostsFromMMKV(): TPostProps[] {
  const posts = storage.getString('posts');

  if (posts) return JSON.parse(posts);
  return [];
}

export function savePostsInMMKV(posts: TPostProps[]) {
  storage.set('posts', JSON.stringify(posts));
}

export const savePostsWithAsyncStorage = (posts: TPostProps) =>
  AsyncStorage.setItem('posts', JSON.stringify(posts));
