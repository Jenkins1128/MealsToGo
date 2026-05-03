import React from "react";
import { CompactRestaurantInfo } from "@/components/restaurant/CompactRestaurantInfo";
import { Restaurant } from "@/services/types";

interface MapCalloutProps {
  restaurant: Restaurant;
}

export const MapCallout = ({ restaurant }: MapCalloutProps) => (
  <CompactRestaurantInfo isMap restaurant={restaurant} />
);
