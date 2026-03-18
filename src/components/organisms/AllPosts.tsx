import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import PostItem, { TPostProps } from '../molecules/PostItem';
// import { useState } from 'react';
import useFetchPosts from '../../hooks/useFetchPosts';

type TAllPostsProps = {
  isLoading?: boolean;
  posts?: TPostProps[];
};

export default function AllPosts({ isLoading, posts }: TAllPostsProps) {

  // const [refreshing, setRefreshing] = useState(false);

  const { handleRefresh } = useFetchPosts()
  // const fetchNewData = async () => {
  //   setRefreshing(true); // Start the refresh indicator

  //   try {
  //     // Replace with your actual data fetching logic (e.g., API call)
  //     const response = await fetch('https://api.example.com');
  //     const newData = await response.json();
  //     setData(newData); // Update your list data
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   } finally {
  //     setRefreshing(false); // Stop the refresh indicator
  //   }
  // };

  function handlePostRefresh() {
    handleRefresh();
  }

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <FlatList
      data={posts}
      refreshing={isLoading}
      onRefresh={handlePostRefresh}
      renderItem={({ item }) => <PostItem {...item} />}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: { gap: 16 },
});
