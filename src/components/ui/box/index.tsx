import React from 'react';
import { View, ViewProps } from 'react-native';

export const Box = React.forwardRef<React.ElementRef<typeof View>, ViewProps>(
  ({ className, ...props }, ref) => {
    return <View ref={ref} {...props} className={className} />;
  }
);

Box.displayName = 'Box';
