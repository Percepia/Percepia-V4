// Rater → Wallet
export default function RaterWalletPage() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-gradient-to-b from-black via-neutral-900 to-black text-white">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1
          className="text-3xl md:text-4xl font-semibold tracking-tight"
          style={{ textShadow: "0 0 16px rgba(236,72,153,.6)" }}
        >
          Wallet
        </h1>
        <p className="mt-2 text-sm text-white/70">
          Balance, transactions and payout.
        </p>

        {/* Balance card */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 transition hover:shadow-[0_0_30px_rgba(236,72,153,0.35)] hover:border-pink-500/40">
            <div className="text-white/70 text-sm">Current Balance</div>
            <div className="mt-2 text-3xl font-semibold">1,240 coins</div>
            <div className="mt-4 flex gap-3">
              <button className="rounded-md bg-pink-600/90 px-3 py-1.5 text-sm font-medium hover:bg-pink-600">
                Withdraw
              </button>
              <button className="rounded-md bg-white/10 px-3 py-1.5 text-sm hover:bg-white/20">
                View Payouts
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 transition hover:shadow-[0_0_30px_rgba(236,72,153,0.35)] hover:border-pink-500/40">
            <div className="text-white/70 text-sm">Last 7 days</div>
            <div className="mt-2 text-3xl font-semibold">+ 310</div>
            <div className="text-white/60 text-xs mt-1">From 12 requests</div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6 transition hover:shadow-[0_0_30px_rgba(236,72,153,0.35)] hover:border-pink-500/40">
            <div className="text-white/70 text-sm">Monthly total</div>
            <div className="mt-2 text-3xl font-semibold">+ 1,560</div>
            <div className="text-white/60 text-xs mt-1">From 58 requests</div>
          </div>
        </div>

        {/* Transactions */}
        <div className="mt-8 overflow-hidden rounded-xl border border-white/10 bg-white/5">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-white/80">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Date</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Notes</th>
                <th className="px-4 py-3 text-right font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 6 }).map((_, i) => (
                <tr
                  key={i}
                  className="border-t border-white/10 hover:bg-white/5 transition"
                >
                  <td className="px-4 py-3">2025-08-1{i}</td>
                  <td className="px-4 py-3">Earning</td>
                  <td className="px-4 py-3">Completed feedback</td>
                  <td className="px-4 py-3 text-right">+ 25</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

