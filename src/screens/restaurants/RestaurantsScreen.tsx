import { Box } from "@/components/ui/box";
import React, { useContext, useState } from "react";
import { TouchableOpacity, FlatList } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { useRouter } from "expo-router";

import { FadeInView } from "@/components/animations/FadeAnimation";
import { SafeArea } from "@/components/utility/SafeArea";
import { Text } from "@/components/typography/Text";

import { LocationContext } from "@/services/location/locationContext";
import { RestaurantsContext } from "@/services/restaurants/restaurantsContext";
import { FavoritesContext } from "@/services/favorites/favoritesContext";
import { FavoritesBar } from "@/components/favorites/FavoritesBar";

import { Search } from "@/features/restaurants/components/Search";
import { RestaurantInfoCard } from "@/features/restaurants/components/RestaurantInfoCard";

export const RestaurantsScreen = () => {
  const router = useRouter();
  const { error: locationError } = useContext(LocationContext);
  const { isLoading, restaurants, error } = useContext(RestaurantsContext);
  const { favorites } = useContext(FavoritesContext);
  const [isToggled, setIsToggled] = useState(false);
  const hasError = !!error || !!locationError;

  return (
    <SafeArea>
      {isLoading && (
        <Box className="absolute top-1/2 left-1/2">
          <ActivityIndicator className="-ml-[25px]" size={50} animating={true} color={MD2Colors.blue300} />
        </Box>
      )}
      <Search
        isFavoritesToggled={isToggled}
        onFavoritesToggle={() => setIsToggled(!isToggled)}
      />
      {isToggled && (
        <FavoritesBar
          favorites={favorites}
          onNavigate={(_name: string, params: any) =>
            router.push({
              pathname: "/(tabs)/restaurants/[id]",
              params: {
                id: params.restaurant.placeId,
                restaurant: JSON.stringify(params.restaurant),
              },
            })
          }
        />
      )}
      {hasError && (
        <Box className="ml-4">
          <Text variant="error">Something went wrong retrieving the data.</Text>
        </Box>
      )}
      {!hasError && (
        <FlatList
          data={restaurants}
          contentContainerStyle={{ padding: 16 }}
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
                <Box className="mb-4">
                  <FadeInView>
                    <RestaurantInfoCard restaurant={item} />
                  </FadeInView>
                </Box>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item: any) => item.name}
        />
      )}
    </SafeArea>
  );
};
