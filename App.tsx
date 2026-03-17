/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {  StatusBar,useColorScheme } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import AppContent from './screens/HomeScreen';


function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}


// pull to refresh feature
// axios retry feature


export default App;
