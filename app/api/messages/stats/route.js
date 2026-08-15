import { getStats } from "@/lib/store";
import { withErrorHandling } from "@/lib/with-error-handling";
import { NextResponse } from "next/server";

// GET /api/messages/stats
// Retourne le nombre de messages par catégorie ainsi que le total.
export const GET = withErrorHandling(async () => {
  const result = getStats()

  return NextResponse.json({
    ...result
  });
});
