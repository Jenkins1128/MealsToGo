import { Box } from "@/components/ui/box";
import React from "react";
import { ScrollView, TouchableOpacity} from "react-native";
import { Card } from "react-native-paper";
import { CompactRestaurantInfo } from "@/components/restaurant/CompactRestaurantInfo";
import { Text } from "@/components/typography/Text";
import { Restaurant } from "@/services/types";

interface FavoritesBarProps {
  favorites: Restaurant[];
  onNavigate: (name: string, params: { restaurant: Restaurant }) => void;
}

export const FavoritesBar = ({ favorites, onNavigate }: FavoritesBarProps) => {
  if (!favorites.length) {
    return null;
  }

  return (
    <Card elevation={3} className="p-[10px] z-50 rounded-[15px]">
      <Box className="ml-4">
        <Text variant="caption">Favorites</Text>
      </Box>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {favorites.map((restaurant) => {
          const key = restaurant.name;
          return (
            <Box key={key} className="ml-2">
              <TouchableOpacity
                onPress={() =>
                  onNavigate("RestaurantDetail", {
                    restaurant,
                  })
                }
              >
                <CompactRestaurantInfo restaurant={restaurant} />
              </TouchableOpacity>
            </Box>
          );
        })}
      </ScrollView>
    </Card>
  );
};
