import React from "react";
import { useLocalSearchParams } from "expo-router";
import { CheckoutErrorScreen } from "@/screens/checkout/CheckoutErrorScreen";

export default function CheckoutError() {
  const { error = "" } = useLocalSearchParams<{ error: string }>();
  return <CheckoutErrorScreen error={error} />;
}
