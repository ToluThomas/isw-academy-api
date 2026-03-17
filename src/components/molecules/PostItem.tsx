import { Text, View } from 'react-native';

export type TPostProps = {
  id?: string;
  userId?: string;
  title: string;
  body: string;
};

export default function PostItem({ title, body }: TPostProps) {
  return (
    <View>
      <Text>{title}</Text>
      <Text>{body}</Text>
    </View>
  );
}
