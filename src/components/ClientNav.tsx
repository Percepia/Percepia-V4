"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

type Props = { children: React.ReactNode };

export default function ClientNav({ children }: Props) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Make the server and first client render identical
  useEffect(() => setMounted(true), []);

  // On server (and the first client render), render only children
  if (!mounted) {
    return <>{children}</>;
  }

  // After mount, decide whether to show the public shell
  const p = pathname || "";
  const hideShell =
    p.startsWith("/login") || p.startsWith("/user") || p.startsWith("/rater");

  if (hideShell) {
    return <>{children}</>;
  }

  // Public shell for marketing/public routes
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
