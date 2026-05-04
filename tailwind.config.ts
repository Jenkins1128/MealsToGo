import type { Config } from "tailwindcss";
// @ts-ignore
import nativewind from "nativewind/preset";

const config: Config = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [nativewind],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#696AC3",
          secondary: "#5D6CC6",
          muted: "#C6DAF7",
        },
        ui: {
          primary: "#262626",
          secondary: "#757575",
          tertiary: "#F1F1F1",
          quaternary: "#FFFFFF",
          disabled: "#DEDEDE",
          error: "#D0421B",
          success: "#138000",
        },
        bg: {
          primary: "#FFFFFF",
          secondary: "#F1F1F1",
        },
        text: {
          primary: "#262626",
          secondary: "#757575",
          disabled: "#9C9C9C",
          inverse: "#FFFFFF",
          error: "#D0421B",
          success: "#138000",
        },
      },
      fontFamily: {
        // @ts-ignore
        body: ["Oswald-Regular"],
        // @ts-ignore
        heading: ["Lato-Regular"],
        // @ts-ignore
        monospace: ["Oswald-Regular"],
      },
      fontSize: {
        // @ts-ignore
        caption: "12px",
        // @ts-ignore
        button: "14px",
        // @ts-ignore
        body: "16px",
        // @ts-ignore
        title: "20px",
        // @ts-ignore
        h5: "24px",
        // @ts-ignore
        h4: "34px",
        // @ts-ignore
        h3: "45px",
        // @ts-ignore
        h2: "56px",
        // @ts-ignore
        h1: "112px",
      },
    },
  },
  plugins: [],
};

export default config;
