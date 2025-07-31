// src/components/HeroCTA.tsx
"use client";

import Link from "next/link";
import type { Route } from "next";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

/**
 * Auth-aware hero buttons:
 * - Signed out: "Log In" (primary) + "Start a Request" via /login?next=/user/request
 * - Signed in:  "Start a Request" (primary) + "History"
 */
export default function HeroCTA() {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(getAuth(), (u) => setAuthed(!!u));
    return unsub;
  }, []);

  // While checking auth, show just Log In to avoid flicker
  if (authed === null) {
    return (
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href={"/login" as Route}
          className="btn-3d btn-primary-3d bg-[--accent] text-black shadow-neon-pink px-6 py-3 rounded-full"
        >
          Log In
        </Link>
      </div>
    );
  }

  if (!authed) {
    // Signed out
    return (
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href={"/login" as Route}
          className="btn-3d btn-primary-3d bg-[--accent] text-black shadow-neon-pink px-6 py-3 rounded-full"
        >
          Log In
        </Link>
        <Link
          href={"/login?next=/user/request" as Route}
          className="btn-3d px-6 py-3 rounded-full border border-white/10"
        >
          Start a Request
        </Link>
      </div>
    );
  }

  // Signed in
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <Link
        href={"/user/request" as Route}
        className="btn-3d btn-primary-3d bg-[--accent] text-black shadow-neon-pink px-6 py-3 rounded-full"
      >
        Start a Request
      </Link>
      <Link
        href={"/user/history" as Route}
        className="btn-3d px-6 py-3 rounded-full border border-white/10"
      >
        History
      </Link>
    </div>
  );
}

