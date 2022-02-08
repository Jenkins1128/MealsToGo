import React, {useState, useEffect, createContext} from 'react';
import auth from '@react-native-firebase/auth';
import {loginRequest, registerRequest} from './authentication.service';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const onAuthStateChanged = usr => {
    if (usr) {
      setUser(usr);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  const onLogin = async (email, password) => {
    setIsLoading(true);
    // loginRequest(email, password)
    //   .then(() => {
    //     console.log('logged in');
    //   })
    //   .catch(e => {
    //     setIsLoading(false);
    //     setError(e.toString());
    //   });

    try {
      await loginRequest(email, password);
    } catch (e) {
      setIsLoading(false);
      setError(e.toString());
    }
  };

  const onLogout = async () => {
    setUser(null);
    // auth()
    //   .signOut()
    //   .then(() => console.log('User signed out!'))
    //   .catch(e => {
    //     console.log(e);
    //   });
    try {
      await auth().signOut();
    } catch (e) {}
  };

  const onRegister = async (email, password, repeatedPassword) => {
    setIsLoading(true);
    if (password !== repeatedPassword) {
      setError('Error: Passwords do no match');
      setIsLoading(false);
      return;
    }
    // registerRequest(email, password)
    //   .then(() => {
    //     console.log('registered');
    //   })
    //   .catch(e => {
    //     setIsLoading(false);
    //     setError(e.toString());
    //   });
    try {
      await registerRequest(email, password);
    } catch (e) {
      setIsLoading(false);
      setError(e.toString());
    }
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
      }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
