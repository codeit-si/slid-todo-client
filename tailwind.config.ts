/* eslint-disable @typescript-eslint/no-var-requires */

import type { Config } from "tailwindcss";

const pxToRem = require("tailwindcss-preset-px-to-rem");

const config: Config = {
  presets: [pxToRem],
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      pretendard: [
        "var(--font-pretendard)",
        "-apple-system",
        "BlinkMacSystemFont",
        "system-ui",
        "Roboto",
        "Helvetica\\ Neue",
        "Segoe\\ UI",
        "Apple\\ SD\\ Gothic\\ Neo",
        "Noto\\ Sans\\ KR",
        "Malgun\\ Gothic",
        "Apple\\ Color\\ Emoji",
        "Segoe\\ UI\\ Emoji",
        "Segoe\\ UI\\ Symbol",
        "sans-serif",
      ],
    },
    screens: {
      md: "744px",
      lg: "1200px",
    },
    colors: {
      purple: {
        50: "#EEDEFF",
        100: "#E1C5FE",
        200: "#D3AAFD",
        300: "#C084FC",
        400: "#B773FB",
        500: "#AB5EF9",
        600: "#A451F7",
        700: "#912CF6",
        800: "#830FF8",
        900: "#7800F0",
        950: "#6C00D8",
      },
      slate: {
        50: "#F8FAFC",
        100: "#F1F5F9",
        200: "#E2E8F0",
        300: "#CBD5E1",
        400: "#94A3B8",
        500: "#64748B",
        600: "#475569",
        700: "#334155",
        800: "#1E293B",
        900: "#0F172A",
        950: "#020617",
      },
      red: {
        500: "#EF4444",
      },
    },
    extend: {},
  },
  plugins: [],
};

export default config;
