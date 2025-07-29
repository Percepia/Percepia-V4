import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Container from "@/components/container";
import Link from "next/link";

const steps = [
  { title: "Sign up", body: "Create an account and set privacy preferences." },
  { title: "Ask a rater", body: "Pick from the leaderboard or auto-assign." },
  { title: "Upload media", body: "Photo, video, or voice note per request." },
  { title: "Get feedback", body: "Kind, honest, constructive responses." }
];

const reviews = [
  { name: "Aarav (IN)", text: "Percepia helped me pick a confident outfit for my first date!" },
  { name: "Camille (FR)", text: "Gentle, precise tips. I loved the positive tone." },
  { name: "Jamal (US)", text: "Real people + real advice. Way better than generic forums." },
  { name: "Mina (KR)", text: "Uploading a voice note for tone feedback was super helpful." }
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="route">
        <section className="hero border-b border-white/10">
          <Container>
            <div className="py-24 md:py-36">
              <h1 className="text-4xl md:text-6xl font-black leading-tight max-w-3xl">
                Confidence, with kindness.
              </h1>
              <p className="text-lg text-zinc-300 mt-4 max-w-2xl">
                Percepia connects you with real people for thoughtful feedback on looks, style, and presence.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/login" className="btn-3d btn-primary-3d bg-[--accent] text-black shadow-neon-pink px-6 py-3 rounded-full">Log In</Link>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-16">
          <Container>
            <h2 className="text-3xl font-black mb-8">How it works</h2>
            <div className="steps-grid grid md:grid-cols-4 gap-12 relative">
              {steps.map((s, i) => (
                <div key={i} className="card arrow-between">
                  <div className="card-title">{s.title}</div>
                  <div className="card-sub mt-1">{s.body}</div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-16 border-t border-white/10">
          <Container>
            <h2 className="text-3xl font-black mb-4">Why Percepia?</h2>
            <p className="text-zinc-300 max-w-3xl">
              Teenagers and young adults increasingly struggle with self-image in a world of filters and highlight reels.
              Percepia offers a safe space to receive kind, honest feedback that builds confidence and celebrates uniqueness.
              Everyone is beautiful—and with perspective, you can feel it too.
            </p>
          </Container>
        </section>

        <section className="py-16">
          <Container>
            <h2 className="text-3xl font-black mb-8">What people say</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {reviews.map((r, i) => (
                <div key={i} className="card">
                  <p className="text-zinc-200">“{r.text}”</p>
                  <div className="mt-3 text-sm text-zinc-400">— {r.name}</div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
