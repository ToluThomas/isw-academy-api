import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  getPostFromAsyncStorage,
  getPostsWithAsync,
  getPostsWithAxiosError,
  getPostsWithThen,
  PostProp,
} from '../api/post';

type AllPostProps = {
  loading: Boolean;
  posts: PostProp[];
};

type ResponseError = {
  message: string;
};

function AllPost({ loading, posts }: AllPostProps) {
  // const [refreshing, setRefreshing] = useState<Boolean | null | undefined> (false)

  //   const listRef = useRef<FlatList<PostProp>>(null);

  //   async function getRefreshedPosts () {
  //   try {
  //     const resfreshedData = getPostsWithAxios();
  //   } catch (error) {

  //   }
  // }

  // const onRefresh = async () => {
  //   setRefreshing(true);
  //   await loadPosts();

  //   listRef.current?.scrollToOffset({ offset: 0, animated: true }); // ✅ scroll to top
  //   setRefreshing(false);
  // };

  return loading ? (
    <ActivityIndicator />
  ) : (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostItem {...item} />}
      contentContainerStyle={styles.contentContainer}
      // refreshing={refreshing}
      // onRefresh={onRefresh}
    />
  );
}

function PostItem({ title, body }: PostProp) {
  return (
    <View style={styles.PostItem}>
      <Text>{title}</Text>
      <Text>{body}</Text>
    </View>
  );
}

const HomeScreen = () => {
  const [post, setPosts] = useState<PostProp[]>([]);

  const [loading, setLoading] = useState<Boolean>(true);

  const [error, setError] = useState<string>('');

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
    // getPostsWithThen();
    // getPostsWithAsync();
    // getPostsWithAxiosError();
    // PostsWithAxios();
    // getPostFromAsyncStorage();
    loadPost();
    //loadPostWithAsyncFetchFunction();
    //loadPostWithThen();
    //loadPostWithAxiosError();
  }, []);

  return (
    <View style={styles.container}>
      {error ? (
        <Text>{error}</Text>
      ) : (
        <AllPost loading={loading} posts={post} />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  PostItem: {
    paddingHorizontal: 12,
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'green',
  },
  contentContainer: {
    gap: 16,
  },
});
