import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { client } from '../api/request';
import { createAsyncStorage } from '@react-native-async-storage/async-storage';

const storage = createAsyncStorage('AppDB');

type PostProps = {
  id?: number;
  userId?: number;
  title: string;
  body: string;
};

// type AllPostsProps = {
//   loading: Boolean;
//   posts: PostProps[];
// };

const HomeScreen = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<string>('');

  function PostItem({ title, body }: PostProps) {
    return (
      <View style={styles.postItem}>
        <Text>{title}</Text>
        <Text>{body}</Text>
      </View>
    );
  }

  function getPostsWithAxios() {
    client
      .get('/Posts')
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

  useEffect(() => {
    getPostsWithAxios();
  }, []);

  console.log('Posts:', posts);
};

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

export default HomeScreen;
