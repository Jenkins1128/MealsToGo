import { Box } from "@/components/ui/box";
import React from "react";
import { SvgXml } from "react-native-svg";
import { Image } from "react-native";
import { Card } from "react-native-paper";

import star from "@assets/icons/Star";
import open from "@assets/icons/Open";
import { Text } from "@/components/typography/Text";
import { Favorite } from "@/components/favorites/Favorites";
import { Restaurant } from "@/services/types";

interface RestaurantInfoCardProps {
  restaurant: Restaurant;
}

export const RestaurantInfoCard = ({
  restaurant,
}: RestaurantInfoCardProps) => {
  const {
    name = "Some Restaurant",
    icon = "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
    photos = [
      "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
    ],
    address = "100 some random street",
    isOpenNow = true,
    rating = 4,
    isClosedTemporarily = true,
    placeId,
  } = restaurant;
  const ratingArray = Array.from(new Array(Math.floor(rating)));

  return (
    <Card elevation={2} className="w-[95%] self-center bg-bg-primary">
      <Box>
        <Favorite restaurant={restaurant} />
        <Card.Cover key={name} source={{ uri: photos[0] }} className="p-4 bg-bg-primary" />
      </Box>
      <Box className="p-4">
        <Text variant="label">{name}</Text>
        <Box className="flex-row items-center">
          <Box className="flex-row py-2">
            {ratingArray.map((_, i) => (
              <SvgXml
                key={`star-${placeId}-${i}`}
                xml={star}
                width={20}
                height={20}
              />
            ))}
          </Box>
          <Box className="flex-1 flex-row justify-end">
            {isClosedTemporarily && (
              <Text variant="error">CLOSED TEMPORARILY</Text>
            )}
            {isOpenNow && (
              <Box className="ml-4">
                <SvgXml xml={open} width={20} height={20} />
              </Box>
            )}
            <Image source={{ uri: icon }} className="w-[15px] h-[15px] ml-4" />
          </Box>
        </Box>
        <Text variant="caption">{address}</Text>
      </Box>
    </Card>
  );
};
