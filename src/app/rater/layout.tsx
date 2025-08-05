// src/app/rater/layout.tsx
import type { Metadata } from "next";
import RaterNavBar from "./navbar";
import RaterFooter from "./footer";

export const metadata: Metadata = {
  title: "Percepia • Rater",
};

export default function RaterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server layout rendering Client components is fine in Next.js.
  // No @ts-expect-error needed.
  return (
    <div className="min-h-screen flex flex-col">
      {/* Rater-only navbar */}
      <RaterNavBar />

      <main className="flex-1">{children}</main>

      {/* Rater-only footer */}
      <RaterFooter />
    </div>
  );
}
