import * as Sentry from "@sentry/nextjs";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  try {
    throw new Error("Sentry Example API Route Error");
  } catch (error: unknown) {
    Sentry.captureException(error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
