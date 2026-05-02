import React from 'react';
import {CheckoutScreen} from '../../features/checkout/screens/checkout.screen';
import {CheckoutSuccessScreen} from '../../features/checkout/screens/checkout-success.screen';
import {CheckoutErrorScreen} from '../../features/checkout/screens/checkout-error.screen';
import {createStackNavigator} from '@react-navigation/stack';

export type CheckoutStackParamList = {
  CheckoutScreen: undefined;
  CheckoutSuccess: undefined;
  CheckoutError: undefined;
};

const CheckoutStack = createStackNavigator<CheckoutStackParamList>();

export const CheckoutNavigator = () => (
  <CheckoutStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <CheckoutStack.Screen
      name="CheckoutScreen"
      component={CheckoutScreen as any}
    />
    <CheckoutStack.Screen
      name="CheckoutSuccess"
      component={CheckoutSuccessScreen as any}
    />
    <CheckoutStack.Screen
      name="CheckoutError"
      component={CheckoutErrorScreen as any}
    />
  </CheckoutStack.Navigator>
);
