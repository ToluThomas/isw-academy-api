import client from './client';

type PostProps = {
  id?: number;
  userId?: number;
  title: string;
  body: string;
};

export function getPostsWithAxios(): Promise<PostProps[]> {
  return client.get('/posts').then(response => response.data);
}

export function getPostsWithAxiosError(): Promise<PostProps[]> {
  return client.get('/Tello').then(response => response.data);
}

export function getPostsWithThen(): Promise<PostProps[]> {
  return fetch('https://jsonplaceholder.typicode.com/posts').then(response =>
    response.json(),
  );
}

export async function getPostsWithAsyncAwait(): Promise<PostProps[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  return await response.json();
}

export type { PostProps };
