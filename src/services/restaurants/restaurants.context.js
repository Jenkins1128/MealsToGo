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

  const retrieveRestaurants = async loc => {
    setIsLoading(true);
    setRestaurants([]);
    try {
      const res = await restaurantsRequest(loc);
      const results = restaurantTransform(res);
      setError(null);
      setIsLoading(false);
      setRestaurants(results);
    } catch (e) {
      setIsLoading(false);
      setError(e);
    }
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
