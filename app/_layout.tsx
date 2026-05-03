import React from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components/native";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

import { theme } from "@/infrastructure/theme";
import { AuthenticationContext, AuthenticationContextProvider } from "@/services/authentication/Authentication.context";
import { SafeAreaProvider } from "react-native-safe-area-context";

const ThemeProvider = StyledThemeProvider as any;

SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const { isAuthenticated, isLoading } = React.useContext(AuthenticationContext);
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = (segments as any)[0] === "(auth)" || (segments as any).length === 0 || (segments as any)[0] === "index";

    if (!isAuthenticated && !inAuthGroup) {
      router.replace("/");
    } else if (isAuthenticated && inAuthGroup) {
      router.replace("/(tabs)/restaurants");
    }
  }, [isAuthenticated, segments, isLoading]);

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Oswald-Regular": require("../assets/fonts/Oswald-Regular.ttf"),
    "Lato-Regular": require("../assets/fonts/Lato-Regular.ttf"),
  });

  React.useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme as any}>
        <AuthenticationContextProvider>
          <InitialLayout />
          <StatusBar style="auto" />
        </AuthenticationContextProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
