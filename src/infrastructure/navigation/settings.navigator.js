import React from 'react';
import {SettingsScreen} from '../../features/settings/screens/settings.screen';
import {FavoritesScreen} from '../../features/settings/screens/favorites.screen';
import {CameraScreen} from '../../features/settings/screens/camera.screen';

import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

const SettingsStack = createStackNavigator();

export const SettingsNavigator = ({route, navigation}) => {
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
        component={SettingsScreen}
      />
      <SettingsStack.Screen name="Favorites" component={FavoritesScreen} />
      <SettingsStack.Screen name="Camera" component={CameraScreen} />
    </SettingsStack.Navigator>
  );
};
