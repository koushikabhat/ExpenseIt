import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import RootNavigator from './src/navigation/RootNavigator';
import {ThemeProvider} from './src/theme/ThemeProvider';
import { Provider, useSelector } from 'react-redux';
import { RootState, store } from './src/store';
import { useAppBootstrap } from './src/hooks/useAppBootsrap';
import AuthNavigator from './src/navigation/AuthNavigator';


const AppContent = () => {
  const { isInitializing , isAuthenticated} = useSelector( (state: RootState) => state.auth);

  useAppBootstrap();

  // if(isInitializing){
  //   // render splash
  // }

  return(
    <NavigationContainer>
      {isAuthenticated ? <RootNavigator/> : <AuthNavigator/> }
    </NavigationContainer>
  );
};


function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AppContent/>
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;