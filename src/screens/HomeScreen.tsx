import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { getPostsWithAxios, TPostProps } from '../api/posts';
import AsyncStorage from '@react-native-async-storage/async-storage';

function PostItem({ title, body }: TPostProps) {
  return (
    <View style={styles.postItem}>
      <Text>{title}</Text>
      <Text>{body}</Text>
    </View>
  );
}

type AllPostsProps = {
  loading: boolean;
  posts: TPostProps[];
};

function AllPosts({ loading, posts }: AllPostsProps) {
  return loading ? (
    <ActivityIndicator />
  ) : (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostItem {...item} />}
      showsVerticalScrollIndicator={false}
    />
  );
}

export default function HomeScreen() {
  const [posts, setPosts] = useState<TPostProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  async function getPostsFromStorage(): Promise<TPostProps[]> {
    const postsString = await AsyncStorage.getItem('posts');
    if (postsString) return JSON.parse(postsString);
    return [];
  }

  useEffect(() => {
    getPostsFromStorage().then(storedPosts => {
      if (storedPosts.length) {
        setPosts(storedPosts);
        setLoading(false);
      } else {
        getPostsWithAxios()
          .then(async (data: TPostProps[]) => {
            setPosts(data);
            await AsyncStorage.setItem('posts', JSON.stringify(data));
          })
          .catch(err => setError(err.message))
          .finally(() => setLoading(false));
      }
    });
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 48,
  },
  postItem: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    gap: 8,
    borderColor: 'red',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 16,
  },
});
