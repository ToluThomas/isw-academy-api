import { StyleSheet, View } from 'react-native';
import AllPosts from '../organisms/AllPosts';

export default function Home() {
  return (
    <View style={styles.container}>
      <AllPosts />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
