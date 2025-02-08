import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  try {
    throw new Error("Sentry Example API Route Error");
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
