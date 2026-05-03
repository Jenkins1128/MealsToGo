import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FavoritesContext } from "@/services/favorites/favoritesContext";
import { Restaurant } from "@/services/types";

interface FavoriteProps {
  restaurant: Restaurant;
}

export const Favorite = ({ restaurant }: FavoriteProps) => {
  const { favorites, addToFavorites, removeFromFavorites } =
    useContext(FavoritesContext);
  const isFavorite = favorites.find((r) => r.placeId === restaurant.placeId);

  return (
    <TouchableOpacity
      className="absolute top-[25px] right-[25px] z-[9]"
      onPress={() =>
        isFavorite
          ? removeFromFavorites(restaurant)
          : addToFavorites(restaurant)
      }
    >
      <Ionicons
        name={isFavorite ? "heart" : "heart-outline"}
        size={24}
        color={isFavorite ? "red" : "white"}
      />
    </TouchableOpacity>
  );
};
