import { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  FlatList,
} from 'react-native';

import { postSelector } from '../redux/selectors/postSelectors';
import { AppDispatch } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../redux/slices/postSlice';

type PostProps = {
  id?: number;
  userId?: number;
  title: string;
  body: string;
};

type AllPostsProps = {
  loading?: boolean;
  posts: PostProps[];
  refreshing?: boolean;
  onRefresh: () => void;
};

function PostItem({ title, body }: PostProps) {
  return (
    <View style={styles.postItem}>
      <Text style={styles.postTitle}>{title}</Text>
      <Text>{body}</Text>
    </View>
  );
}

function AllPosts({ loading, posts, refreshing, onRefresh }: AllPostsProps) {
  return loading ? (
    <ActivityIndicator />
  ) : (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostItem {...item} />}
      // `gap` isn't supported in all React Native versions — use a separator instead
      contentContainerStyle={{ padding: 16 }}
      ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
}

const HomeScreen = () => {
  const { posts, isLoading, errorMessage } = useSelector(postSelector);
  const dispatch = useDispatch<AppDispatch>();

  function onRefresh() {
    dispatch(fetchPosts());
  }

  useEffect(() => {
    onRefresh();
  }, []);

  // const getPostWithAxiosUsingAsyncStorage = () => {
  //   return client.get('/posts').then(response => {
  //     const responseJson = response.data;
  //     setPosts(responseJson);
  //     return AsyncStorage.setItem('posts', JSON.stringify(responseJson));
  //   });
  // };

  // async function retrievePostsFromAsyncStorage(): Promise<PostProps[]> {
  //   const storedPosts = await AsyncStorage.getItem('posts');
  //   if (storedPosts) {
  //     return JSON.parse(storedPosts);
  //   }
  //   return [];
  // }

  // const onRefresh = async () => {
  //   setRefreshing(true);
  //   try {
  //     await getPostWithAxiosUsingAsyncStorage();
  //   } catch (e) {
  //     const err = e as ErrorObj;
  //     Alert.alert('Error', err.message);
  //   } finally {
  //     setRefreshing(false);
  //     setLoading(false);
  //   }
  // };

  return (
    <View style={styles.container}>
      {errorMessage ? (
        <Text>{errorMessage}</Text>
      ) : (
        <AllPosts
          loading={isLoading}
          posts={posts}
          refreshing={isLoading}
          onRefresh={onRefresh}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  postItem: {
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderColor: 'green',
    borderRadius: 10,
    borderWidth: 1,
  },
  postTitle: {
    marginBottom: 8,
  },
});

export default HomeScreen;
