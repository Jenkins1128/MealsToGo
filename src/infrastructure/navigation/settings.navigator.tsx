import React from 'react';
import {SettingsScreen} from '../../features/settings/screens/settings.screen';
import {FavoritesScreen} from '../../features/settings/screens/favorites.screen';

import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

export type SettingsStackParamList = {
  Settings: undefined;
  Favorites: undefined;
};

const SettingsStack = createStackNavigator<SettingsStackParamList>();

export const SettingsNavigator = () => {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerMode: 'screen',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <SettingsStack.Screen
        options={{
          headerShown: false,
        }}
        name="Settings"
        component={SettingsScreen as any}
      />
      <SettingsStack.Screen
        name="Favorites"
        component={FavoritesScreen as any}
      />
    </SettingsStack.Navigator>
  );
};
