"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Container from "@/components/container";
import RaterGuidelinesModal from "@/components/RaterGuidelinesModal";
import { auth } from "@/lib/firebase";
import { watchRaterProfile } from "@/lib/services/rater-profile";
import { watchRaterStats, type RaterStats } from "@/lib/services/rater-stats";

/** small stat tile */
function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="card p-4">
      <span className="text-zinc-400 text-sm">{label}</span>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-2xl font-bold text-white">{value}</span>
        {hint ? <span className="text-xs text-zinc-500">{hint}</span> : null}
      </div>
    </div>
  );
}

export default function RaterHomePage() {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [stats, setStats] = useState<RaterStats>({
    pending: 0,
    totalRatings: 0,
    earningsAED: 0,
    avgResponseMinutes: 0,
  });

  useEffect(() => {
    const u = auth.currentUser;
    if (!u) return;
    const stopProfile = watchRaterProfile(u.uid, (p) => setAvatarUrl(p?.avatarUrl ?? null));
    const stopStats = watchRaterStats(u.uid, setStats);
    return () => {
      stopProfile?.();
      stopStats?.();
    };
  }, []);

  const earningsStr = new Intl.NumberFormat("en-AE", { style: "currency", currency: "AED", maximumFractionDigits: 0 })
    .format(stats.earningsAED || 0);

  const avgRespStr =
    stats.avgResponseMinutes > 0
      ? (stats.avgResponseMinutes >= 60
          ? `${Math.round(stats.avgResponseMinutes / 60)}h ${Math.round(stats.avgResponseMinutes % 60)}m`
          : `${Math.round(stats.avgResponseMinutes)}m`)
      : "—";

  return (
    <main className="route theme-rater">
      <RaterGuidelinesModal />

      {/* top padding prevents overlap with sticky header */}
      <section className="pt-24 pb-10">
        <Container>
          <div className="mb-6 flex items-center gap-4">
            <h1 className="text-3xl font-black">Rater Dashboard</h1>
            <div className="h-10 w-10 overflow-hidden rounded-full border border-white/10">
              <Image
                src={avatarUrl || "/avatar-placeholder.png"}
                alt="avatar"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover"
                priority
                // unoptimized
              />
            </div>
          </div>

          <p className="text-zinc-300">
            Welcome! Track your progress and earnings at a glance.
          </p>

          {/* stat tiles (now live) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            <Stat label="Pending Requests" value={String(stats.pending)} />
            <Stat label="Total Ratings" value={String(stats.totalRatings)} />
            <Stat label="Earnings (AED)" value={earningsStr} />
            <Stat label="Avg Response" value={avgRespStr} hint="to first reply" />
          </div>
        </Container>
      </section>
    </main>
  );
}
