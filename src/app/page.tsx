// src/app/page.tsx
import Link from "next/link";
import { Suspense } from "react";
import Container from "@/components/container";
import LogoutOnHome from "@/components/LogoutOnHome";
import HeroCTA from "@/components/HeroCTA";

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
    <main className="route">
      {/* Handles ?logout=1 → signs out and cleans URL */}
      <Suspense fallback={null}>
        <LogoutOnHome />
      </Suspense>

      {/* Hero */}
      <section className="hero border-b border-white/10">
        <Container>
          <div className="py-24 md:py-36">
            <h1 className="text-4xl md:text-6xl font-black leading-tight max-w-3xl">
              Confidence, with kindness.
            </h1>
            <p className="text-lg text-zinc-300 mt-4 max-w-2xl">
              Percepia connects you with real people for thoughtful feedback on looks, style, and presence.
            </p>

            {/* Auth-aware CTAs */}
            <HeroCTA />
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="py-16">
        <Container>
          <h2 className="text-3xl font-black mb-8 !text-[#8CFF63] [text-shadow:0_0_8px_rgba(140,255,99,0.45),0_0_1px_rgba(140,255,99,0.7)]">
            How it works
          </h2>
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

      {/* Why Percepia */}
      <section className="py-16 border-t border-white/10">
        <Container>
          <h2 className="text-3xl font-black mb-4 !text-[#8CFF63] [text-shadow:0_0_8px_rgba(140,255,99,0.45),0_0_1px_rgba(140,255,99,0.7)]">
            Why Percepia?
          </h2>
          <p className="text-zinc-300 max-w-3xl">
            Teenagers and young adults increasingly struggle with self-image in a world of filters and highlight reels.
            Percepia offers a safe space to receive kind, honest feedback that builds confidence and celebrates uniqueness.
            Everyone is beautiful—and with perspective, you can feel it too.
          </p>

          {/* Three highlight cards with hover glow */}
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="card p-6 transition duration-200 hover:-translate-y-0.5 hover:border-white/30 hover:shadow-[0_0_24px_rgba(255,113,225,0.35)]">
              <h3 className="text-xl font-semibold !text-[#ff71e1] [text-shadow:0_0_8px_rgba(255,113,225,0.55)]">
                Ask what you can’t ask
              </h3>
              <p className="text-zinc-300 mt-2">
                We’ve all wanted to ask a style icon or that one Insta model, “Does this look work on me?”
                DMs get buried, comments are noisy, and friends can be too polite or too busy.
                <span className="block text-white mt-2">Percepia fixes that</span> with kind, honest feedback from real people who want to help.
              </p>
            </div>

            <div className="card p-6 transition duration-200 hover:-translate-y-0.5 hover:border-white/30 hover:shadow-[0_0_24px_rgba(255,113,225,0.35)]">
              <h3 className="text-xl font-semibold !text-[#ff71e1] [text-shadow:0_0_8px_rgba(255,113,225,0.55)]">
                Real people, real perspective
              </h3>
              <p className="text-zinc-300 mt-2">
                Not bots deciding your worth, just thoughtful peers offering clarity.
                You can upload a photo, video, or even a short voice note for tone feedback.
              </p>
            </div>

            <div className="card p-6 transition duration-200 hover:-translate-y-0.5 hover:border-white/30 hover:shadow-[0_0_24px_rgba(255,113,225,0.35)]">
              <h3 className="text-xl font-semibold !text-[#ff71e1] [text-shadow:0_0_8px_rgba(255,113,225,0.55)]">
                Actionable &amp; kind
              </h3>
              <p className="text-zinc-300 mt-2">
                Raters highlight what works, what to tweak, and how to level up while being always constructive.
                You control what you share, and we promote respectful, safe conduct.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* What people say */}
      <section className="py-16">
        <Container>
          <h2 className="text-3xl font-black mb-8 !text-[#8CFF63] [text-shadow:0_0_8px_rgba(140,255,99,0.45),0_0_1px_rgba(140,255,99,0.7)]">
            What people say
          </h2>
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
  );
}