import React, { useState, useEffect, createContext, ReactNode } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  FirebaseAuthTypes,
} from "@react-native-firebase/auth";
import { loginRequest, registerRequest } from './authenticationService';

const auth = getAuth();

interface AuthenticationContextValue {
  isAuthenticated: boolean;
  user: FirebaseAuthTypes.User | null;
  isLoading: boolean;
  error: string | null;
  onLogin: (email: string, password: string) => Promise<void>;
  onRegister: (
    email: string,
    password: string,
    repeatedPassword: string
  ) => Promise<void>;
  onLogout: () => Promise<void>;
}

export const AuthenticationContext = createContext<AuthenticationContextValue>(
  {} as AuthenticationContextValue
);

interface Props {
  children: ReactNode;
}

export const AuthenticationContextProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, onAuthStateChangedListener);
    return subscriber; // unsubscribe on unmount
  }, []);

  const onAuthStateChangedListener = (usr: FirebaseAuthTypes.User | null) => {
    if (usr) {
      setUser(usr);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  const onLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await loginRequest(email, password);
      setIsLoading(false);
    } catch (e: any) {
      setIsLoading(false);
      setError(e.toString());
    }
  };

  const onLogout = async () => {
    setUser(null);
    try {
      await signOut(auth);
    } catch (e) {}
  };

  const onRegister = async (
    email: string,
    password: string,
    repeatedPassword: string
  ) => {
    setIsLoading(true);
    if (password !== repeatedPassword) {
      setError("Error: Passwords do no match");
      setIsLoading(false);
      return;
    }
    try {
      await registerRequest(email, password);
      setIsLoading(false);
    } catch (e: any) {
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
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
