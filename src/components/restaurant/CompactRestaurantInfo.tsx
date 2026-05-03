import { Box } from "@/components/ui/box";
import React from "react";
import WebView from "react-native-webview";
import { Text } from "@/components/typography/Text";
import { Platform, Image as NativeImage } from "react-native";
import { Restaurant } from "@/services/types";

const isAndroid = Platform.OS === "android";

interface CompactRestaurantInfoProps {
  restaurant: Restaurant;
  isMap?: boolean;
}

export const CompactRestaurantInfo = ({
  restaurant,
  isMap,
}: CompactRestaurantInfoProps) => {
  const isWebView = isAndroid && isMap;

  return (
    <Box className="p-[10px] max-w-[120px] items-center">
      {isWebView ? (
        <WebView 
          source={{ uri: restaurant.photos[0] }} 
          className="rounded-[10px] w-[120px] h-[100px]" 
        />
      ) : (
        <NativeImage 
          source={{ uri: restaurant.photos[0] }} 
          className="rounded-[10px] w-[120px] h-[100px]" 
        />
      )}
      <Text variant="caption" numberOfLines={3}>
        {restaurant.name}
      </Text>
    </Box>
  );
};
