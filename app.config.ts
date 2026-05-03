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
  splash: {
    image: "./assets/images/splash-icon-true.png",
    resizeMode: "contain",
    backgroundColor: "#50238e",
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
    package: "com.isaiah_jenkins.MealsToGo",
    googleServicesFile: "./google-services.json",
    config: {
      googleMaps: {
        apiKey: process.env.GOOGLE_MAPS_API_KEY,
      },
    },
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
    [
      "expo-build-properties",
      {
        ios: {
          useFrameworks: "static",
        },
      },
    ],
    "./withFirebaseHeaders.js",
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
