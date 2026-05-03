import { Box } from "@/components/ui/box";
import React, { useContext } from "react";
import { ImageBackground} from "react-native";
import { List } from "react-native-paper";
import { useRouter } from "expo-router";

import { SafeArea } from "@/components/utility/SafeArea";
import { AuthenticationContext } from "@/services/authentication/authenticationContext";
import { colors } from "@/infrastructure/theme/colors";

export const SettingsScreen = () => {
  const router = useRouter();
  const { onLogout } = useContext(AuthenticationContext);

  return (
    <ImageBackground
      source={require("@assets/images/HomeBg.jpg")}
      className="absolute h-full w-full"
    >
      <SafeArea className="bg-transparent">
        <List.Section>
          <List.Item
            title="Favourites"
            description="View your favourites"
            left={(props: { color: string; style: { marginLeft?: number; marginRight?: number; marginVertical?: number } }) => (
              <List.Icon {...props} color={colors.ui.error} icon="heart" />
            )}
            onPress={() => router.push("/(tabs)/settings/Favorites")}
            className="p-4 bg-white/40"
          />
          <Box className="mt-4" />
          <List.Item
            title="Logout"
            left={(props: { color: string; style: { marginLeft?: number; marginRight?: number; marginVertical?: number } }) => (
              <List.Icon
                {...props}
                color={colors.ui.secondary}
                icon="door"
              />
            )}
            onPress={onLogout}
            className="p-4 bg-white/40"
          />
        </List.Section>
      </SafeArea>
    </ImageBackground>
  );
};
