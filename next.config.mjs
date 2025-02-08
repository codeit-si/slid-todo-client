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
  authToken: "0b6857104e1811ef9faa46bdabe7f23c",
  silent: false,
});
