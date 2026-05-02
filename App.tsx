import React from 'react';
import {ThemeProvider as StyledThemeProvider} from 'styled-components/native';
const ThemeProvider = StyledThemeProvider as any;
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
      <ThemeProvider theme={theme as any}>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <StatusBar barStyle="default" />
    </>
  );
};

export default App;
