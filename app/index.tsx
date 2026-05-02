import React, { useContext } from "react";
import { Redirect } from "expo-router";
import { AuthenticationContext } from "@/services/authentication/Authentication.context";

export default function AppIndex() {
  const { isAuthenticated } = useContext(AuthenticationContext);

  if (isAuthenticated) {
    return <Redirect href="/(tabs)/restaurants" />;
  }

  return <Redirect href="/(auth)" />;
}
