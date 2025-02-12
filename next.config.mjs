/** @type {import('next').NextConfig} */
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig = {
  experimental: {
    forceSwcTransforms: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default withSentryConfig(nextConfig, {
  org: "bigroot",
  project: "javascript-react",
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: false,
});
