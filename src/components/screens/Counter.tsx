import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { decrement, increment } from '../../redux/slices/counterSlice';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { evenSelector } from '../../redux/selectors/counterSelector';

export function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const isEven = useSelector(evenSelector);
  const dispatch = useDispatch();

  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: safeAreaInsets.top }]}>
      <View>
        <Pressable onPress={() => dispatch(increment())}>
          <Text>Increment</Text>
        </Pressable>
        <Text>{`Count: ${count}`}</Text>
        <Pressable onPress={() => dispatch(decrement())}>
          <Text>Decrement</Text>
        </Pressable>
        <Text>{`${count} is ${isEven ? 'Even' : 'Odd'}`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
