import React, {useContext} from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {FavoritesContext} from '../../services/favorites/favorites.context';

const FavoriteButton = styled(TouchableOpacity)`
  position: absolute;
  top: 25px;
  right: 25px;
  z-index: 9;
`;

export const Favorite = ({restaurant}) => {
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
      <AntDesign
        name={isFavorite ? 'heart' : 'hearto'}
        size={24}
        color={isFavorite ? 'red' : 'white'}
      />
    </FavoriteButton>
  );
};
