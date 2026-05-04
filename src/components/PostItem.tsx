import { View, Text } from 'react-native'
import React from 'react'

export type PostProps = {
  id?: number;
  userId?: number;
  title: string;
  body: string;
};

export default function PostItem({ title, body }: PostProps) {
  return (
    <View>
      <Text>{title}</Text>
      <Text>{body}</Text>
    </View>
  )
}
