import LoginForm from "@/components/login-form";

export const metadata = {
  title: "MailSort — Login",
  description: "Login form for MailSort",
};

export default function Login() {
  return (
    <main style={{ maxWidth: 720, margin: "60px auto", padding: 24 }}>
      <h1 className="text-3xl font-bold text-cyan-800 text-center">Login</h1>
      <LoginForm />
    </main>
  );
}
