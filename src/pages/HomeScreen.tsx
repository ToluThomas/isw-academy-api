import { useEffect } from 'react';
import { StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { postSelector } from '../redux/selectors/postSelectors';
import { fetchPosts } from '../redux/slices/postSlice';
import { AppDispatch } from '../redux/store';
import PostItem from './../components/PostItem';
// import { PostProps } from '../components/PostItem';

// type AllPostsProps = {
//   loading: Boolean;
//   posts: PostProps[];
// };

export default function AllPosts() {
  const { posts, isLoading } = useSelector(postSelector);
  const dispatch = useDispatch<AppDispatch>();

  function onRefresh() {
    dispatch(fetchPosts());
  }

  useEffect(() => {
    if (!posts.length) onRefresh();
  }, [posts.length]);

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
