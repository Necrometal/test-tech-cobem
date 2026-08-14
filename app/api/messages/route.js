import { filterMail, getAllMessages, sortMail, VALID_CATEGORIES } from "@/app/lib/store";
import { ChangeCategoryForm } from "@/app/lib/validation";
import { withErrorHandling } from "@/app/lib/with-error-handling";
import { NextResponse } from "next/server";

// GET /api/messages
// GET /api/messages?category=facture
export const GET = withErrorHandling(async (request) => {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  let result = getAllMessages();

  if (category) {

    const { data, success, error } = ChangeCategoryForm.safeParse({ category });
    if (!success) {
      return NextResponse.json(
        { error: `Catégorie invalide. Valeurs possibles : ${VALID_CATEGORIES.join(", ")}` },
        { status: 400 }
      );
    }
    result = filterMail(result, category)
  }

  result = sortMail(result)

  return NextResponse.json({ count: result.length, messages: result });
});
