"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer"; // If you haven't renamed the file to 'Footer.tsx', change this to "./footer"

export default function ClientNav({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide navbar/footer on certain routes (edit the list if needed)
  const hideOnPrefixes = ["/login"];
  const hideOnExact = ["/auth/callback"];

  const hideChrome =
    (pathname ? hideOnPrefixes.some((p) => pathname.startsWith(p)) : false) ||
    (pathname ? hideOnExact.includes(pathname) : false);

  return (
    <>
      {!hideChrome && <Navbar />}
      <main>{children}</main>
      {!hideChrome && <Footer />}
    </>
  );
}
