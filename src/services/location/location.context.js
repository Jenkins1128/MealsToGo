import React, {createContext, useState, useEffect} from 'react';

import {locationRequest, locationTransorm} from './location.service';

export const LocationContext = createContext();

export const LocationContextProvider = ({children}) => {
  const [keyword, setKeyword] = useState('san francisco');
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSearch = searchKeyword => {
    setIsLoading(true);
    setKeyword(searchKeyword);
    locationRequest(keyword.toLowerCase())
      .then(locationTransorm)
      .then(result => {
        setIsLoading(false);
        setLocation(result);
      })
      .catch(err => {
        setIsLoading(false);
        setError(err);
      });
  };

  useEffect(() => {
    onSearch(keyword);
  }, []);

  return (
    <LocationContext.Provider
      value={{
        isLoading,
        error,
        location,
        search: () => onSearch,
        keyword,
      }}>
      {children}
    </LocationContext.Provider>
  );
};
