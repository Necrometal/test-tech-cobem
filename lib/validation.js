import { VALID_CATEGORIES } from "@/constantes";
import { email, object, string, enum as zEnum } from "zod";

// form validation

export const LoginForm = object({
  email: email('Invalid email format'),
  password: string('Password should be a text').min(1, 'Password is required')
});

export const ChangeCategoryForm = object({
  category: zEnum(VALID_CATEGORIES, {
    error: `Catégorie invalide. Valeurs possibles : ${VALID_CATEGORIES.join(", ")}`,
  }),
})