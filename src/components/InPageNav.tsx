// src/components/InPageNav.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const items = [
  { label: "How it works?", href: "#how-it-works" },
  { label: "Why Percepia", href: "#why-percepia" },
  { label: "Reviews", href: "#reviews" },
];

export default function InPageNav() {
  const [transparent, setTransparent] = useState(true);

  useEffect(() => {
    const onScroll = () => setTransparent(window.scrollY > 10); // transparent when scrolled
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const base = "fixed top-0 inset-x-0 z-50 transition-colors duration-300";
  const bg = transparent
    ? "bg-transparent"
    : "bg-black/40 backdrop-blur supports-[backdrop-filter]:backdrop-blur border-b border-white/10";

  return (
    <nav className={`${base} ${bg}`} aria-label="Section navigation">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-end gap-4 sm:gap-6">
        {items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            className="text-sm sm:text-base font-medium text-white/90 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40 rounded px-2 py-1"
            scroll
          >
            {it.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}