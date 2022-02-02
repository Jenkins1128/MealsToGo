import React, {useState, createContext, useEffect, useContext} from 'react';
import {LocationContext} from '../location/location.context';

import {restaurantsRequest, restaurantTransform} from './restaurants.service';

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = ({children}) => {
  const {location} = useContext(LocationContext);
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location) {
      const locationString = `${location.lat},${location.lng}`;
      retrieveRestaurants(locationString);
    }
  }, [location]);

  const retrieveRestaurants = loc => {
    setIsLoading(true);
    setRestaurants([]);

    restaurantsRequest(loc)
      .then(restaurantTransform)
      .then(results => {
        setError(null);
        setIsLoading(false);
        setRestaurants(results);
      })
      .catch(err => {
        setIsLoading(false);
        setError(err);
      });
  };

  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        isLoading,
        error,
      }}>
      {children}
    </RestaurantsContext.Provider>
  );
};
