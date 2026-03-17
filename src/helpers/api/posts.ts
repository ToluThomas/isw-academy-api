import { client } from './request';
import { TPostProps } from '../../components/molecules/PostItem';

export function getPostsWithAxios(callback: (posts: TPostProps[]) => void) {
  return client.get('/posts').then(response => {
    const responseJson = response.data;
    callback?.(responseJson);
  });
}

export function getPostsWithAxiosAndSaveWithMMKV(
  callback: (posts: TPostProps[]) => void,
) {
  return client.get('/posts').then(response => {
    const responseJson = response.data;
    callback?.(responseJson);
  });
}

export function getPostsWithFetchThen(callback: (posts: TPostProps[]) => void) {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(responseJson => {
      callback?.(responseJson);
    });
}
