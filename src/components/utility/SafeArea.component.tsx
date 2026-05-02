import styled from 'styled-components/native';
import {SafeAreaView, StatusBar} from 'react-native';

export const SafeArea = styled(SafeAreaView as any)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
  background-color: ${props => props.theme.colors.bg.primary};
`;
