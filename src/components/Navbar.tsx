// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AuthButton from "@/components/AuthButton";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="text-sm text-white/60 hover:text-white">
    {children}
  </Link>
);

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...props}>
      <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...props}>
      <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [authed, setAuthed] = useState<boolean | null>(null); // null during initial check

  useEffect(() => {
    const unsub = onAuthStateChanged(getAuth(), (u) => setAuthed(!!u));
    return unsub;
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-black/50 backdrop-blur border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 md:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-black text-xl tracking-tight" aria-label="Percepia">
          Percepia
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {/* Show protected links ONLY when signed in */}
          {authed ? (
            <>
              <NavLink href="/user/request">Ask a Rater</NavLink>
              <NavLink href="/user/history">History</NavLink>
              <NavLink href="/user/wallet">Wallet</NavLink>
            </>
          ) : null}

          {/* Auth-aware button (Log in / Log out) */}
          <AuthButton />
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
          <span className="text-sm">{open ? "Close" : "Menu"}</span>
        </button>
      </div>

      {/* Mobile sheet */}
      {open && (
        <div className="md:hidden border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 md:px-6 py-4 grid gap-3">
            {/* Protected links only when signed in */}
            {authed ? (
              <>
                <Link href="/user/request" className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-white" onClick={() => setOpen(false)}>
                  Ask a Rater
                </Link>
                <Link href="/user/history" className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-white" onClick={() => setOpen(false)}>
                  History
                </Link>
                <Link href="/user/wallet" className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-white" onClick={() => setOpen(false)}>
                  Wallet
                </Link>
              </>
            ) : null}

            {/* Auth-aware button; also closes the sheet after action */}
            <AuthButton className="w-full" onAction={() => setOpen(false)} />
          </div>
        </div>
      )}
    </header>
  );
}
