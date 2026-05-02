import React from "react";
import { useLocalSearchParams } from "expo-router";
import { RestaurantDetailScreen } from "@/screens/restaurants/RestaurantDetailScreen";
import { Restaurant } from "@/services/Types";

export default function RestaurantDetail() {
  const params = useLocalSearchParams<{ id: string; restaurant: string }>();
  const restaurant: Restaurant = JSON.parse(params.restaurant ?? "{}");

  return <RestaurantDetailScreen restaurant={restaurant} />;
}
