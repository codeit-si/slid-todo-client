import * as Sentry from "@sentry/nextjs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 의도적으로 에러를 발생시키는 코드
    throw new Error("Sentry Example API Route Error");
  } catch (error) {
    // Sentry에 에러 전송
    Sentry.captureException(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
