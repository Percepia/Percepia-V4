// src/app/user/page.tsx
import type { Route } from "next";
import Link from "next/link";
import Container from "@/components/container";

export default function UserDashboard() {
  return (
    <main className="route">
      <section className="py-12">
        <Container>
          <h1 className="text-3xl font-black mb-6">Your dashboard</h1>

          <div className="grid gap-4 md:grid-cols-3">
            <Link
              href={"/user/request" as Route}
              className="card p-6 hover:border-white/30"
            >
              <div className="text-lg font-semibold">Ask a Rater</div>
              <p className="text-sm text-zinc-400 mt-1">Create a new request.</p>
            </Link>

            {/* ✅ Correct link to History */}
            <Link
              href={"/user/history" as Route}
              className="card p-6 hover:border-white/30"
            >
              <div className="text-lg font-semibold">History</div>
              <p className="text-sm text-zinc-400 mt-1">
                View your past requests & feedback.
              </p>
            </Link>

            <Link
              href={"/user/wallet" as Route}
              className="card p-6 hover:border-white/30"
            >
              <div className="text-lg font-semibold">Wallet</div>
              <p className="text-sm text-zinc-400 mt-1">
                Coins and transactions.
              </p>
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
