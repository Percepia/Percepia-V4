"use client";

import { useEffect, useState } from "react";
import Container from "@/components/container";
import { watchTopRaters, type LeaderboardRater } from "@/lib/services/leaderboard";

const ACCENT = "#46A2FF"; // user blue

export default function UserLeaderboardPage() {
  const [rows, setRows] = useState<LeaderboardRater[] | null>(null);

  useEffect(() => {
    const stop = watchTopRaters(setRows, { limit: 50, order: "ratingCount" });
    return stop;
  }, []);

  return (
    <main className="route" style={{ "--accent": ACCENT } as React.CSSProperties}>
      <section className="py-12">
        <Container>
          <h1 className="text-3xl font-black">Leaderboard</h1>
          <p className="mt-2 text-zinc-300">Top raters by total ratings.</p>

          {/* Loading */}
          {!rows && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="card p-4 animate-pulse">
                  <div className="h-16 w-16 rounded-full bg-white/10" />
                  <div className="mt-3 h-4 w-1/2 bg-white/10 rounded" />
                  <div className="mt-2 h-3 w-1/3 bg.white/10 rounded" />
                </div>
              ))}
            </div>
          )}

          {/* Grid */}
          {rows && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
              {rows.map((r, i) => (
                <div key={r.uid} className="card p-5 flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={r.avatarUrl || "/avatar-placeholder.png"}
                      alt={r.displayName}
                      className="h-16 w-16 rounded-full object-cover border border-white/10"
                    />
                    <span className="absolute -top-2 -left-2 grid h-6 w-6 place-items-center rounded-full bg-[--accent] text-black text-xs font-bold">
                      {i + 1}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <div className="truncate font-semibold">{r.displayName}</div>
                      {typeof r.avgRating === "number" && r.avgRating > 0 && (
                        <span className="rounded-full border border-white/10 px-2 py-0.5 text-xs">
                          ⭐ {r.avgRating.toFixed(1)}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-zinc-400 truncate">{r.specialty || "—"}</div>

                    <div className="mt-2 flex flex-wrap gap-2 text-xs">
                      <span className="rounded-full border border-white/10 px-2 py-0.5">
                        {r.ratingCount ?? 0} ratings
                      </span>
                      {typeof r.earningsAED === "number" && r.earningsAED > 0 && (
                        <span className="rounded-full border border-white/10 px-2 py-0.5">
                          AED {Math.round(r.earningsAED)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
