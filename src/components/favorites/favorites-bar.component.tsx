import React from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-paper';
import styled from 'styled-components/native';
import {Spacer} from '../spacer/spacer.component';
import {CompactRestaurantInfo} from '../restaurant/compact-restaurant-info.component';
import {Text} from '../typography/text.component';
import {Restaurant} from '../../services/types';

const FavoritesWrapper = styled(Card as any)`
  padding: 10px;
  z-index: 999;
  border-radius: 15px;
`;

interface FavoritesBarProps {
  favorites: Restaurant[];
  onNavigate: (name: string, params: any) => void;
}

export const FavoritesBar = ({favorites, onNavigate}: FavoritesBarProps) => {
  if (!favorites.length) {
    return null;
  }

  return (
    <FavoritesWrapper elevation={3}>
      <Spacer position="left" size="large">
        <Text variant="caption">Favorites</Text>
      </Spacer>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {favorites.map(restaurant => {
          const key = restaurant.name;
          return (
            <Spacer key={key} position="left" size="medium">
              <TouchableOpacity
                onPress={() =>
                  onNavigate('RestaurantDetail', {
                    restaurant,
                  })
                }>
                <CompactRestaurantInfo restaurant={restaurant} />
              </TouchableOpacity>
            </Spacer>
          );
        })}
      </ScrollView>
    </FavoritesWrapper>
  );
};
