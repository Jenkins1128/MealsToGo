declare module 'react-native-config' {
  export interface NativeConfig {
    STRIPE_PUBLISHABLE_KEY?: string;
  }
  const Config: NativeConfig;
  export default Config;
}

declare module 'camelize';
