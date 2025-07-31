"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
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
