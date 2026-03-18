import { StyleSheet, View } from 'react-native';
import AllPosts from '../organisms/AllPosts';
import useFetchPosts from '../../hooks/useFetchPosts';

export default function Home() {
 const {posts,loading} = useFetchPosts()

  // Fetching and saving posts with AsyncStorage
  // useEffect(() => {
  //   retrievePostsFromAsyncStorage().then(retrievedPosts => {
  //     if (retrievedPosts.length > 0) {
  //       setPosts(retrievedPosts);
  //       setLoading(false);
  //     } else {
  //       getPostsWithAxios(setPosts);
  //     }
  //   });
  // }, []);

  return (
    <View style={styles.container}>
      <AllPosts isLoading={loading} posts={posts} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
