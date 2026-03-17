import client from './client';

type TPostProps = {
  id?: number;
  userId?: number;
  title: string;
  body: string;
};

export function getPostsWithAxios(): Promise<TPostProps[]> {
  return client.get('/posts').then(response => response.data);
}

export function getPostsWithAxiosError(): Promise<TPostProps[]> {
  return client.get('/Tello').then(response => response.data);
}

export function getPostsWithThen(): Promise<TPostProps[]> {
  return fetch('https://jsonplaceholder.typicode.com/posts').then(response =>
    response.json(),
  );
}

export async function getPostsWithAsyncAwait(): Promise<TPostProps[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  return await response.json();
}

export type { TPostProps };
