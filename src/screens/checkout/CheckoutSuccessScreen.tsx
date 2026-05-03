import { Box } from "@/components/ui/box";
import React from "react";
import { Avatar } from "react-native-paper";
import { Text } from "@/components/typography/Text";
import { SafeArea } from "@/components/utility/SafeArea";
import { colors } from "@/infrastructure/theme/colors";

export const CheckoutSuccessScreen = () => (
  <SafeArea>
    <Box className="items-center justify-center flex-1">
      <Avatar.Icon size={128} icon="check-bold" className="bg-brand-primary" />
      <Text variant="label">Success!</Text>
    </Box>
  </SafeArea>
);
