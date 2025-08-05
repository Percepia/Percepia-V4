// src/app/user/layout.tsx
import type { Metadata } from "next";
import UserNavBar from "./navbar";
import UserFooter from "./footer";

export const metadata: Metadata = {
  title: "Percepia • User",
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* User-only navbar */}
      <UserNavBar />

      <main className="flex-1">{children}</main>

      {/* User-only footer */}
      <UserFooter />
    </div>
  );
}
