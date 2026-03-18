import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import PostItem, { TPostProps } from '../molecules/PostItem';
import { useEffect, useState } from 'react';
import { retrievePostsFromMMKV, savePostsInMMKV } from '../../helpers/api';
import { getPostsWithAxios } from '../../helpers/api/posts';

export default function AllPosts() {
  const [posts, setPosts] = useState<TPostProps[]>();
  const [isLoading, setLoading] = useState<boolean>(false);

  function onFetchPosts(posts: TPostProps[]) {
    setPosts(posts);
    savePostsInMMKV(posts);
  }

  function stopLoading() {
    setLoading(false);
  }

  function onRefresh() {
    getPostsWithAxios(posts => {
      onFetchPosts(posts);
    }).finally(stopLoading);
  }

  useEffect(() => {
    const storedPosts = retrievePostsFromMMKV();
    if (storedPosts.length > 0) setPosts(storedPosts);
    else onRefresh();
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

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostItem {...item} />}
      contentContainerStyle={styles.list}
      refreshing={isLoading}
      onRefresh={onRefresh}
    />
  );
}

const styles = StyleSheet.create({
  list: { gap: 16 },
});
