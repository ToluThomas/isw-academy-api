import { useEffect } from 'react';
import PostItem from '../molecules/PostItem';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { postsSelector } from '../../redux/selectors/postsSelector';
import { fetchPosts } from '../../redux/slices/postsSlice';
import { AppDispatch } from '../../redux/store';

export default function AllPosts() {
  const { posts, isLoading } = useSelector(postsSelector);
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
