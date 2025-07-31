"use client";

import Link from "next/link";
import { useState } from "react";
import AuthButton from "@/components/AuthButton";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="text-sm text-white/70 hover:text-white transition">
    {children}
  </Link>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-black/40 border-b border-white/10">
      <nav className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-black">Percepia</Link>

        <div className="hidden md:flex items-center gap-6">
          <NavLink href="/user/request">Ask a Rater</NavLink>
          <NavLink href="/user/history">History</NavLink>
          <NavLink href="/user/wallet">Wallet</NavLink>
          <AuthButton />
        </div>

        <button
          className="md:hidden text-white/80"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>
      </nav>

      {/* mobile */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/60">
          <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-4">
            <NavLink href="/user/request">Ask a Rater</NavLink>
            <NavLink href="/user/history">History</NavLink>
            <NavLink href="/user/wallet">Wallet</NavLink>
            <AuthButton />
          </div>
        </div>
      )}
    </header>
  );
}

