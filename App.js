import React from 'react';
import {ThemeProvider} from 'styled-components/native';
import {StatusBar, LogBox} from 'react-native';

import {theme} from './src/infrastructure/theme';
import {Navigation} from './src/infrastructure/navigation';

import {AuthenticationContextProvider} from './src/services/authentication/authentication.context';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  'Found screens with the same name nested inside one another.',
]);

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <StatusBar style="auto" />
    </>
  );
};

export default App;
