import AuthGuard from "@/components/provider/auth-guard";

export const metadata = {
  title: "MailSort — Login",
  description: "Login form for MailSort",
};

export default function RootLayout({ children }) {
  return (
    <AuthGuard mode="guest">
      {children}
    </AuthGuard>
  );
}
