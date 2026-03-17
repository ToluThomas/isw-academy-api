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
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

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
    <View style={styles.postItem}>
      <Text style={styles.title}>{title}</Text>
      <Text>{body}</Text>
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
    paddingTop: 24,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  postItem: {
    marginHorizontal: 8,
    paddingHorizontal: 20,
    paddingVertical: 8,
    gap: 8,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 16,
  },
  title: {},
});

export default App;
