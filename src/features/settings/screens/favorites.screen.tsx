import React, {useContext} from 'react';
import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {FavoritesContext} from '../../../services/favorites/favorites.context';
import {Text} from '../../../components/typography/text.component';
import {SafeArea} from '../../../components/utility/safe-area.component';
import {Spacer} from '../../../components/spacer/spacer.component';

import {RestaurantList} from '../../restaurants/components/restaurant-list.styles';
import {RestaurantInfoCard} from '../../restaurants/components/restaurant-info-card.component';
import {SettingsStackParamList} from '../../../infrastructure/navigation/settings.navigator';

const NoFavoritesArea = styled(SafeArea)`
  align-items: center;
  justify-content: center;
`;

type Props = StackScreenProps<SettingsStackParamList, 'Favorites'>;

export const FavoritesScreen = ({navigation}: Props) => {
  const {favorites} = useContext(FavoritesContext);

  return favorites.length ? (
    <SafeArea>
      <RestaurantList
        data={favorites}
        renderItem={({item}: {item: any}) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('RestaurantDetail' as any, {
                  restaurant: item,
                })
              }>
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
