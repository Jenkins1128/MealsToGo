import { Box } from "@/components/ui/box";
import React, { useContext, useState } from "react";
import { useRouter } from "expo-router";
import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  AuthInput,
  ErrorContainer,
  Title,
} from "@/features/account/components/AccountComponents";
import { Text } from "@/components/typography/Text";
import { AuthenticationContext } from "@/services/authentication/authenticationContext";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

export const RegisterScreen = () => {
  const router = useRouter();
  const { onRegister, isLoading, error, isAuthenticated } = useContext(AuthenticationContext);

  React.useEffect(() => {
    if (isAuthenticated) {
      router.replace("/(tabs)/restaurants");
    }
  }, [isAuthenticated, router]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  return (
    <AccountBackground>
      <AccountCover />
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
        <Box className="mt-4">
          <AuthInput
            label="Password"
            value={password}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(p: string) => setPassword(p)}
          />
        </Box>
        <Box className="mt-4">
          <AuthInput
            label="Repeat Password"
            value={repeatedPassword}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(p: string) => setRepeatedPassword(p)}
          />
        </Box>
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
              icon="email"
              mode="contained"
              onPress={() => onRegister(email, password, repeatedPassword)}
            >
              Register
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
