import { getStats } from "@/app/lib/store";
import { NextResponse } from "next/server";

// GET /api/messages/stats
// Retourne le nombre de messages par catégorie ainsi que le total.
export async function GET() {
  try{
    const result = getStats()

    return NextResponse.json({
      ...result
    });
  }catch(e){
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
