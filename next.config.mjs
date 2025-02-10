/** @type {import('next').NextConfig} */
import { withSentryConfig } from "@sentry/nextjs";
const nextConfig = {
  experimental: {
    forceSwcTransforms: true,
  },
};
export default withSentryConfig(nextConfig, {
  org: "bigroot",
  project: "javascript-react",
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: false,
});
