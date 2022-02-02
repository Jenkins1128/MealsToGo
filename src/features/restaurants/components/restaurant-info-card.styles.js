import styled from 'styled-components/native';
import {Card} from 'react-native-paper';

export const RestaurantCard = styled(Card)`
  background-color: ${props => props.theme.colors.bg.primary};
  width: 95%;
  align-self: center;
`;

export const RestaurantCardCover = styled(Card.Cover)`
  padding: ${props => props.theme.space[3]};
  background-color: ${props => props.theme.colors.bg.primary};
`;

export const Info = styled.View`
  padding: ${props => props.theme.space[3]};
`;

export const Rating = styled.View`
  flex-direction: row;
  padding-vertical: ${props => props.theme.space[2]};
`;

export const Section = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SectionEnd = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;

export const Icon = styled.Image`
  width: 15px;
  height: 15px;
`;
