import ErrorPanel from "@/components/error-panel";
import Sidebar from "@/components/layout/dashboard/sidebar";
import AuthGuard from "@/components/provider/auth-guard";

export const metadata = {
  title: "MailSort — Dashboard",
  description: "Mini application de tri de messages",
};

export default function RootLayout({ children }) {
  return (
    <AuthGuard mode="protected">
      <div className="flex h-svh w-svw relative">
        <Sidebar />
        <div className="flex-1">{children}</div>
        <ErrorPanel />
      </div>
    </AuthGuard>
  );
}
