import { Box } from "@/components/ui/box";
import React from "react";
import { Avatar } from "react-native-paper";
import { Text } from "@/components/typography/Text";
import { SafeArea } from "@/components/utility/SafeArea";
import { colors } from "@/infrastructure/theme/colors";

interface CheckoutErrorScreenProps {
  error: string;
}

export const CheckoutErrorScreen = ({ error = "" }: CheckoutErrorScreenProps) => {
  return (
    <SafeArea>
      <Box className="items-center justify-center flex-1">
        <Avatar.Icon size={128} icon="close" style={{ backgroundColor: colors.ui.error }} />
        <Text variant="label">{error}</Text>
      </Box>
    </SafeArea>
  );
};
