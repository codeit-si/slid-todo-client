import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://af8c77319df718b9aac66c51e29e1dff@o4507688300904448.ingest.us.sentry.io/4507688304640000",
  tracesSampleRate: 1.0,
});
