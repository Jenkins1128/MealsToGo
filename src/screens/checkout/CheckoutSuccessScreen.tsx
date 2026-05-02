import React from "react";

import { Text } from "@/components/typography/Text.component";
import { SafeArea } from "@/components/utility/SafeArea.component";
import {
  CartIconContainer,
  CartIcon,
} from "@/features/checkout/components/Checkout.styles";

export const CheckoutSuccessScreen = () => (
  <SafeArea>
    <CartIconContainer>
      <CartIcon icon="check-bold" />
      <Text variant="label">Success!</Text>
    </CartIconContainer>
  </SafeArea>
);
