import React, { useContext, useState, useEffect } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { useRouter } from "expo-router";
import { LocationContext } from "@/services/location/locationContext";
import { RestaurantsContext } from "@/services/restaurants/restaurantsContext";
import { Search } from "@/features/map/components/Search";
import { MapCallout } from "@/features/map/components/MapCallout";

const RestaurantMap = () => {
  const router = useRouter();
  const { location } = useContext(LocationContext);
  const { restaurants = [] } = useContext(RestaurantsContext);
  const [latDelta, setLatDelta] = useState(0);

  if (!location) {
    return null;
  }

  const { viewport, lat, lng } = location;

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;
    setLatDelta(northeastLat - southwestLat);
  }, [location, viewport]);

  return (
    <>
      <Search />
      <MapView
        className="h-full w-full"
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.01,
        }}
      >
        {restaurants.map((restaurant) => {
          return (
            <Marker
              key={restaurant.name}
              title={restaurant.name}
              coordinate={{
                latitude: restaurant.geometry.location.lat,
                longitude: restaurant.geometry.location.lng,
              }}
            >
              <Callout
                onPress={() =>
                  router.push({
                    pathname: "/(tabs)/restaurants/[id]",
                    params: {
                      id: restaurant.placeId,
                      restaurant: JSON.stringify(restaurant),
                    },
                  })
                }
              >
                <MapCallout restaurant={restaurant} />
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </>
  );
};

export const MapScreen = () => {
  const { location } = useContext(LocationContext);
  if (!location) {
    return (
      <MapView
        className="h-full w-full"
        region={{
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0,
          longitudeDelta: 0,
        }}
      />
    );
  }
  return <RestaurantMap />;
};
