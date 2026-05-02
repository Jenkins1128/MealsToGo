import React from "react";
import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="index" options={{ title: "Settings", headerShown: false }} />
      <Stack.Screen name="Favorites" options={{ title: "Favorites" }} />
    </Stack>
  );
}
