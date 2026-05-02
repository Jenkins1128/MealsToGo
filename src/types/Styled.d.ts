import "styled-components/native";
import { Theme } from "@/infrastructure/theme";

declare module "styled-components/native" {
  export interface DefaultTheme extends Theme {}
}

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
