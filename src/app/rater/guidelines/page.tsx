// Rater → Guidelines
export default function RaterGuidelinesPage() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-gradient-to-b from-black via-neutral-900 to-black text-white">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1
          className="text-3xl md:text-4xl font-semibold tracking-tight"
          style={{ textShadow: "0 0 16px rgba(236,72,153,.6)" }}
        >
          Rater Guidelines
        </h1>
        <p className="mt-2 text-sm text-white/70">
          Deliver honest, kind, and actionable feedback. Keep it safe, helpful, and consistent.
        </p>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <article className="rounded-xl border border-white/10 bg-white/5 p-6 transition hover:shadow-[0_0_30px_rgba(236,72,153,0.35)] hover:border-pink-500/40">
            <h2 className="text-lg font-semibold">1) Tone: Kind + Direct</h2>
            <ul className="mt-3 list-disc pl-5 text-sm text-white/80 space-y-2">
              <li>Start with a quick positive: what already works well.</li>
              <li>Give <b>specific</b> suggestions: “Try a mid-rise dark jean” beats “better pants”.</li>
              <li>Avoid insults, sarcasm, or body-shaming. Be considerate and precise.</li>
            </ul>
          </article>

          <article className="rounded-xl border border-white/10 bg-white/5 p-6 transition hover:shadow-[0_0_30px_rgba(236,72,153,0.35)] hover:border-pink-500/40">
            <h2 className="text-lg font-semibold">2) Structure: 3-Step Format</h2>
            <ol className="mt-3 list-decimal pl-5 text-sm text-white/80 space-y-2">
              <li><b>What’s good:</b> 1–2 quick wins you notice first.</li>
              <li><b>What to improve:</b> at most 3 points, ranked by impact.</li>
              <li><b>How to try:</b> links or examples (if allowed), or clear alternatives.</li>
            </ol>
          </article>

          <article className="rounded-xl border border-white/10 bg-white/5 p-6 transition hover:shadow-[0_0_30px_rgba(236,72,153,0.35)] hover:border-pink-500/40">
            <h2 className="text-lg font-semibold">3) Photos & Privacy</h2>
            <ul className="mt-3 list-disc pl-5 text-sm text-white/80 space-y-2">
              <li>No nudity, harassment, or doxxing. Report abusive content.</li>
              <li>Comment on outfits, framing, lighting—not permanent features.</li>
              <li>Never request personal contact or off-platform chatting.</li>
            </ul>
          </article>

          <article className="rounded-xl border border-white/10 bg-white/5 p-6 transition hover:shadow-[0_0_30px_rgba(236,72,153,0.35)] hover:border-pink-500/40">
            <h2 className="text-lg font-semibold">4) Categories & Examples</h2>
            <ul className="mt-3 list-disc pl-5 text-sm text-white/80 space-y-2">
              <li><b>Outfit:</b> fit, color harmony, footwear, grooming.</li>
              <li><b>Profile:</b> first photo strength, bio clarity, prompts.</li>
              <li><b>Messaging:</b> opener ideas, tone, questions that invite replies.</li>
            </ul>
          </article>
        </div>

        {/* “Better looking” textbox area for long replies */}
        <div className="mt-10">
          <label htmlFor="sample-reply" className="text-sm text-white/80">
            Sample reply box (styled)
          </label>
          <textarea
            id="sample-reply"
            rows={6}
            placeholder="Write thoughtful, kind, and actionable feedback…"
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-4 text-sm
                       placeholder-white/40 outline-none transition
                       focus:ring-2 focus:ring-pink-500/60 focus:border-pink-500/60
                       hover:shadow-[0_0_20px_rgba(236,72,153,0.25)]"
          />
        </div>
      </section>
    </div>
  );
}
