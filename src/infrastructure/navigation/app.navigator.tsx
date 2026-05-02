import React from 'react';
import Config from 'react-native-config';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Icon = Ionicons as any;
import {StripeProvider} from '@stripe/stripe-react-native';

const Provider = StripeProvider as any;

import {RestaurantsNavigator} from './restaurants.navigator';
import {SettingsNavigator} from './settings.navigator';
import {CheckoutNavigator} from './checkout.navigator';
import {MapScreen} from '../../features/map/screens/map.screen';

import {CartContextProvider} from '../../services/cart/cart.context';
import {FavoritesContextProvider} from '../../services/favorites/favorites.context';
import {LocationContextProvider} from '../../services/location/location.context';
import {RestaurantsContextProvider} from '../../services/restaurants/restaurants.context';

import {colors} from '../theme/colors';
import {RouteProp} from '@react-navigation/native';

export type AppTabParamList = {
  Restaurants: undefined;
  Map: undefined;
  Checkout: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<AppTabParamList>();

const TAB_ICON: {[key: string]: string} = {
  Restaurants: 'md-restaurant',
  Map: 'md-map',
  Checkout: 'md-cart',
  Settings: 'md-settings',
};

const createScreenOptions = ({
  route,
}: {
  route: RouteProp<AppTabParamList, keyof AppTabParamList>;
}): BottomTabNavigationOptions => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({size, color}) => (
      <Icon name={iconName} size={size} color={color} />
    ),
    tabBarActiveTintColor: colors.brand.primary,
    tabBarInactiveTintColor: colors.brand.muted,
    headerShown: false,
  };
};

export const AppNavigator = () => (
  <FavoritesContextProvider>
    <LocationContextProvider>
      <RestaurantsContextProvider>
        <CartContextProvider>
          <Provider publishableKey={`${Config.STRIPE_PUBLISHABLE_KEY}`}>
            <Tab.Navigator screenOptions={createScreenOptions}>
              <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
              <Tab.Screen name="Checkout" component={CheckoutNavigator} />
              <Tab.Screen name="Map" component={MapScreen as any} />
              <Tab.Screen name="Settings" component={SettingsNavigator} />
            </Tab.Navigator>
          </Provider>
        </CartContextProvider>
      </RestaurantsContextProvider>
    </LocationContextProvider>
  </FavoritesContextProvider>
);
