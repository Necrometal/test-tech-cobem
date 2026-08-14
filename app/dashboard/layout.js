import Sidebar from "@/components/layout/dashboard/sidebar";
import AuthGuard from "@/components/provider/auth-guard";

export const metadata = {
  title: "MailSort — Dashboard",
  description: "Mini application de tri de messages",
};

export default function RootLayout({ children }) {
  return (
    <AuthGuard mode="protected">
      <div className="flex gap-4 h-svh">
        <Sidebar />
        <div>{children}</div>
      </div>
    </AuthGuard>
  );
}
