import React, {
  useState,
  createContext,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { LocationContext } from "../location/Location.context";
import {
  restaurantsRequest,
  restaurantTransform,
} from "./Restaurants.service";
import { Restaurant } from "../Types";

interface RestaurantsContextValue {
  restaurants: Restaurant[];
  isLoading: boolean;
  error: string | null;
}

export const RestaurantsContext = createContext<RestaurantsContextValue>(
  {} as RestaurantsContextValue
);

interface Props {
  children: ReactNode;
}

export const RestaurantsContextProvider = ({ children }: Props) => {
  const { location } = useContext(LocationContext);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (location) {
      const locationString = `${location.lat},${location.lng}`;
      retrieveRestaurants(locationString);
    }
  }, [location]);

  const retrieveRestaurants = async (loc: string) => {
    setIsLoading(true);
    setRestaurants([]);
    try {
      const res = await restaurantsRequest(loc);
      const results = restaurantTransform(res);
      setError(null);
      setIsLoading(false);
      setRestaurants(results);
    } catch (e: any) {
      setIsLoading(false);
      setError(e.toString());
    }
  };

  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        isLoading,
        error,
      }}
    >
      {children}
    </RestaurantsContext.Provider>
  );
};
