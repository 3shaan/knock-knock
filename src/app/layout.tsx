import type { Metadata } from "next";
import AuthContext from "./context/AuthContext";
import ToastContext from "./context/ToastContext";
import "./globals.css";
import ActiveStatus from "./components/ActiveStatus";

export const metadata: Metadata = {
  title: "knock-knock",
  description: "knock-knock messenger app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthContext>
          <ToastContext />
          <ActiveStatus />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
