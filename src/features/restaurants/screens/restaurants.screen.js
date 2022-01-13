import React, {useContext, useState} from 'react';
import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
import {ActivityIndicator, Colors} from 'react-native-paper';

import {FadeInView} from '../../../components/animations/fade.animation';
import {SafeArea} from '../../../components/utility/safe-area.component';
import {Spacer} from '../../../components/spacer/spacer.component';

import {RestaurantsContext} from '../../../services/restaurants/restaurants.context';
import {FavoritesContext} from '../../../services/favorites/favorites.context';
import {FavoritesBar} from '../../../components/favorites/favorites-bar.component';

import {Search} from '../components/search.component';
import {RestaurantInfoCard} from '../components/restaurant-info-card.component';
import {RestaurantList} from '../components/restaurant-list.styles';

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const RestaurantsScreen = ({navigation}) => {
  const {isLoading, restaurants} = useContext(RestaurantsContext);
  const {favorites} = useContext(FavoritesContext);
  const [isToggled, setIsToggled] = useState(false);

  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.blue300} />
        </LoadingContainer>
      )}
      <Search
        isFavoritesToggled={isToggled}
        onFavoritesToggle={() => setIsToggled(!isToggled)}
      />
      {isToggled && (
        <FavoritesBar favorites={favorites} onNavigate={navigation.navigate} />
      )}
      <RestaurantList
        data={restaurants}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('RestaurantDetail', {
                  restaurant: item,
                })
              }>
              <Spacer position="bottom" size="large">
                <FadeInView>
                  <RestaurantInfoCard restaurant={item} />
                </FadeInView>
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item.name}
      />
    </SafeArea>
  );
};
