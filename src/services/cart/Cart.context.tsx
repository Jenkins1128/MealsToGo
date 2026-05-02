import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../authentication/Authentication.context";
import { Restaurant, CartItem } from "../Types";

interface CartContextValue {
  addToCart: (item: CartItem, restaurant: Restaurant) => void;
  clearCart: () => void;
  restaurant: Restaurant | null;
  cart: CartItem[];
  sum: number;
}

export const CartContext = createContext<CartContextValue>(
  {} as CartContextValue
);

interface Props {
  children: ReactNode;
}

export const CartContextProvider = ({ children }: Props) => {
  const { user } = useContext(AuthenticationContext);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
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
    const newSum = cart.reduce((acc, { price }) => {
      return (acc += price);
    }, 0);
    setSum(newSum);
  }, [cart]);

  const saveCart = async (
    rst: Restaurant | null,
    crt: CartItem[],
    uid: string
  ) => {
    try {
      const item = `@cart-${uid}`;
      const jsonValue = JSON.stringify({ restaurant: rst, cart: crt });
      await AsyncStorage.setItem(item, jsonValue);
    } catch (e) {
      console.log("error storing", e);
    }
  };

  const loadCart = async (uid: string) => {
    try {
      const item = `@cart-${uid}`;
      const value = await AsyncStorage.getItem(item);
      if (value !== null) {
        const { restaurant: rst, cart: crt } = JSON.parse(value);
        setRestaurant(rst);
        setCart(crt);
      }
    } catch (error) {
      console.log("error loading", error);
    }
  };

  const add = (item: CartItem, rst: Restaurant) => {
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
    if (user && user.uid) {
      saveCart(null, [], user.uid);
    }
  };

  return (
    <CartContext.Provider
      value={{
        addToCart: add,
        clearCart: clear,
        restaurant,
        cart,
        sum,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
