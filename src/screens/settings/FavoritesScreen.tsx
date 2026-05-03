import React, { useContext } from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import { FavoritesContext } from "@/services/favorites/favoritesContext";
import { Text } from "@/components/typography/Text";
import { SafeArea } from "@/components/utility/SafeArea";
import { Spacer } from "@/components/spacer/Spacer";

import { RestaurantList } from "@/features/restaurants/components/RestaurantListStyles";
import { RestaurantInfoCard } from "@/features/restaurants/components/RestaurantInfoCard";

const NoFavoritesArea = styled(SafeArea)`
  align-items: center;
  justify-content: center;
`;

export const FavoritesScreen = () => {
  const router = useRouter();
  const { favorites } = useContext(FavoritesContext);

  return favorites.length ? (
    <SafeArea>
      <RestaurantList
        data={favorites}
        renderItem={({ item }: { item: any }) => {
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
              <Spacer position="bottom" size="large">
                <RestaurantInfoCard restaurant={item} />
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item: any) => item.name}
      />
    </SafeArea>
  ) : (
    <NoFavoritesArea>
      <Text>No favorites yet</Text>
    </NoFavoritesArea>
  );
};
