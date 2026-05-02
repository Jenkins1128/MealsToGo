import React from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

import { theme } from "@/infrastructure/theme";
import { AuthenticationContextProvider } from "@/services/authentication/Authentication.context";

import { SafeAreaProvider } from "react-native-safe-area-context";

const ThemeProvider = StyledThemeProvider as any;

SplashScreen.preventAutoHideAsync();

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
          <Stack screenOptions={{ headerShown: false }} />
          <StatusBar style="auto" />
        </AuthenticationContextProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
