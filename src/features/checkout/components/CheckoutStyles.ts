import styled from "styled-components/native";
import {
  Avatar,
  TextInput,
  Button,
  ActivityIndicator,
  MD2Colors,
} from "react-native-paper";
import { colors } from "@/infrastructure/theme/colors";

export const CartIconContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const PaymentProcessing = styled(ActivityIndicator as any).attrs({
  size: 128,
  animating: true,
  color: MD2Colors.blue300,
})`
  position: absolute;
  top: 50%;
  left: 35%;
  z-index: 999;
`;

export const CartIcon = styled(Avatar.Icon as any).attrs({
  size: 128,
})`
  background-color: ${(props: any) =>
    props.bg || props.theme.colors.brand.primary};
`;

export const NameInput = styled(TextInput as any)`
  margin: ${(props: any) => props.theme.space[3]};
`;

export const PayButton = styled(Button as any).attrs({
  color: colors.brand.primary,
})`
  width: 80%;
  align-self: center;
  padding: ${(props: any) => props.theme.space[2]};
`;

export const ClearButton = styled(Button as any).attrs({
  color: colors.ui.error,
})`
  width: 80%;
  align-self: center;
  padding: ${(props: any) => props.theme.space[2]};
`;
