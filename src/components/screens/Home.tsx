import { useEffect, useState } from 'react';
import { getPostsWithAxios } from '../../helpers/api/posts';
import { TPostProps } from '../molecules/PostItem';
import { StyleSheet, View } from 'react-native';
import AllPosts from '../organisms/AllPosts';
import { retrievePostsFromMMKV, savePostsInMMKV } from '../../helpers/api';

export default function Home() {
  const [posts, setPosts] = useState<TPostProps[]>();
  const [loading, setLoading] = useState<boolean>(false);

  function onFetchPosts(posts: TPostProps[]) {
    setPosts(posts);
    savePostsInMMKV(posts);
  }

  function stopLoading() {
    setLoading(false);
  }

  useEffect(() => {
    const storedPosts = retrievePostsFromMMKV();
    if (storedPosts.length > 0) setPosts(storedPosts);
    else getPostsWithAxios(onFetchPosts).finally(stopLoading);
  }, []);

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
