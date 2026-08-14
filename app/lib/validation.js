import { email, object, string } from "zod";

export const LoginForm = object({
  email: email('Invalid email format'),
  password: string('Password should be a text').min(1, 'Password is required')
});

export const ChangeCategoryForm = object({
  category: string('Category should be a text').min(1, 'Category is required')
})