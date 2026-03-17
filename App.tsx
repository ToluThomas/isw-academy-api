/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';

const client = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { get } from 'react-native/Libraries/NativeComponent/NativeComponentRegistry';

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
  loading: Boolean;
  posts: PostProps[];
};

function AllPosts({ loading, posts }: AllPostsProps) {
  return loading ? (
    <ActivityIndicator />
  ) : (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostItem {...item} />}
      contentContainerStyle={{ gap: 16 }}
    />
  );
}

function AppContent() {
  // const safeAreaInsets = useSafeAreaInsets();
  const [posts, setPosts] = useState<PostProps[]>([]);

  const [loading, setLoading] = useState<Boolean>(true);

  const [error, setError] = useState<string>('');

  function getPostsWithAxios() {
    client
      .get('/posts')
      .then(Response => {
        setPosts(Response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function getPostsWithAxiosError() {
    client
      .get('/Tello')
      .then(Response => {
        setPosts(Response.data);
        setError('');
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function getPostsWithThen() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(responsejson => {
        setPosts(responsejson);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  async function getPostsWithAsyncAwait() {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
      );
      const responsejson = await response.json();
      setPosts(responsejson);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    // getPostsWithThen();
    getPostsWithAxiosError();
  }, []);

  console.log('Posts:', posts);

  return (
    <View style={styles.container}>
      {error ? (
        <Text>{error}</Text>
      ) : (
        <AllPosts loading={loading} posts={posts} />
      )}
    </View>
  );
}

function AppContent() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);

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

  async function getPostsWithAsync() {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
      );
      const responseJson = await response.json();
      setPosts(responseJson);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function getPostsWithAxios() {
    client
      .get('/posts')
      .then(response => {
        setPosts(response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    //getPostsWithThen();
    getPostsWithAsync();
  }, []);

  console.log('Posts: ', posts);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={posts}
          renderItem={({ item }) => <PostItem {...item} />}
          contentContainerStyle={{ gap: 16 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
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
});

export default App;
