import React, {createContext, useState, useEffect, ReactNode} from 'react';
import {locationRequest, locationTransform} from './location.service';
import {Location} from '../types';

interface LocationContextValue {
  isLoading: boolean;
  error: string | null;
  location: Location | null;
  search: (searchKeyword: string) => void;
  keyword: string;
}

export const LocationContext = createContext<LocationContextValue>(
  {} as LocationContextValue,
);

interface Props {
  children: ReactNode;
}

export const LocationContextProvider = ({children}: Props) => {
  const [keyword, setKeyword] = useState('San Francisco');
  const [location, setLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!keyword.length) {
      return;
    }
    const requestLocation = async () => {
      try {
        setIsLoading(true);
        const res = await locationRequest(keyword.toLowerCase().trim());
        const result = locationTransform(res);
        setError(null);
        setIsLoading(false);
        setLocation(result);
      } catch (e: any) {
        setIsLoading(false);
        setError(e.toString());
      }
    };
    requestLocation();
  }, [keyword]);

  const onSearch = (searchKeyword: string) => {
    setIsLoading(true);
    setKeyword(searchKeyword);
  };

  return (
    <LocationContext.Provider
      value={{
        isLoading,
        error,
        location,
        search: onSearch,
        keyword,
      }}>
      {children}
    </LocationContext.Provider>
  );
};
