'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RaterNavBar() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      // Send the user to the home page with ?logout=1.
      // Your LogoutOnHome component should handle the actual sign-out.
      router.push('/?logout=1');
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="glass sticky top-0 z-40 border-b border-white/10 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Left: Brand + nav */}
        <div className="flex items-center gap-3">
          <Link href="/rater" className="font-bold text-lg">
            Percepia • Rater
          </Link>

          <Link href="/rater/requests" className="btn-3d glass rounded-full px-3 py-1.5">
            Requests
          </Link>
          <Link href="/rater/history" className="btn-3d glass rounded-full px-3 py-1.5">
            History
          </Link>
          <Link href="/rater/wallet" className="btn-3d glass rounded-full px-3 py-1.5">
            Wallet
          </Link>
          <Link href="/rater/leaderboard" className="btn-3d glass rounded-full px-3 py-1.5">
            Leaderboard
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleLogout}
            disabled={loading}
            aria-busy={loading}
            className="btn-3d glass rounded-full px-4 py-2"
          >
            {loading ? 'Logging out…' : 'Log out'}
          </button>
        </div>
      </div>
    </nav>
  );
}