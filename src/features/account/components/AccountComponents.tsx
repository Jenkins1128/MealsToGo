import { Box } from "@/components/ui/box";
import React from "react";
import { ImageBackground, ViewProps } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Text } from "@/components/typography/Text";
import { colors } from "@/infrastructure/theme/colors";

export const AccountBackground = ({ children }: { children: React.ReactNode }) => (
  <ImageBackground
    source={require("@assets/images/HomeBg.jpg")}
    className="flex-1 items-center justify-center"
  >
    {children}
  </ImageBackground>
);

export const AccountCover = () => (
  <Box className="absolute w-full h-full bg-white/30" />
);

export const AccountContainer = ({ children }: { children: React.ReactNode }) => (
  <Box className="bg-white/70 p-6 mt-2">
    {children}
  </Box>
);

export const AuthButton = (props: React.ComponentProps<typeof Button>) => (
  <Button
    buttonColor={colors.brand.primary}
    className="p-2"
    {...props}
  />
);

export const AuthInput = (props: React.ComponentProps<typeof TextInput>) => (
  <TextInput className="w-[300px]" {...props} />
);

export const Title = ({ children }: { children: React.ReactNode }) => (
  <Text className="text-[30px] font-heading font-medium">{children}</Text>
);

export const ErrorContainer = ({ children }: { children: React.ReactNode }) => (
  <Box className="max-w-[300px] items-center self-center my-2">
    {children}
  </Box>
);

export const AnimationWrapper = ({ children }: { children: React.ReactNode }) => (
  <Box className="absolute w-full h-[40%] top-[30px] p-2">
    {children}
  </Box>
);
