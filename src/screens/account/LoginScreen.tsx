import { Box } from "@/components/ui/box";
import React, { useContext, useState } from "react";
import { useRouter } from "expo-router";
import {
  AccountBackground,
  AccountContainer,
  AuthButton,
  AuthInput,
  ErrorContainer,
  Title,
} from "@/features/account/components/AccountComponents";
import { Text } from "@/components/typography/Text";
import { AuthenticationContext } from "@/services/authentication/authenticationContext";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

export const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, error, isLoading, isAuthenticated } = useContext(AuthenticationContext);

  React.useEffect(() => {
    if (isAuthenticated) {
      router.replace("/(tabs)/restaurants");
    }
  }, [isAuthenticated, router]);

  return (
    <AccountBackground>
      <Title>Meals To Go</Title>
      <AccountContainer>
        <AuthInput
          label="E-mail"
          value={email}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(u: string) => setEmail(u)}
        />
        <AuthInput
          label="Password"
          value={password}
          textContentType="password"
          secureTextEntry
          autoCapitalize="none"
          onChangeText={(p: string) => setPassword(p)}
        />
        {error && (
          <Box className="mt-4">
            <ErrorContainer>
              <Text variant="error">{error}</Text>
            </ErrorContainer>
          </Box>
        )}
        <Box className="mt-4">
          {isLoading ? (
            <ActivityIndicator animating={true} color={MD2Colors.blue300} />
          ) : (
            <AuthButton
              icon="lock-open-outline"
              mode="contained"
              onPress={() => onLogin(email, password)}
            >
              Login
            </AuthButton>
          )}
        </Box>
      </AccountContainer>
      <Box className="mt-4">
        <AuthButton mode="contained" onPress={() => router.back()}>
          Back
        </AuthButton>
      </Box>
    </AccountBackground>
  );
};
