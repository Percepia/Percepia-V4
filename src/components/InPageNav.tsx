"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

const items = [
  { label: "How it works?", href: "#how-it-works" },
  { label: "Why Percepia", href: "#why-percepia" },
  { label: "Reviews", href: "#reviews" },
];

export default function InPageNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const classes = useMemo(() => {
    const base = "fixed top-0 left-0 right-0 z-[9999]"; // very high z to beat anything
    const chrome = "backdrop-blur border-b border-white/10 transition-colors duration-300";
    const bg = scrolled ? "bg-black/60" : "bg-black/30";
    return `${base} ${chrome} ${bg}`;
  }, [scrolled]);

  const nav = (
    <nav className={classes}>
      <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
        {/* Left: brand */}
        <Link href="/" className="font-bold text-white tracking-tight">
          Percepia
        </Link>

        {/* Right: anchor buttons */}
        <div className="flex items-center gap-3 sm:gap-4">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/90 hover:bg-white/10 hover:text-white transition"
            >
              {it.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );

  // Render at body level to avoid parent stacking/overflow issues
  if (!mounted) return null;
  return createPortal(nav, document.body);
}
