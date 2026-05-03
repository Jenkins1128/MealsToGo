import React from "react";
import { Text as RNText, TextProps as RNTextProps } from "react-native";

export type TextVariant = "body" | "label" | "caption" | "error" | "hint";

interface TextProps extends RNTextProps {
  variant?: TextVariant;
  className?: string;
}

const defaultClasses = "font-body font-normal text-text-primary flex-wrap";

const variantClasses: Record<TextVariant, string> = {
  body: "text-body",
  hint: "text-body",
  error: "text-text-error text-body",
  caption: "text-caption font-bold",
  label: "font-heading text-body font-medium",
};

export const Text = ({ variant = "body", className = "", style, ...props }: TextProps) => {
  return (
    <RNText
      className={`${defaultClasses} ${variantClasses[variant]} ${className}`}
      style={style}
      {...props}
    />
  );
};
