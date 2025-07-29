'use client';
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-black/40 border-b border-white/10">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group" aria-label="Percepia Home">
          <Image
            src="/brand-logo.png"     // file in /public
            alt="Percepia"
            width={220}               // intrinsic (matches file)
            height={70}
            priority
            className="h-9 w-auto"    // renders ~36px tall in the navbar
          />
          {/* Removed brand text since logo includes the wordmark */}
        </Link>

        {/* ...your right-side buttons... */}
      </nav>
    </header>
  );
}
