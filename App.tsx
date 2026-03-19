/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { client } from './src/api/request';
import { useEffect, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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
  refreshing: boolean;
  onRefresh: () => void;
};

type Error = {
  error: string;
  message: string;
};

function AllPosts({ loading, posts, refreshing, onRefresh }: AllPostsProps) {
  return loading ? (
    <ActivityIndicator />
  ) : (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostItem {...item} />}
      contentContainerStyle={{ gap: 16 }}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
}

function AppContent() {
  // const safeAreaInsets = useSafeAreaInsets();
  const [posts, setPosts] = useState<PostProps[]>([]);

  const [loading, setLoading] = useState<Boolean>(true);

  const [error, setError] = useState<string>('');

  const [refreshing, setrefreshing] = useState<boolean>(false);

  const onRefresh = async () => {
    setrefreshing(true);
    try {
      await getPostWithAxiosUsingAsyncStorage();
      console.log('Posts after refresh:', posts);
    } catch (e) {
      const errormessage = e as Error;
      Alert.alert('Error', errormessage.message);
    } finally {
      setrefreshing(false);
      setLoading(false);
    }
  };

  function getPostWithAxiosUsingAsyncStorage() {
    return client.get('/posts').then(response => {
      const responseJson = response.data;
      setPosts(responseJson);
      return AsyncStorage.setItem('posts', JSON.stringify(responseJson));
    });
  }

  async function retrievePostsFromAsyncStorage(): Promise<PostProps[]> {
    const storedPosts = await AsyncStorage.getItem('posts');
    if (storedPosts) {
      return JSON.parse(storedPosts);
    }
    return [];
  }

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
    retrievePostsFromAsyncStorage().then(retrievedPosts => {
      if (retrievedPosts.length) {
        setPosts(retrievedPosts);
        setLoading(false);
      } else {
        return getPostWithAxiosUsingAsyncStorage();
      }
    });
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
});

export default App;
