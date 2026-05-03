import React from "react";
import styled from "styled-components/native";
import WebView from "react-native-webview";
import { Text } from "@/components/typography/Text";
import { Platform } from "react-native";
import { Restaurant } from "@/services/types";

const CompactImage = styled.Image`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const CompactWebview = styled(WebView as any)`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const Item = styled.View`
  padding: 10px;
  max-width: 120px;
  align-items: center;
`;

const isAndroid = Platform.OS === "android";

interface CompactRestaurantInfoProps {
  restaurant: Restaurant;
  isMap?: boolean;
}

export const CompactRestaurantInfo = ({
  restaurant,
  isMap,
}: CompactRestaurantInfoProps) => {
  const Image: any = isAndroid && isMap ? CompactWebview : CompactImage;

  return (
    <Item>
      <Image source={{ uri: restaurant.photos[0] }} />
      <Text variant="caption" numberOfLines={3}>
        {restaurant.name}
      </Text>
    </Item>
  );
};
