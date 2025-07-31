"use client";

import { useEffect } from "react";
import type { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";

export default function LogoutOnHome() {
  const pathname = usePathname();
  const search = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (pathname === "/" && search.get("logout") === "1") {
      // Sign out now that we're safely on a public route
      signOut(getAuth()).finally(() => {
        // Clean the URL back to "/" after signing out
        router.replace("/" as Route);
      });
    }
  }, [pathname, search, router]);

  return null;
}
