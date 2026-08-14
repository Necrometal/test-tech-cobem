
export const metadata = {
  title: "MailSort — Dashboard",
  description: "Mini application de tri de messages",
};

export default function RootLayout({ children }) {
  return (
    <div>
      <h1>dashboard</h1>
      <div>{children}</div>
    </div>
  );
}
