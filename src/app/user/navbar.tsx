"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

const NAV = [
  { href: "/user/request",     label: "Ask a Rater" },
  { href: "/user/history",     label: "History" },
  { href: "/user/wallet",      label: "Wallet" },
  { href: "/user/leaderboard", label: "Leaderboard" },
];

export default function UserNavBar() {
  const pathname      = usePathname();
  const router        = useRouter();
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef       = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) =>
      menuRef.current && !menuRef.current.contains(e.target as Node) && setMenuOpen(false);
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const logout = () => (setLoading(true), router.push("/?logout=1"));

  return (
    <nav className="glass sticky top-0 z-40 border-b border-white/10 backdrop-blur-md shadow-[0_1px_6px_rgba(0,0,0,0.4)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
        {/* Brand */}
        <Link href="/user" className="text-lg font-bold whitespace-nowrap">
          <span className="text-[#46A2FF]">Percepia</span> • User
        </Link>

        {/* Middle links */}
        <div className="flex items-center gap-2">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                "btn-3d glass rounded-full px-3 py-1.5 transition",
                pathname.startsWith(href) && "bg-white/10 border border-white/20"
              )}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Avatar + dropdown */}
        <div ref={menuRef} className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-white/15"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" stroke="white" strokeWidth="1.8" fill="none">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c1.5-4 14.5-4 16 0" />
            </svg>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg border border-white/10 bg-zinc-900/95 shadow-xl">
              <Link
                href="/user/profile"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 text-sm text-white hover:bg-white/5"
              >
                Profile
              </Link>
              <Link
                href="/user/settings"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 text-sm text-white hover:bg-white/5"
              >
                Settings
              </Link>
              <button
                type="button"
                onClick={logout}
                disabled={loading}
                className="block w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-400/10"
              >
                {loading ? "Logging out…" : "Log out"}
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
