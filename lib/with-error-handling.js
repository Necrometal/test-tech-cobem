import { NextResponse } from "next/server";

export function withErrorHandling(handler) {
  return async (...args) => {
    try {
      return await handler(...args);
    } catch (e) {
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  };
}
