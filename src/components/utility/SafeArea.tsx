import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";

export const SafeArea = styled(SafeAreaView as any)`
  flex: 1;
  background-color: ${(props: any) => props.theme.colors.bg.primary};
`;
