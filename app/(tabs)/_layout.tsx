import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StripeProvider } from "@stripe/stripe-react-native";
import Constants from "expo-constants";

import { FavoritesContextProvider } from "@/services/favorites/Favorites.context";
import { LocationContextProvider } from "@/services/location/Location.context";
import { RestaurantsContextProvider } from "@/services/restaurants/Restaurants.context";
import { CartContextProvider } from "@/services/cart/Cart.context";
import { colors } from "@/infrastructure/theme/Colors";

const stripeKey =
  Constants.expoConfig?.extra?.stripePublishableKey ?? "";

export default function TabsLayout() {
  return (
    <FavoritesContextProvider>
      <LocationContextProvider>
        <RestaurantsContextProvider>
          <CartContextProvider>
            <StripeProvider publishableKey={stripeKey}>
              <Tabs
                screenOptions={{
                  headerShown: false,
                  tabBarActiveTintColor: colors.brand.primary,
                  tabBarInactiveTintColor: colors.brand.muted,
                }}
              >
                <Tabs.Screen
                  name="restaurants"
                  options={{
                    title: "Restaurants",
                    tabBarIcon: ({ size, color }) => (
                      <Ionicons
                        name="restaurant"
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                />
                <Tabs.Screen
                  name="checkout"
                  options={{
                    title: "Checkout",
                    tabBarIcon: ({ size, color }) => (
                      <Ionicons name="cart" size={size} color={color} />
                    ),
                  }}
                />
                <Tabs.Screen
                  name="Map"
                  options={{
                    title: "Map",
                    tabBarIcon: ({ size, color }) => (
                      <Ionicons name="map" size={size} color={color} />
                    ),
                  }}
                />
                <Tabs.Screen
                  name="settings"
                  options={{
                    title: "Settings",
                    tabBarIcon: ({ size, color }) => (
                      <Ionicons
                        name="settings"
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                />
              </Tabs>
            </StripeProvider>
          </CartContextProvider>
        </RestaurantsContextProvider>
      </LocationContextProvider>
    </FavoritesContextProvider>
  );
}
