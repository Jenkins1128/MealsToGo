import React, {createContext, useState, useEffect} from 'react';

import {locationRequest, locationTransform} from './location.service';

export const LocationContext = createContext();

export const LocationContextProvider = ({children}) => {
  const [keyword, setKeyword] = useState('San Francisco');
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!keyword.length) {
      return;
    }
    const requestLocation = async () => {
      try {
        const res = await locationRequest(keyword.toLowerCase().trim());
        const result = locationTransform(res);
        setError(null);
        setIsLoading(false);
        setLocation(result);
      } catch (e) {
        setIsLoading(false);
        setError(e);
      }
    };
    requestLocation();
  }, [keyword]);

  const onSearch = searchKeyword => {
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
