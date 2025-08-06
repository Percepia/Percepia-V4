// Rater → Requests
export default function RaterRequestsPage() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-gradient-to-b from-black via-neutral-900 to-black text-white">
      <section className="mx-auto max-w-6xl px-4 py-10">
        {/* Pink glow title */}
        <h1
          className="text-3xl md:text-4xl font-semibold tracking-tight"
          style={{ textShadow: "0 0 16px rgba(236,72,153,.6)" }} // pink-500 glow
        >
          Incoming Requests
        </h1>
        <p className="mt-2 text-sm text-white/70">
          New requests from users who want your feedback.
        </p>

        {/* Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <article
              key={i}
              className="rounded-xl border border-white/10 bg-white/5 p-5 transition
                         hover:shadow-[0_0_30px_rgba(236,72,153,0.35)] hover:border-pink-500/40"
            >
              <div className="flex items-start justify-between">
                <h3 className="font-medium">Request #{i}</h3>
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs">New</span>
              </div>
              <p className="mt-3 text-sm text-white/70">
                “How’s my outfit for a first date?” • 3 photos attached
              </p>
              <div className="mt-5 flex gap-3">
                <button className="rounded-md bg-pink-600/90 px-3 py-1.5 text-sm font-medium hover:bg-pink-600">
                  Review
                </button>
                <button className="rounded-md bg-white/10 px-3 py-1.5 text-sm hover:bg-white/20">
                  Snooze
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
