import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from './src/components/screens/Home';
import { Provider as ReduxProvider } from 'react-redux';
import { persistor, store } from './src/redux/store';
import { Counter } from './src/components/screens/Counter';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <Home />
          {/* <Counter /> */}
        </SafeAreaProvider>
      </PersistGate>
    </ReduxProvider>
  );
}

export default App;
