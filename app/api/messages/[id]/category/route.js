import {
  getMessageById,
  updateMessageCategory,
} from "@/app/lib/store";
import { ChangeCategoryForm } from "@/app/lib/validation";
import { withErrorHandling } from "@/app/lib/with-error-handling";
import { NextResponse } from "next/server";
import { z } from "zod";

// PATCH /api/messages/:id/category  body: { "category": "facture" }
export const PATCH = withErrorHandling(async (request, { params }) => {
  const { id } = await params;

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body JSON attendu" }, { status: 400 });
  }

  // valider la requete
  const { data, success, error } = ChangeCategoryForm.safeParse(body);
  if (!success) {
    return NextResponse.json(
      { error: "Champs invalides", details: z.flattenError(error).fieldErrors },
      { status: 400 }
    );
  }

  const { category } = data;

  if (!getMessageById(id)) {
    return NextResponse.json({ error: "Message introuvable" }, { status: 404 });
  }

  const updated = updateMessageCategory(id, category);
  return NextResponse.json({ message: updated });
});
