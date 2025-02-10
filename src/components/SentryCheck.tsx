"use client";

import * as Sentry from "@sentry/nextjs";

export default function SentryCheck() {
  return (
    <button
      type="button"
      className="absolute right-0 m-4 rounded-md border-none bg-red-500 p-4 text-white opacity-40 hover:opacity-100"
      onClick={async () => {
        await Sentry.startSpan(
          {
            name: "Example Frontend Span",
            op: "test",
          },
          async () => {
            const res = await fetch("/api/sentry-api");
            if (!res.ok) throw new Error("Sentry Example Frontend Error");
          },
        );
      }}
    >
      Throw error!
    </button>
  );
}
