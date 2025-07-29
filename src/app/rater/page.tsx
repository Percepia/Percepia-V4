import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Container from "@/components/container";
import Link from "next/link";

export default function RaterDashboard() {
  return (
    <>
      <Navbar />
      <main className="route theme-rater">
        <section className="py-10">
          <Container>
            <h2 className="text-3xl font-black mb-6">Rater Dashboard</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link href="/rater/rating-requests" className="card hover:shadow-neon-rater transition-shadow rounded-2xl">
                <div className="text-xl font-bold">Rating Requests</div>
                <div className="text-sm text-zinc-400">New & pending</div>
              </Link>
              <Link href="/rater/earnings" className="card hover:shadow-neon-rater transition-shadow">
                <div className="text-xl font-bold">Earnings</div>
                <div className="text-sm text-zinc-400">Coins & withdrawals</div>
              </Link>
              <Link href="/rater/analytics" className="card hover:shadow-neon-rater transition-shadow">
                <div className="text-xl font-bold">Analytics</div>
                <div className="text-sm text-zinc-400">Performance overview</div>
              </Link>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 mt-4">
              <Link href="/rater/settings" className="card">Settings</Link>
              <Link href="/rater/guidelines" className="card">Guidelines</Link>
              <Link href="/rater/leaderboard" className="card">Leaderboard</Link>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
