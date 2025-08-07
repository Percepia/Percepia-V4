"use client";
import Container from "@/components/container";

const ACCENT = "#46A2FF";

export default function UserSettingsPage() {
  return (
    <main className="route" style={{ "--accent": ACCENT } as React.CSSProperties}>
      <section className="py-12">
        <Container>
          <h1 className="text-3xl font-black">Settings</h1>
          <p className="mt-2 text-zinc-300">Adjust app preferences here (coming soon).</p>

          <div className="card mt-8 p-6">
            <p className="text-sm text-zinc-400">No settings yet. Stay tuned!</p>
          </div>
        </Container>
      </section>
    </main>
  );
}
