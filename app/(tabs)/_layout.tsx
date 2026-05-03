import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StripeProvider } from "@stripe/stripe-react-native";
import Constants from "expo-constants";

import { FavoritesContextProvider } from "@/services/favorites/favoritesContext";
import { LocationContextProvider } from "@/services/location/locationContext";
import { RestaurantsContextProvider } from "@/services/restaurants/restaurantsContext";
import { CartContextProvider } from "@/services/cart/cartContext";
import { colors } from "@/infrastructure/theme/colors";

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
