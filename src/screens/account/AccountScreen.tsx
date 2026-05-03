import { Box } from "@/components/ui/box";
import React from "react";
import LottieView from "lottie-react-native";
import { useRouter } from "expo-router";

import {
  AccountBackground,
  AccountContainer,
  AccountCover,
  AuthButton,
  AnimationWrapper,
  Title,
} from "@/features/account/components/AccountComponents";

export const AccountScreen = () => {
  const router = useRouter();

  return (
    <AccountBackground>
      <AccountCover />
      <AnimationWrapper>
        <LottieView
          key="animation"
          autoPlay
          loop
          resizeMode="cover"
          source={require("@assets/animations/Watermelon.json")}
          style={{ width: "100%", height: "100%" }}
        />
      </AnimationWrapper>
      <Title>Meals To Go</Title>
      <AccountContainer>
        <AuthButton
          icon="lock-open-outline"
          mode="contained"
          onPress={() => router.push("/(auth)/Login")}
        >
          Login
        </AuthButton>
        <Box className="mt-4">
          <AuthButton
            icon="email"
            mode="contained"
            onPress={() => router.push("/(auth)/Register")}
          >
            Register
          </AuthButton>
        </Box>
      </AccountContainer>
    </AccountBackground>
  );
};
