import "./globals.css";
import type { Metadata } from "next";

import ToasterContext from "./context/ToasterContext";
import AuthContext from "./context/AuthContext";

export const metadata: Metadata = {
  title: "Auth App",
  description: "Sign up and login with NextAuth.js and TailwindCSS",
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
          <ToasterContext />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
