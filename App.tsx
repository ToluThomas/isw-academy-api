import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store';
import { StatusBar, StyleSheet } from 'react-native';
import HomeScreen from './src/pages/HomeScreen';
import Counter from './src/Counter';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider style={styles.container}>
          <StatusBar />
          <HomeScreen />
          {/* <Counter /> */}
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
