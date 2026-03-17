import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { getPostsWithThen, PostProps } from '../api/posts';

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
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    getPostsWithThen()
      .then(setPosts)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
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
