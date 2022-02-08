import React, {createContext, useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AuthenticationContext} from '../authentication/authentication.context';

export const CartContext = createContext();

export const CartContextProvider = ({children}) => {
  const {user} = useContext(AuthenticationContext);
  const [cart, setCart] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [sum, setSum] = useState(0);

  useEffect(() => {
    if (user && user.uid) {
      loadCart(user.uid);
    }
  }, [user]);

  useEffect(() => {
    if (user && user.uid && cart.length) {
      saveCart(restaurant, cart, user.uid);
    }
  }, [restaurant, cart, user]);

  useEffect(() => {
    if (!cart.length) {
      setSum(0);
      return;
    }
    const newSum = cart.reduce((acc, {price}) => {
      return (acc += price);
    }, 0);
    setSum(newSum);
  }, [cart]);

  const saveCart = async (rst, crt, uid) => {
    try {
      const item = `@cart-${uid}`;
      const jsonValue = JSON.stringify({restaurant: rst, cart: crt});
      await AsyncStorage.setItem(item, jsonValue);
    } catch (e) {
      console.log('error storing', e);
    }
  };

  const loadCart = async uid => {
    try {
      const item = `@cart-${uid}`;
      const value = await AsyncStorage.getItem(item);
      if (value !== null) {
        const {restaurant: rst, cart: crt} = JSON.parse(value);
        setRestaurant(rst);
        setCart(crt);
      }
    } catch (error) {
      console.log('error loading', error);
    }
  };

  const add = (item, rst) => {
    if (!restaurant || restaurant.placeId !== rst.placeId) {
      setRestaurant(rst);
      setCart([item]);
      return;
    }
    setCart([...cart, item]);
  };

  const clear = () => {
    setCart([]);
    setRestaurant(null);
    saveCart(null, [], user.uid);
  };

  return (
    <CartContext.Provider
      value={{
        addToCart: add,
        clearCart: clear,
        restaurant,
        cart,
        sum,
      }}>
      {children}
    </CartContext.Provider>
  );
};
