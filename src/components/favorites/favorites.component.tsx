import React, {useContext} from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
const Icon = AntDesign as any;
import {FavoritesContext} from '../../services/favorites/favorites.context';
import {Restaurant} from '../../services/types';

const FavoriteButton = styled(TouchableOpacity as any)`
  position: absolute;
  top: 25px;
  right: 25px;
  z-index: 9;
`;

interface FavoriteProps {
  restaurant: Restaurant;
}

export const Favorite = ({restaurant}: FavoriteProps) => {
  const {favorites, addToFavorites, removeFromFavorites} =
    useContext(FavoritesContext);
  const isFavorite = favorites.find(r => r.placeId === restaurant.placeId);

  return (
    <FavoriteButton
      onPress={() =>
        isFavorite
          ? removeFromFavorites(restaurant)
          : addToFavorites(restaurant)
      }>
      <Icon
        name={isFavorite ? 'heart' : 'hearto'}
        size={24}
        color={isFavorite ? 'red' : 'white'}
      />
    </FavoriteButton>
  );
};
