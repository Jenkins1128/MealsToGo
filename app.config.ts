import "dotenv/config";
import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "MealsToGo",
  slug: "mealstogo",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "mealstogo",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  splash: {
    image: "./assets/images/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.isaiah-jenkins.MealsToGo",
    googleServicesFile: "./GoogleService-Info.plist",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "com.mealstogo.app",
    googleServicesFile: "./google-services.json",
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    "@react-native-firebase/app",
    "@react-native-firebase/auth",
    [
      "@stripe/stripe-react-native",
      {
        merchantIdentifier: "merchant.com.mealstogo.app",
        enableGooglePay: true,
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    eas: {
      projectId: "your-eas-project-id",
    },
  },
});
