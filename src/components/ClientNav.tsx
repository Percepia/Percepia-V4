"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";   // <-- match case
import Footer from "@/components/Footer";   // <-- match case

export default function ClientNav({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide navbar/footer on auth pages
  const hideShell =
    pathname?.startsWith("/login") || pathname === "/auth/callback";

  return (
    <>
      {!hideShell && <Navbar />}
      {children}
      {!hideShell && <Footer />}
    </>
  );
}
