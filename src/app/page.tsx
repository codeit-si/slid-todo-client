"use client";

import { useEffect } from "react";

import * as Sentry from "@sentry/nextjs";
import NextError from "next/error";

import SentryCheck from "@/components/SentryCheck";

export default function Home({
  error,
}: {
  error?: Error & { digest?: string };
}) {
  useEffect(() => {
    if (error) {
      Sentry.captureException(error);
    }
  }, [error]);

  if (!error) {
    return (
      <div>
        <SentryCheck />
      </div>
    );
  }

  return (
    <div>
      <NextError statusCode={error.digest ? 500 : 404} />
    </div>
  );
}
