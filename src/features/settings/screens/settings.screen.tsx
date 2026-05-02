import React, {useContext} from 'react';
import styled from 'styled-components/native';
import {List} from 'react-native-paper';
import {StackScreenProps} from '@react-navigation/stack';

import {Spacer} from '../../../components/spacer/spacer.component';
import {SafeArea} from '../../../components/utility/safe-area.component';
import {AuthenticationContext} from '../../../services/authentication/authentication.context';
import {colors} from '../../../infrastructure/theme/colors';
import {SettingsStackParamList} from '../../../infrastructure/navigation/settings.navigator';

const SettingsBackground = styled.ImageBackground.attrs({
  source: require('../../../../assets/home_bg.jpg'),
})`
  position: absolute;
  height: 100%;
  width: 100%;
`;

const TransparentSafeArea = styled(SafeArea)`
  background-color: transparent;
`;

const SettingsItem = styled(List.Item as any)`
  padding: ${props => props.theme.space[3]};
  background-color: rgba(255, 255, 255, 0.4);
`;

type Props = StackScreenProps<SettingsStackParamList, 'Settings'>;

export const SettingsScreen = ({navigation}: Props) => {
  const {onLogout} = useContext(AuthenticationContext);

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
            onPress={() => navigation.navigate('Favorites')}
          />
          <Spacer />
          <SettingsItem
            title="Logout"
            left={(props: any) => (
              <List.Icon {...props} color={colors.ui.secondary} icon="door" />
            )}
            onPress={onLogout}
          />
        </List.Section>
      </TransparentSafeArea>
    </SettingsBackground>
  );
};
