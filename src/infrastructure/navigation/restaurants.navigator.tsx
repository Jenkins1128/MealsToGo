import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {RestaurantsScreen} from '../../features/restaurants/screens/restaurants.screen';
import {RestaurantDetailScreen} from '../../features/restaurants/screens/restaurant-detail.screen';
import {Restaurant} from '../../services/types';

export type RestaurantStackParamList = {
  RestaurantList: undefined;
  RestaurantDetail: {restaurant: Restaurant};
};

const RestaurantStack = createStackNavigator<RestaurantStackParamList>();

export const RestaurantsNavigator = () => {
  return (
    <RestaurantStack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.ModalPresentationIOS,
      }}>
      <RestaurantStack.Screen
        name="RestaurantList"
        component={RestaurantsScreen as any}
      />
      <RestaurantStack.Screen
        name="RestaurantDetail"
        component={RestaurantDetailScreen as any}
      />
    </RestaurantStack.Navigator>
  );
};
