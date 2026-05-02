import React, {ReactNode} from 'react';
import styled, {useTheme, DefaultTheme} from 'styled-components/native';

const sizeVariant = {
  small: 1,
  medium: 2,
  large: 3,
  xl: 4,
  xxl: 5,
};

const positionVariant = {
  top: 'marginTop',
  left: 'marginLeft',
  right: 'marginRight',
  bottom: 'marginBottom',
};

type SpacerSize = keyof typeof sizeVariant;
type SpacerPosition = keyof typeof positionVariant;

const getVariant = (
  position: SpacerPosition,
  size: SpacerSize,
  theme: DefaultTheme,
) => {
  const sizeIndex = sizeVariant[size];
  const property = positionVariant[position];
  const value = theme.space[sizeIndex];
  return `${property}:${value}`;
};

interface SpacerViewProps {
  variant: string;
}

const SpacerView = styled.View<SpacerViewProps>`
  ${({variant}) => variant};
`;

interface SpacerProps {
  position?: SpacerPosition;
  size?: SpacerSize;
  children?: any;
}

export const Spacer = ({
  position = 'top',
  size = 'small',
  children,
}: SpacerProps) => {
  const theme = useTheme();
  const variant = getVariant(position, size, theme);
  return <SpacerView variant={variant}>{children}</SpacerView>;
};
