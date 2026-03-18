import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { getPostsWithAxios, PostProp } from '../api/post';

type AllPostProps = {
  loading: Boolean;
  posts: PostProp[];
  setRefreshCount?: React.Dispatch<React.SetStateAction<number>>;
};

function PostItem({ title, body }: PostProp) {
  return (
    <View style={styles.PostItem}>
      <Text>{title}</Text>
      <Text>{body}</Text>
    </View>
  );
}

const AllPost = ({ loading, posts, setRefreshCount }: AllPostProps) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const listRef = useRef<FlatList<PostProp>>(null);

  async function getRefreshedPosts() {
    await getPostsWithAxios();
    setRefreshCount?.(prev => prev + 1);
  }

  const onRefresh = async () => {
    setRefreshing(true);
    await getRefreshedPosts();

    listRef.current?.scrollToOffset({ offset: 0, animated: true });
    setRefreshing(false);
  };

  return loading ? (
    <ActivityIndicator />
  ) : (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostItem {...item} />}
      contentContainerStyle={styles.contentContainer}
      refreshing={refreshing}
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
});
