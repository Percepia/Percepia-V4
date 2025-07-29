import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Container from "@/components/container";
import Link from "next/link";

export default function Login() {
  return (
    <>
      <Navbar />
      <main className="route">
        <section className="py-16">
          <Container>
            <h2 className="text-3xl font-black mb-6">Who are you?</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link href="/login/user" className="card hover:shadow-neon-user transition-shadow">
                <div className="card-title">Continue as User</div>
                <div className="card-sub">Ask raters & receive feedback.</div>
              </Link>
              <Link href="/login/rater" className="card hover:shadow-neon-rater transition-shadow">
                <div className="card-title">Continue as Rater</div>
                <div className="card-sub">Help others & earn coins.</div>
              </Link>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
