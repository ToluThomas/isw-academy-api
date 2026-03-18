import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  getPostFromAsyncStorage,
  getPostsWithAsync,
  getPostsWithAxiosError,
  getPostsWithThen,
  PostProp,
} from '../api/post';
import AllPost from '../component/AllPost';

type ResponseError = {
  message: string;
};

const HomeScreen = () => {
  const [post, setPosts] = useState<PostProp[]>([]);

  const [loading, setLoading] = useState<Boolean>(true);

  const [error, setError] = useState<string>('');
  const [refreshCount, setRefreshCount] = useState<number>(0);

  const loadPostWithThen = async () => {
    try {
      const postWithThenMethod = await getPostsWithThen();

      if (!postWithThenMethod) throw new Error('Unable to get post');

      setPosts(postWithThenMethod);
    } catch (e) {
      const apiError = e as ResponseError;
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  };

  const loadPost = async () => {
    try {
      const availablePost = await getPostFromAsyncStorage();
      setPosts(availablePost);
      if (!availablePost) throw new Error('Unable to get post');
    } catch (e) {
      const apiError = e as ResponseError;
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  };

  async function loadPostWithAsyncFetchFunction() {
    try {
      const data = await getPostsWithAsync();
      if (!data) throw new Error('Unable to get post');
      setPosts(data);
    } catch (e) {
      const apiError = e as ResponseError;
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadPostWithAxiosError() {
    try {
      const data = await getPostsWithAxiosError();
      if (!data) throw new Error('Unable to get post');
      setPosts(data);
    } catch (e) {
      const apiError = e as ResponseError;
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPost();
  }, []);

  useEffect(() => {
    loadPost();
  }, [refreshCount]);

  return (
    <View style={styles.container}>
      {error ? (
        <Text>{error}</Text>
      ) : (
        <AllPost
          loading={loading}
          posts={post}
          setRefreshCount={setRefreshCount}
        />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
