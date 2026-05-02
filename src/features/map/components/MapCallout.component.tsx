import React from "react";
import { CompactRestaurantInfo } from "@/components/restaurant/CompactRestaurantInfo.component";
import { Restaurant } from "@/services/Types";

interface MapCalloutProps {
  restaurant: Restaurant;
}

export const MapCallout = ({ restaurant }: MapCalloutProps) => (
  <CompactRestaurantInfo isMap restaurant={restaurant} />
);
