// Rater → History
export default function RaterHistoryPage() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-gradient-to-b from-black via-neutral-900 to-black text-white">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1
          className="text-3xl md:text-4xl font-semibold tracking-tight"
          style={{ textShadow: "0 0 16px rgba(236,72,153,.6)" }}
        >
          Completed Feedback
        </h1>
        <p className="mt-2 text-sm text-white/70">
          Your previous responses and earnings summary.
        </p>

        <div className="mt-8 overflow-hidden rounded-xl border border-white/10 bg-white/5">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-white/80">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Date</th>
                <th className="px-4 py-3 text-left font-medium">Topic</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">Coins</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 8 }).map((_, i) => (
                <tr
                  key={i}
                  className="border-t border-white/10 hover:bg-white/5 transition"
                >
                  <td className="px-4 py-3">2025-08-0{i + 1}</td>
                  <td className="px-4 py-3">Dating outfit review</td>
                  <td className="px-4 py-3">Sent</td>
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
