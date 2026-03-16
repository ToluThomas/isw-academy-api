/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import axios from 'axios';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

const client = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 1000,
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

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");



  const getPostsWithAwaitAxios = async () => {
    try {
      const fetchPosts = await client.get('/posts');
      setPosts(fetchPosts.data);
      setError("");
    } catch (err) {
      setError("Error fetching posts");
      console.error('Error fetching all posts:', err);
    } finally {
      setLoading(false);
    };
  }

  const getPostsWithThenFetch = () => {
    client.get('/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const getFunctionsWithAsync = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getPostsWithAwaitAxios();
  }, [])

  return (
    <View style={[styles.container, { paddingVertical: safeAreaInsets.top }]}>
      {loading ? (
        <View style={styles.loadContainer}>
          <View>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading...</Text>
          </View>
        </View>
      ) : (
        error ? (
          <View style={styles.loadContainer}>
            <Text>{error}</Text>
          </View>
        ) : (<FlatList<any>
          data={posts}
          keyExtractor={item => item.id.toString()}
          contentInset={safeAreaInsets}
          renderItem={({ item }) => (
            <View style={styles.listContainer}>
              <Text>
                <Text style={styles.listItem}>{item.id} {" "}</Text>
                <Text style={styles.listItem}>{item.title}</Text>
              </Text>
              <Text>{item.body}</Text>
            </View>
          )}
        />)
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc'
  },
  listItem: {
    fontSize: 18, fontWeight: 'bold'
  }
});

export default App;
