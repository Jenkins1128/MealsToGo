import React, {useState, useEffect, createContext, ReactNode} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {loginRequest, registerRequest} from './authentication.service';

interface AuthenticationContextValue {
  isAuthenticated: boolean;
  user: FirebaseAuthTypes.User | null;
  isLoading: boolean;
  error: string | null;
  onLogin: (email: string, password: string) => Promise<void>;
  onRegister: (
    email: string,
    password: string,
    repeatedPassword: string,
  ) => Promise<void>;
  onLogout: () => Promise<void>;
}

export const AuthenticationContext = createContext<AuthenticationContextValue>(
  {} as AuthenticationContextValue,
);

interface Props {
  children: ReactNode;
}

export const AuthenticationContextProvider = ({children}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const onAuthStateChanged = (usr: FirebaseAuthTypes.User | null) => {
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
    } catch (e: any) {
      setIsLoading(false);
      setError(e.toString());
    }
  };

  const onLogout = async () => {
    setUser(null);
    try {
      await auth().signOut();
    } catch (e) {}
  };

  const onRegister = async (
    email: string,
    password: string,
    repeatedPassword: string,
  ) => {
    setIsLoading(true);
    if (password !== repeatedPassword) {
      setError('Error: Passwords do no match');
      setIsLoading(false);
      return;
    }
    try {
      console.log('Attempting registration with email:', email);
      console.log('Firebase app name:', auth().app.name);
      console.log('Firebase app options:', JSON.stringify(auth().app.options));
      await registerRequest(email, password);
    } catch (e: any) {
      console.error('=== FIREBASE AUTH ERROR ===');
      console.error('Error code:', e.code);
      console.error('Error message:', e.message);
      console.error('Native error code:', e.nativeErrorCode);
      console.error('Full error:', JSON.stringify(e, null, 2));
      console.error('=== END ERROR ===');
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
