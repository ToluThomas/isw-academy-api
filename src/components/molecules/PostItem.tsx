import { StyleSheet, Text, View } from 'react-native';

export type TPostProps = {
  id?: string;
  userId?: string;
  title: string;
  body: string;
};

export default function PostItem({ title, body, id }: TPostProps) {
  return (
    <View style={styles.listContainer}>
      <Text style={styles.listItem}>{id} - {title}</Text>
      <Text>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContainer: {
        padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc'
    },
    listItem: {
        fontSize: 18, fontWeight: 'bold'
    }
});