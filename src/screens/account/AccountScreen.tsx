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
} from "@/features/account/components/Account.styles";
import { Spacer } from "@/components/spacer/Spacer.component";

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
        <Spacer size="large">
          <AuthButton
            icon="email"
            mode="contained"
            onPress={() => router.push("/(auth)/Register")}
          >
            Register
          </AuthButton>
        </Spacer>
      </AccountContainer>
    </AccountBackground>
  );
};
