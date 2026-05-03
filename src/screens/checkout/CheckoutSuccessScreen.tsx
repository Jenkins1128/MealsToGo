import React from "react";

import { Text } from "@/components/typography/Text";
import { SafeArea } from "@/components/utility/SafeArea";
import {
  CartIconContainer,
  CartIcon,
} from "@/features/checkout/components/CheckoutStyles";

export const CheckoutSuccessScreen = () => (
  <SafeArea>
    <CartIconContainer>
      <CartIcon icon="check-bold" />
      <Text variant="label">Success!</Text>
    </CartIconContainer>
  </SafeArea>
);
