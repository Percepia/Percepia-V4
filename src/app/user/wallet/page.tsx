import Container from "@/components/container";
import Link from "next/link";

// 🔵 blue accent (matches user navbar & wizard)
const ACCENT = "#46A2FF";

export default function WalletPage() {
  return (
    <main className="route" style={{ "--accent": ACCENT } as React.CSSProperties}>
      <section className="py-12">
        <Container>
          <h1 className="text-3xl font-black">Wallet</h1>
          <p className="mt-2 text-zinc-300">Manage your coins and recent transactions.</p>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {/* Balance card */}
            <div className="card p-6">
              <p className="text-sm text-zinc-400">Current Balance</p>
              <p className="mt-2 text-4xl font-black">320</p>

              <div className="mt-4 flex gap-3">
                <Link
                  href="/user/wallet/buy"
                  className="btn-3d btn-primary-3d rounded-full bg-[--accent] px-5 py-2 text-black"
                >
                  Buy Coins
                </Link>
                <Link
                  href="/user/wallet/earn"
                  className="btn-3d rounded-full border border-white/10 px-5 py-2"
                >
                  Earn Coins
                </Link>
              </div>
            </div>

            {/* Activity card */}
            <div className="card p-6">
              <p className="font-semibold">Recent Activity</p>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex justify-between">
                  <span>Request feedback</span>
                  <span className="text-red-400">-20</span>
                </li>
                <li className="flex justify-between">
                  <span>Coins purchased</span>
                  <span className="text-green-400">+200</span>
                </li>
                <li className="flex justify-between">
                  <span>Referral bonus</span>
                  <span className="text-green-400">+20</span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
