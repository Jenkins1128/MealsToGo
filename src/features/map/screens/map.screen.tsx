import React, {useContext, useState, useEffect} from 'react';
import MapView, {Marker, Callout, Region} from 'react-native-maps';
import styled from 'styled-components/native';
import {LocationContext} from '../../../services/location/location.context';
import {RestaurantsContext} from '../../../services/restaurants/restaurants.context';
import {Search} from '../components/search.component';
import {MapCallout} from '../components/map-callout.component';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {AppTabParamList} from '../../../infrastructure/navigation/app.navigator';

const Map = styled(MapView as any)`
  height: 100%;
  width: 100%;
`;

interface RestaurantMapProps {
  navigation: any;
}

const RestaurantMap = ({navigation}: RestaurantMapProps) => {
  const {location} = useContext(LocationContext);
  const {restaurants = []} = useContext(RestaurantsContext);
  const [latDelta, setLatDelta] = useState(0);

  if (!location) {
    return null;
  }

  const {viewport, lat, lng} = location;

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;
    setLatDelta(northeastLat - southwestLat);
  }, [location, viewport]);

  return (
    <>
      <Search />
      <Map
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.01,
        }}>
        {restaurants.map(restaurant => {
          return (
            <Marker
              key={restaurant.name}
              title={restaurant.name}
              coordinate={{
                latitude: restaurant.geometry.location.lat,
                longitude: restaurant.geometry.location.lng,
              }}>
              <Callout
                onPress={() =>
                  navigation.navigate('RestaurantDetail', {
                    restaurant,
                  })
                }>
                <MapCallout restaurant={restaurant} />
              </Callout>
            </Marker>
          );
        })}
      </Map>
    </>
  );
};

type Props = BottomTabScreenProps<AppTabParamList, 'Map'>;

export const MapScreen = ({navigation}: Props) => {
  const {location} = useContext(LocationContext);
  if (!location) {
    return (
      <Map
        region={{
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0,
          longitudeDelta: 0,
        }}
      />
    );
  }
  return <RestaurantMap navigation={navigation} />;
};
