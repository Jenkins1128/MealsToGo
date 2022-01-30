import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StripeProvider} from '@stripe/stripe-react-native';

import {RestaurantsNavigator} from './restaurants.navigator';
import {SettingsNavigator} from './settings.navigator';
import {MapScreen} from '../../features/map/screens/map.screen';
import {CheckoutScreen} from '../../features/checkout/screens/checkout.screen';

import {CartContextProvider} from '../../services/cart/cart.context';
import {FavoritesContextProvider} from '../../services/favorites/favorites.context';
import {LocationContextProvider} from '../../services/location/location.context';
import {RestaurantsContextProvider} from '../../services/restaurants/restaurants.context';

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Restaurants: 'md-restaurant',
  Map: 'md-map',
  Checkout: 'md-cart',
  Settings: 'md-settings',
};

const createScreenOptions = ({route}) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({size, color}) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
    tabBarActiveTintColor: 'tomato',
    tabBarInactiveTintColor: 'gray',
    headerShown: false,
  };
};

export const AppNavigator = () => (
  <FavoritesContextProvider>
    <LocationContextProvider>
      <RestaurantsContextProvider>
        <CartContextProvider>
          <StripeProvider publishableKey="pk_test_51KMdFbC4rLDQVhD8adxbNOCgIvej4WHteLyZJiQsweDEVUaBXs0HOwEja5GntVj0NdMXqmflm331zD0FPifNsH04000F5udQLI">
            <Tab.Navigator screenOptions={createScreenOptions}>
              <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
              <Tab.Screen name="Checkout" component={CheckoutScreen} />
              <Tab.Screen name="Map" component={MapScreen} />
              <Tab.Screen name="Settings" component={SettingsNavigator} />
            </Tab.Navigator>
          </StripeProvider>
        </CartContextProvider>
      </RestaurantsContextProvider>
    </LocationContextProvider>
  </FavoritesContextProvider>
);
