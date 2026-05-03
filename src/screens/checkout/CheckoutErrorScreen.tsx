import React from "react";

import { Text } from "@/components/typography/Text";
import { SafeArea } from "@/components/utility/SafeArea";
import { colors } from "@/infrastructure/theme/colors";
import {
  CartIconContainer,
  CartIcon,
} from "@/features/checkout/components/CheckoutStyles";

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
