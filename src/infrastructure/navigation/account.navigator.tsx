import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AccountScreen} from '../../features/account/screens/account.screen';
import {LoginScreen} from '../../features/account/screens/login.screen';
import {RegisterScreen} from '../../features/account/screens/register.screen';

export type AccountStackParamList = {
  Main: undefined;
  Login: undefined;
  Register: undefined;
};

const Stack = createStackNavigator<AccountStackParamList>();

export const AccountNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={AccountScreen as any} />
      <Stack.Screen name="Login" component={LoginScreen as any} />
      <Stack.Screen name="Register" component={RegisterScreen as any} />
    </Stack.Navigator>
  );
};
