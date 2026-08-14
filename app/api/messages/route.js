import { filterMail, getAllMessages, sortMail } from "@/app/lib/store";
import { NextResponse } from "next/server";

// GET /api/messages
// GET /api/messages?category=facture
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  let result = getAllMessages();

  if (category) {
    result = filterMail(result, category)
  }

  result = sortMail(result)

  return NextResponse.json({ count: result.length, messages: result });
}
