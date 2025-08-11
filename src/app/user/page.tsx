"use client";

import type { Route } from "next";
import Link from "next/link";
import Container from "@/components/container";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { watchUserProfile, type UserProfile } from "@/lib/services/user-profile";

export default function UserDashboard() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const u = auth.currentUser;
    if (!u) return;
    const stop = watchUserProfile(u.uid, setProfile);
    return stop;
  }, []);

  return (
    <main className="route">
      <section className="py-12">
        <Container>
          <div className="flex items-center gap-4 mb-6">
            <h1 className="text-3xl font-black">Your dashboard</h1>
            {/* Avatar preview (shows after upload) */}
            <img
              src={profile?.avatarUrl || "/avatar-placeholder.png"}
              alt="avatar"
              className="h-10 w-10 rounded-full object-cover border border-white/10"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Link href={"/user/request" as Route} className="card p-6 hover:border-white/30">
              <div className="text-lg font-semibold">Ask a Rater</div>
              <p className="text-sm text-zinc-400 mt-1">Create a new request.</p>
            </Link>

            <Link href={"/user/history" as Route} className="card p-6 hover:border-white/30">
              <div className="text-lg font-semibold">History</div>
              <p className="text-sm text-zinc-400 mt-1">
                View your past requests & feedback.
              </p>
            </Link>

            <Link href={"/user/wallet" as Route} className="card p-6 hover:border-white/30">
              <div className="text-lg font-semibold">Wallet</div>
              <p className="text-sm text-zinc-400 mt-1">Coins and transactions.</p>
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
