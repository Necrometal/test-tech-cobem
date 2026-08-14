// Secret JWT partagé — en production, utiliser une variable d'environnement.
export const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-mailsort";

// Identifiants de démonstration — NE PAS MODIFIER
// login: admin@mailsort.test / password: mailsort2026
const DEMO_USER = { email: "admin@mailsort.test", password: "mailsort2026" };

export function checkCredential(data){
  const { email, password } = data
  return (email !== DEMO_USER.email || password !== DEMO_USER.password) ? false : true
}
