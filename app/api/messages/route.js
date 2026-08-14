import { filterMail, getAllMessages, sortMail } from "@/app/lib/store";
import { NextResponse } from "next/server";

// GET /api/messages
// GET /api/messages?category=facture
export async function GET(request) {
  try{
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    let result = getAllMessages();

    if (category) {
      result = filterMail(result, category)
    }

    result = sortMail(result)

    return NextResponse.json({ count: result.length, messages: result });
  }catch(e){
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
