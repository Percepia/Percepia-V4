import Container from "@/components/container";
import Link from "next/link";

export default function WalletPage() {
  return (
    <main className="route">
      <section className="py-12">
        <Container>
          <h1 className="text-3xl font-black">Wallet</h1>
          <p className="text-zinc-300 mt-2">
            Manage your coins and recent transactions.
          </p>

          <div className="grid lg:grid-cols-2 gap-6 mt-8">
            <div className="card p-6">
              <div className="text-sm text-zinc-400">Current Balance</div>
              <div className="text-4xl font-black mt-2">320</div>
              <div className="mt-4 flex gap-3">
                <Link
                  href="/user/wallet/buy"
                  className="btn-3d btn-primary-3d bg-[--accent] text-black px-5 py-2 rounded-full"
                >
                  Buy Coins
                </Link>
                <Link
                  href="/user/wallet/earn"
                  className="btn-3d px-5 py-2 rounded-full border border-white/10"
                >
                  Earn Coins
                </Link>
              </div>
            </div>

            <div className="card p-6">
              <div className="font-semibold">Recent Activity</div>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex justify-between">
                  <span>Request feedback</span><span>-20</span>
                </li>
                <li className="flex justify-between">
                  <span>Coins purchased</span><span>+200</span>
                </li>
                <li className="flex justify-between">
                  <span>Referral bonus</span><span>+20</span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
