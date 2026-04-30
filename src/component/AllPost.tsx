import React, { useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { PostSelector } from '../../redux/reduxSelectors/postsSelectors';
import { fetchPosts } from '../../redux/reduxSlices/postsSlice';
import { AppDispatch } from '../../redux/reduxStore/store';
import { PostProp } from '../api/post';

function PostItem({ title, body }: PostProp) {
  return (
    <View style={styles.PostItem}>
      <Text>{title}</Text>
      <Text>{body}</Text>
    </View>
  );
}

const AllPost = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, isLoading } = useSelector(PostSelector);

  const listRef = useRef<FlatList<PostProp>>(null);

  useEffect(() => {
    if (!posts.length) onRefresh();
  }, [posts.length]);

  async function onRefresh() {
    dispatch(fetchPosts());
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  }

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostItem {...item} />}
      contentContainerStyle={styles.contentContainer}
      refreshing={isLoading}
      onRefresh={onRefresh}
    />
  );
};

export default AllPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  PostItem: {
    paddingHorizontal: 12,
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'green',
  },
  contentContainer: {
    gap: 16,
  },
  errorMessageView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessageText: {
    color: '#000000',
  },
});
