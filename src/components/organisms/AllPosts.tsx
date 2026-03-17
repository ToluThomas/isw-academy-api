import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import PostItem, { TPostProps } from '../molecules/PostItem';

type TAllPostsProps = {
  isLoading?: boolean;
  posts?: TPostProps[];
};

export default function AllPosts({ isLoading, posts }: TAllPostsProps) {
  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostItem {...item} />}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: { gap: 16 },
});
