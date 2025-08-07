// src/components/InPageNav.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const items = [
  { label: "How it works?", href: "#how-it-works" },
  { label: "Why Percepia", href: "#why-percepia" },
  { label: "Reviews", href: "#reviews" },
];

export default function InPageNav() {
  // Wait until mounted so portal works during SSR
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  // Actual nav element
  const nav = (
    <nav
      className="
        fixed top-0 inset-x-0 z-[9999]
        bg-black/40 backdrop-blur
        border-b border-white/10
      "
    >
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-6">
        {/* Brand */}
        <Link href="/" className="font-bold text-lg whitespace-nowrap">
          Percepia
        </Link>

        {/* Section links */}
        <div className="flex items-center gap-4 sm:gap-6">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              scroll
              className="text-sm sm:text-base font-medium text-white/90 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40 rounded px-2 py-1"
            >
              {it.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );

  // Render above any stacking contexts
  return createPortal(nav, document.body);
}
