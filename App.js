import React from 'react';
import {ThemeProvider} from 'styled-components/native';
import {StatusBar} from 'react-native';

import {theme} from './src/infrastructure/theme';
import {RestaurantsScreen} from './src/features/screens/restaurants.screen';

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <RestaurantsScreen />
      </ThemeProvider>
      <StatusBar style="auto" />
    </>
  );
};

export default App;
