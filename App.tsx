/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { useEffect, useState } from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const client = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

//const apiClient
const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
});
// Configure automatic retries
axiosRetry(client, {
  retries: 3,
  retryDelay: retryCount => {
    // Exponential backoff: 1s, 2s, 4s...
    return Math.pow(2, retryCount) * 1000;
  },
  retryCondition: error => {
    // Retry on network errors or 5xx responses
    // Don't retry on 4xx client errors
    return (
      axiosRetry.isNetworkError(error) || axiosRetry.isRetryableError(error)
    );
  },
  onRetry: (count, error) => {
    console.log(`Retry ${count}: ${error.message}`);
  },
});

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

type PostProp = {
  title: string;
  body: string;
  userId?: number;
  id?: number;
};

function PostItem({ title, body }: PostProp) {
  return (
    <View style={styles.PostItem}>
      <Text>{title}</Text>
      <Text>{body}</Text>
    </View>
  );
}

type AllPostProps = {
  loading: Boolean;
  posts: PostProp[];
};

function AllPost({ loading, posts }: AllPostProps) {
  return loading ? (
    <ActivityIndicator />
  ) : (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostItem {...item} />}
      contentContainerStyle={styles.contentContainer}
    />
  );
}

type ResponseError = {
  message: string;
};
function AppContent() {
  // const safeAreaInsets = useSafeAreaInsets();
  const [post, setPosts] = useState<PostProp[]>([]);

  const [loading, setLoading] = useState<Boolean>(true);

  const [error, setError] = useState<string>('');

  function getPostsWithThen() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(responseJson => {
        setPosts(responseJson);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const getPostFromAsyncStorage = async () => {
    const availablePost = await AsyncStorage.getItem('Posts');
    if (availablePost) {
      setPosts(JSON.parse(availablePost));
      setLoading(false);
    } else {
      getPostsWithAxios();
    }
  };

  // async function getPostsWithAsync() {
  //   try {
  //     const response = await fetch(
  //       'https://jsonplaceholder.typicode.com/posts',
  //     );

  //     const responseJson = await response.json();

  //     setPosts(responseJson);
  //   } catch (e) {
  //     const error = e as ResponseError;
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  function getPostsWithAxios() {
    client
      .get('/posts')
      .then(async response => {
        setPosts(response.data);
        await AsyncStorage.setItem('Posts', JSON.stringify(response.data));
        // await Set_Encrypted_AsyncStorage(
        //   Object,
        //   'Posts',
        //   response.data,
        //   'Yhoung',
        // );
      })
      .catch(({ message }: ResponseError) => {
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  // function getPostsWithAxiosError() {
  //   client
  //     .get('/yhoung')
  //     .then(response => {
  //       setPosts(response.data);
  //       setError('');
  //     })
  //     .catch(error => {
  //       setError(error.message);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }

  // create a storage instance

  // async function demo() {
  //   await storage.setItem('userToken', 'abc123');

  //   const token = await storage.getItem('userToken');
  //   console.log('Stored token:', token); // abc123

  //   await storage.removeItem('userToken');
  // }

  useEffect(() => {
    // getPostsWithThen();
    // getPostsWithAsync();
    // getPostsWithAxiosError();
    //etPostsWithAxios();
    //getPostFromAsyncStorage();
    getPostFromAsyncStorage();
  }, []);

  console.log('Posts', post);

  return (
    <View style={styles.container}>
      {error ? (
        <Text>{error}</Text>
      ) : (
        <AllPost loading={loading} posts={post} />
      )}
    </View>
  );
}

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

export default App;
