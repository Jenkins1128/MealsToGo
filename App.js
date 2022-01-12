import React from 'react';
import {ThemeProvider} from 'styled-components/native';
import {StatusBar} from 'react-native';

import {theme} from './src/infrastructure/theme';
import {Navigation} from './src/infrastructure/navigation';

import {RestaurantsContextProvider} from './src/services/restaurants/restaurants.context';
import {LocationContextProvider} from './src/services/location/location.context';
import {FavoritesContextProvider} from './src/services/favorites/favorites.context';
import {AuthenticationContextProvider} from './src/services/authentication/authentication.context';

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <FavoritesContextProvider>
            <LocationContextProvider>
              <RestaurantsContextProvider>
                <Navigation />
              </RestaurantsContextProvider>
            </LocationContextProvider>
          </FavoritesContextProvider>
        </AuthenticationContextProvider>
      </ThemeProvider>
      <StatusBar style="auto" />
    </>
  );
};

export default App;
