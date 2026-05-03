import React, { useContext } from "react";
import styled from "styled-components/native";
import { List } from "react-native-paper";
import { useRouter } from "expo-router";

import { Spacer } from "@/components/spacer/Spacer";
import { SafeArea } from "@/components/utility/SafeArea";
import { AuthenticationContext } from "@/services/authentication/authenticationContext";
import { colors } from "@/infrastructure/theme/colors";

const SettingsBackground = styled.ImageBackground.attrs({
  source: require("@assets/images/HomeBg.jpg"),
})`
  position: absolute;
  height: 100%;
  width: 100%;
`;

const TransparentSafeArea = styled(SafeArea)`
  background-color: transparent;
`;

const SettingsItem = styled(List.Item as any)`
  padding: ${(props: any) => props.theme.space[3]};
  background-color: rgba(255, 255, 255, 0.4);
`;

export const SettingsScreen = () => {
  const router = useRouter();
  const { onLogout } = useContext(AuthenticationContext);

  return (
    <SettingsBackground>
      <TransparentSafeArea>
        <List.Section>
          <SettingsItem
            title="Favourites"
            description="View your favourites"
            left={(props: any) => (
              <List.Icon {...props} color={colors.ui.error} icon="heart" />
            )}
            onPress={() => router.push("/(tabs)/settings/Favorites")}
          />
          <Spacer />
          <SettingsItem
            title="Logout"
            left={(props: any) => (
              <List.Icon
                {...props}
                color={colors.ui.secondary}
                icon="door"
              />
            )}
            onPress={onLogout}
          />
        </List.Section>
      </TransparentSafeArea>
    </SettingsBackground>
  );
};
