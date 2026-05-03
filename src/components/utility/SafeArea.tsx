import React from "react";
import { SafeAreaView, SafeAreaViewProps } from "react-native-safe-area-context";

interface Props extends SafeAreaViewProps {
  className?: string;
  children: React.ReactNode;
}

export const SafeArea = ({ className = "", children, ...props }: Props) => {
  return (
    <SafeAreaView className={`flex-1 bg-bg-primary ${className}`} {...props}>
      {children}
    </SafeAreaView>
  );
};
