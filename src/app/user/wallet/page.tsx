"use client";

import { useEffect, useState } from "react";
import Container from "@/components/container";
import { auth } from "@/lib/firebase";
import {
  watchWallet,
  watchTransactions,
  type WalletDoc,
  type Txn,
} from "@/lib/services/wallet";
import Link from "next/link";

const ACCENT = "#46A2FF";

function fmt(ts?: any) {
  try {
    return ts?.toDate ? ts.toDate().toLocaleString() : "—";
  } catch {
    return "—";
  }
}

export default function WalletPage() {
  const [uid, setUid] = useState<string | null>(null);
  const [wallet, setWallet] = useState<WalletDoc | null>(null);
  const [txns, setTxns] = useState<Txn[]>([]);

  useEffect(() => {
    const u = auth.currentUser;
    setUid(u?.uid ?? null);
    if (!u) return;
    const stopW = watchWallet(u.uid, setWallet);
    const stopT = watchTransactions(u.uid, setTxns);
    return () => {
      stopW?.();
      stopT?.();
    };
  }, []);

  return (
    <main className="route" style={{ "--accent": ACCENT } as React.CSSProperties}>
      <section className="py-12">
        <Container>
          <h1 className="text-3xl font-black">Wallet</h1>
          <p className="text-zinc-300 mt-2">Manage your coins and recent transactions.</p>

          <div className="grid lg:grid-cols-2 gap-6 mt-8">
            <div className="card p-6">
              <div className="text-sm text-zinc-400">Current Balance</div>
              <div className="text-4xl font-black mt-2">{wallet?.balance ?? 0}</div>
              <div className="mt-4 flex gap-3">
                <Link href="/user/wallet/buy" className="btn-3d btn-primary-3d bg-[--accent] text-black px-5 py-2 rounded-full">
                  Buy Coins
                </Link>
                <Link href="/user/wallet/earn" className="btn-3d px-5 py-2 rounded-full border border-white/10">
                  Earn Coins
                </Link>
              </div>
            </div>

            <div className="card p-6">
              <div className="font-semibold">Recent Activity</div>
              <ul className="mt-4 space-y-3 text-sm">
                {txns.length === 0 && <li className="text-zinc-400">No transactions yet.</li>}
                {txns.map((t) => (
                  <li key={t.id} className="flex items-center justify-between">
                    <span className="truncate">{t.note || (t.type === "credit" ? "Credit" : "Debit")}</span>
                    <span className={t.type === "credit" ? "text-green-300" : "text-red-300"}>
                      {t.type === "credit" ? "+" : "-"}
                      {t.amount}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 text-xs text-zinc-500">Updated: {fmt(wallet?.updatedAt)}</div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
