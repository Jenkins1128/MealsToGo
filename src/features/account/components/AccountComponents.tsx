import { Box } from "@/components/ui/box";
import React from "react";
import {
  ImageBackground,
  View,
  TextInput as RNTextInput,
  TextInputProps,
  Text as RNText,
  StyleSheet,
} from "react-native";
import { Button } from "react-native-paper";
import { Text } from "@/components/typography/Text";
import { colors } from "@/infrastructure/theme/colors";

export const AccountBackground = ({ children }: { children: React.ReactNode }) => (
  <ImageBackground
    source={require("@assets/images/HomeBg.jpg")}
    resizeMode="cover"
    style={StyleSheet.absoluteFillObject}
    className="items-center justify-center"
  >
    {children}
  </ImageBackground>
);

export const AccountContainer = ({ children }: { children: React.ReactNode }) => (
  <View className="w-[300px] bg-white/80 rounded-2xl p-6 mt-4 shadow-lg">
    {children}
  </View>
);

export const AuthButton = (props: React.ComponentProps<typeof Button>) => (
  <Button
    buttonColor={colors.brand.primary}
    textColor="#FFFFFF"
    className="p-1 rounded-xl"
    {...props}
  />
);

interface AuthInputProps extends TextInputProps {
  label?: string;
}

export const AuthInput = ({ label, ...props }: AuthInputProps) => (
  <View className="w-full mb-1">
    {label && (
      <RNText className="text-xs font-medium mb-1" style={{ color: colors.ui.secondary }}>
        {label}
      </RNText>
    )}
    <RNTextInput
      className="w-full border-b border-ui-disabled py-2 text-base"
      style={{
        backgroundColor: "transparent",
        color: colors.ui.primary,
        fontSize: 16,
      }}
      placeholderTextColor={colors.ui.secondary}
      {...props}
    />
  </View>
);

export const Title = ({ children }: { children: React.ReactNode }) => (
  <Text className="text-[30px] font-heading font-medium text-ui-primary">{children}</Text>
);

export const ErrorContainer = ({ children }: { children: React.ReactNode }) => (
  <Box className="max-w-[300px] items-center self-center my-2">
    {children}
  </Box>
);

export const AnimationWrapper = ({ children }: { children: React.ReactNode }) => (
  <View className="absolute w-full h-[40%] top-[30px] p-2">
    {children}
  </View>
);
