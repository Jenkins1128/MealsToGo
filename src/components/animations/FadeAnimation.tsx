import { Box } from "@/components/ui/box";
import React, { useRef, useEffect, ReactNode } from "react";
import { Animated, ViewStyle } from "react-native";

interface FadeInViewProps {
  duration?: number;
  children?: ReactNode;
  style?: ViewStyle;
}

export const FadeInView = ({
  duration = 1500,
  children,
  style,
}: FadeInViewProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, duration]);

  return (
    <Animated.View
      style={{
        ...style,
        opacity: fadeAnim,
      }}
    >
      {children}
    </Animated.View>
  );
};
