'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import clsx from 'clsx';           // ↖️  run `npm i clsx` once if you don’t have it

const NAV = [
  { href: '/rater/requests', label: 'Requests', badge: 3 },   // demo counter
  { href: '/rater/history',  label: 'History' },
  { href: '/rater/wallet',   label: 'Wallet' },
  { href: '/rater/leaderboard', label: 'Leaderboard' },
];

export default function RaterNavBar() {
  const pathname = usePathname();
  const router   = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    router.push('/?logout=1');
  };

  return (
    <nav className="glass sticky top-0 z-40 border-b border-white/10 backdrop-blur-md shadow-[0_1px_6px_rgba(0,0,0,0.4)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
        {/* Brand */}
        <Link href="/rater" className="font-bold text-lg whitespace-nowrap">
          <span className="text-[#8CFF63]">Percepia</span> • Rater
        </Link>

        {/* Nav pills */}
        <div className="flex items-center gap-2">
          {NAV.map(({ href, label, badge }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  'btn-3d glass rounded-full px-3 py-1.5 transition',
                  active && 'bg-white/10 border border-white/20'
                )}
              >
                {label}
                {badge !== undefined && (
                  <span className="ml-1 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#8CFF63]/90 px-1 text-xs font-semibold text-black">
                    {badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Log-out */}
        <button
          type="button"
          onClick={handleLogout}
          disabled={loading}
          aria-busy={loading}
          className="rounded-full border border-red-400/50 bg-transparent px-4 py-2 text-red-300 hover:bg-red-400/10 focus:outline-none focus:ring-2 focus:ring-red-400/40"
        >
          {loading ? 'Logging out…' : 'Log out'}
        </button>
      </div>
    </nav>
  );
}
