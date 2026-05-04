import { Box } from "@/components/ui/box";
import React, { useContext } from "react";
import { TouchableOpacity, FlatList } from "react-native";
import { useRouter } from "expo-router";

import { FavoritesContext } from "@/services/favorites/favoritesContext";
import { Restaurant } from "@/services/types";
import { Text } from "@/components/typography/Text";
import { SafeArea } from "@/components/utility/SafeArea";
import { RestaurantInfoCard } from "@/features/restaurants/components/RestaurantInfoCard";

export const FavoritesScreen = () => {
  const router = useRouter();
  const { favorites } = useContext(FavoritesContext);

  return favorites.length ? (
    <SafeArea>
      <FlatList
        data={favorites}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }: { item: Restaurant }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/restaurants/[id]",
                  params: {
                    id: item.placeId,
                    restaurant: JSON.stringify(item),
                  },
                })
              }
            >
              <Box className="mb-4">
                <RestaurantInfoCard restaurant={item} />
              </Box>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item: Restaurant) => item.name}
      />
    </SafeArea>
  ) : (
    <SafeArea className="items-center justify-center">
      <Text>No favorites yet</Text>
    </SafeArea>
  );
};
