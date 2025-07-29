import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Container from "@/components/container";
import Link from "next/link";

export default function UserDashboard() {
  return (
    <>
      <Navbar />
      <main className="route theme-user">
        <section className="py-10">
          <Container>
            <h2 className="text-3xl font-black mb-6">User Dashboard</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link href="/user/request" className="card rounded-2xl hover:shadow-neon-user transition-shadow">
                <div className="text-xl font-bold">Ask a rater</div>
                <div className="text-sm text-zinc-400">Start a new request</div>
              </Link>
              <Link href="/user/history" className="card hover:shadow-neon-user transition-shadow">
                <div className="text-xl font-bold">History</div>
                <div className="text-sm text-zinc-400">Previous requests</div>
              </Link>
              <Link href="/user/wallet" className="card hover:shadow-neon-user transition-shadow">
                <div className="text-xl font-bold">Wallet</div>
                <div className="text-sm text-zinc-400">Balance & purchases</div>
              </Link>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
