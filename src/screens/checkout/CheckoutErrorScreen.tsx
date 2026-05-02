import React from "react";

import { Text } from "@/components/typography/Text.component";
import { SafeArea } from "@/components/utility/SafeArea.component";
import { colors } from "@/infrastructure/theme/Colors";
import {
  CartIconContainer,
  CartIcon,
} from "@/features/checkout/components/Checkout.styles";

interface CheckoutErrorScreenProps {
  error: string;
}

export const CheckoutErrorScreen = ({ error = "" }: CheckoutErrorScreenProps) => {
  return (
    <SafeArea>
      <CartIconContainer>
        <CartIcon icon="close" bg={colors.ui.error} />
        <Text variant="label">{error}</Text>
      </CartIconContainer>
    </SafeArea>
  );
};
