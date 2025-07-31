
// src/components/AuthButton.tsx
"use client";

import Link from "next/link";
import type { Route } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";

type Props = { className?: string; onAction?: () => void };

export default function AuthButton({ className = "", onAction }: Props) {
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(getAuth(), (user) => {
      setAuthed(!!user);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) return null;

  function handleClick() {
    if (authed) {
      // ✅ Step 1: go to HOME with a flag; sign-out will happen there
      onAction?.(); // closes mobile menu if used in Navbar
      router.push("/?logout=1" as Route);
    } else {
      router.push("/login" as Route);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`btn ${authed ? "btn-secondary" : "btn-primary"} ${className}`}
    >
      {authed ? "Log out" : "Log in"}
    </button>
  );
}
