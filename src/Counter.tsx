import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './redux/store';
import { decrement, increment } from './redux/slices/counterSlice';
import { Pressable, Text, View } from 'react-native';
import { evenSelector } from './redux/selectors/counterSelector';

export function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const isEven = useSelector(evenSelector);
  const dispatch = useDispatch();

  return (
    <View>
      <View>
        <Pressable onPress={() => dispatch(increment())}>
          <Text>Increment</Text>
        </Pressable>
        <Text>{`Count: ${count}`}</Text>
        <Pressable onPress={() => dispatch(decrement())}>
          <Text>Decrement</Text>
        </Pressable>

        <Text> {`${count} is ${isEven ? 'even' : 'odd'}`}</Text>
      </View>
    </View>
  );
}

export default Counter;
