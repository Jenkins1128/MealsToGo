import React from 'react';
import {ThemeProvider} from 'styled-components/native';
import {StatusBar} from 'react-native';

import {theme} from './src/infrastructure/theme';
import {RestaurantsContextProvider} from './src/services/restaurants/restaurants.context';
import {LocationContextProvider} from './src/services/location/location.context';
import {FavoritesContextProvider} from './src/services/favorites/favorites.context';
import {Navigation} from './src/infrastructure/navigation';

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <FavoritesContextProvider>
          <LocationContextProvider>
            <RestaurantsContextProvider>
              <Navigation />
            </RestaurantsContextProvider>
          </LocationContextProvider>
        </FavoritesContextProvider>
      </ThemeProvider>
      <StatusBar style="auto" />
    </>
  );
};

export default App;
