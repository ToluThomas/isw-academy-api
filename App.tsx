/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
// import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// const client = axios.create({
//   baseURL: 'https://jsonplaceholder.typicode.com',
// });

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

type PostProps = {
  id?: number;
  userId?: number;
  title: string;
  body: string;
};

function PostItem({ title, body }: PostProps) {
  return (
    <View style={styles.postItem}>
      <Text>{title}</Text>
      <Text>{body}</Text>
    </View>
  );
}

type AllPostsProps = {
  loading: boolean;
  posts: PostProps[];
  refreshing: boolean;
  onRefresh: () => void;
  error: string;
};

type ResponseError = {
  message: string;
};

function AllPosts({
  loading,
  posts,
  refreshing,
  onRefresh,
  error,
}: AllPostsProps) {
  return loading ? (
    <ActivityIndicator />
  ) : error ? (
    <Text>{error}</Text>
  ) : (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostItem {...item} />}
      contentContainerStyle={styles.flatListContent}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
}

function AppContent() {
  // const safeAreaInsets = useSafeAreaInsets();
  const [posts, setPosts] = useState<PostProps[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<string>('');

  const [refreshing, setRefreshing] = useState<boolean>(false);

  // function getPostsWithAxios() {
  //   client
  //     .get('/posts')
  //     .then(Response => {
  //       setPosts(Response.data);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }

  // create a storage instance
  // const storage = createAsyncStorage("appDB");

  // function getPostsWithAxiosError() {
  //   client
  //     .get('/Tello')
  //     .then(Response => {
  //       setPosts(Response.data);
  //       setError('');
  //     })
  //     .catch(error => {
  //       setError(error.message);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // // }

  // function getPostsWithThen() {
  //   fetch('https://jsonplaceholder.typicode.com/posts')
  //     .then(response => response.json())
  //     .then(responsejson => {
  //       setPosts(responsejson);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getPostsWithAsyncAwait();
  }, []);

  async function getPostsWithAsyncAwait() {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
      );
      const responseJson = await response.json();
      setPosts(responseJson);
      await AsyncStorage.setItem('posts', JSON.stringify(responseJson));
    } catch (err) {
      const error = err as ResponseError;
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }
  const getPostsFromAsyncStorage = async () => {
    const postsString = await AsyncStorage.getItem('posts');
    const storagePosts = postsString ? JSON.parse(postsString) : [];
    setPosts(storagePosts);
  };
  useEffect(() => {
    getPostsFromAsyncStorage();
  }, []);

  const getAvailablePosts = () => {
    return AsyncStorage.getItem('posts').then(async post => {
      if (post) {
        setPosts(JSON.parse(post));
        setLoading(false);
      } else {
        getPostsWithAsyncAwait();
      }
    });
  };

  useEffect(() => {
    // getPostsWithThen();
    // getPostsWithAxiosError();
    // getPostsWithAsyncAwait();
    getAvailablePosts();
  }, []);

  console.log('Posts:', posts);

  return (
    <View style={styles.container}>
      {error ? (
        <Text>{error}</Text>
      ) : (
        <AllPosts
          loading={loading}
          posts={posts}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  postItem: {
    marginHorizontal: 10,
    paddingHorizontal: 20,
    gap: 8,
    borderColor: 'green',
    borderRadius: 10,
    borderWidth: 1,
  },
  flatListContent: {
    gap: 16,
  },
});

export default App;
