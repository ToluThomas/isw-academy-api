/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const client = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
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

type PostProps = {
  id?: number;
  userId?: number;
  title: string;
  body: string;
};

function PostItem({ title, body }: PostProps) {
  return (
    <View>
      <Text>{title}</Text>
      <Text>{body}</Text>
    </View>
  );
}

type AllPostsProps = {
  loading: Boolean;
  posts?: PostProps[];
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
  const [posts, setPosts] = useState<PostProps[]>();
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<string>('');

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

  function getPostsWithAxiosError() {
    client
      .get('/lego')
      .then(response => {
        setPosts(response.data);
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
      .then(responseJson => {
        setPosts(responseJson);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function getPostWithAsync() {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
      );
      const responseJson = await response.json();
      setPosts(responseJson);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPostsWithAxiosError();
  }, []);

  console.log('Posts: ', posts);

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
