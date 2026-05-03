import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { useRouter } from "expo-router";

import { FadeInView } from "@/components/animations/FadeAnimation";
import { SafeArea } from "@/components/utility/SafeArea";
import { Spacer } from "@/components/spacer/Spacer";
import { Text } from "@/components/typography/Text";

import { LocationContext } from "@/services/location/locationContext";
import { RestaurantsContext } from "@/services/restaurants/restaurantsContext";
import { FavoritesContext } from "@/services/favorites/favoritesContext";
import { FavoritesBar } from "@/components/favorites/FavoritesBar";

import { Search } from "@/features/restaurants/components/Search";
import { RestaurantInfoCard } from "@/features/restaurants/components/RestaurantInfoCard";
import { RestaurantList } from "@/features/restaurants/components/RestaurantListStyles";

const Loading = styled(ActivityIndicator as any)`
  margin-left: -25px;
`;

const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

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
        <LoadingContainer>
          <Loading size={50} animating={true} color={MD2Colors.blue300} />
        </LoadingContainer>
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
        <Spacer position="left" size="large">
          <Text variant="error">Something went wrong retrieving the data.</Text>
        </Spacer>
      )}
      {!hasError && (
        <RestaurantList
          data={restaurants}
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
                  <FadeInView>
                    <RestaurantInfoCard restaurant={item} />
                  </FadeInView>
                </Spacer>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item: any) => item.name}
        />
      )}
    </SafeArea>
  );
};
