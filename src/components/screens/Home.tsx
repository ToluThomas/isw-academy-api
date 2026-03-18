import { StyleSheet, View } from 'react-native';
import AllPosts from '../organisms/AllPosts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Home() {
  const safeAreaInsets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: safeAreaInsets.top }]}>
      <AllPosts />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
