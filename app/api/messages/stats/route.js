import { getStats } from "@/app/lib/store";
import { NextResponse } from "next/server";

// GET /api/messages/stats
// Retourne le nombre de messages par catégorie ainsi que le total.
export async function GET() {
  const result = getStats()

  return NextResponse.json({
    ...result
  });
}
