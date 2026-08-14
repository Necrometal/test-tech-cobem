import {
  getMessageById,
} from "@/app/lib/store";
import { NextResponse } from "next/server";

// PATCH /api/messages/:id/category  body: { "category": "facture" }
export async function GET(request, { params }) {
  const { id } = await params;

  try {
    const message = getMessageById(id);
    return NextResponse.json(message ?? {
      error: 'No message found'
    });
  }catch(e){
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
