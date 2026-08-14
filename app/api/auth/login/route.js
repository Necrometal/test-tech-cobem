import { checkCredential, JWT_SECRET } from "@/app/lib/auth";
import { LoginForm } from "@/app/lib/validation";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request) {
  let body // mettre body accessible pour les traitement

  // gerer l'erreur body individuellement
  try {
    body = await request.json();
  } catch (e) {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }
  
  try {
    // valider la requete
    const { data, success, error } = LoginForm.safeParse(body);
    if (!success) {
      return NextResponse.json(
        { error: "Champs invalides", details: z.flattenError(error).fieldErrors },
        { status: 400 }
      );
    }
    
    // check credential
    if(!checkCredential(data)) {
      return NextResponse.json({ error: "Identifiants invalides" }, { status: 401 });
    }
    
    // sign in jwt
    const { email } = data
    const token = jwt.sign({ sub: email }, JWT_SECRET, { expiresIn: "2h" });
    
    return NextResponse.json({ token });
  }catch(e){
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
