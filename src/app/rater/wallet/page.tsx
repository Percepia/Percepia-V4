"use client";

import { useEffect, useState } from "react";
import Container from "@/components/container";
import { auth } from "@/lib/firebase";
import { watchWallet, type WalletSnapshot } from "@/lib/services/wallet";

const ACCENT = "#8CFF63"; // rater green

function Amount({ v }: { v: number }) {
  const s = new Intl.NumberFormat("en-AE", { style: "currency", currency: "AED", maximumFractionDigits: 0 }).format(
    Math.abs(v || 0)
  );
  return <span className={v >= 0 ? "text-emerald-300" : "text-rose-300"}>{v >= 0 ? "+" : "-"}{s}</span>;
}

export default function RaterWalletPage() {
  const [data, setData] = useState<WalletSnapshot>({ balance: 0, items: [] });

  useEffect(() => {
    const u = auth.currentUser;
    if (!u) return;
    const stop = watchWallet(u.uid, setData);
    return stop;
  }, []);

  const balanceStr = new Intl.NumberFormat("en-AE", { style: "currency", currency: "AED", maximumFractionDigits: 0 })
    .format(data.balance || 0);

  return (
    <main className="route theme-rater" style={{ "--accent": ACCENT } as React.CSSProperties}>
      <section className="py-12">
        <Container>
          <h1 className="text-3xl font-black">Wallet</h1>
          <p className="text-zinc-300 mt-2">Your earnings and payouts.</p>

          <div className="grid lg:grid-cols-2 gap-6 mt-8">
            <div className="card p-6">
              <div className="text-sm text-zinc-400">Available Balance</div>
              <div className="text-4xl font-black mt-2">{balanceStr}</div>
              <div className="mt-4 flex gap-3">
                <button className="btn-3d btn-primary-3d bg-[--accent] text-black px-5 py-2 rounded-full" type="button" disabled>
                  Withdraw (soon)
                </button>
                <button className="btn-3d px-5 py-2 rounded-full border border-white/10" type="button" disabled>
                  View Payout Policy
                </button>
              </div>
            </div>

            <div className="card p-6">
              <div className="font-semibold">Transactions</div>
              {data.items.length === 0 ? (
                <div className="text-sm text-zinc-500 mt-4">No transactions yet.</div>
              ) : (
                <ul className="mt-4 space-y-3 text-sm">
                  {data.items.map(({ id, data: tx }) => (
                    <li key={id} className="flex justify-between gap-4">
                      <div className="min-w-0">
                        <div className="truncate">{tx.note || tx.type || "Transaction"}</div>
                        <div className="text-zinc-500">
                          {tx.createdAt ? new Date(tx.createdAt.toMillis()).toLocaleString() : "—"}
                        </div>
                      </div>
                      <Amount v={Number(tx.amount) || 0} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
