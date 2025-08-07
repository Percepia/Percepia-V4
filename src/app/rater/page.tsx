// src/app/rater/page.tsx
import Container from "@/components/container";
import RaterGuidelinesModal from "@/components/RaterGuidelinesModal";

/** small stat tile */
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="card p-4">
      <span className="text-zinc-400 text-sm">{label}</span>
      <span className="text-2xl font-bold text-white mt-1">{value}</span>
    </div>
  );
}

export default function RaterHomePage() {
  return (
    <main className="route theme-rater">
      <RaterGuidelinesModal />

      {/* top padding prevents overlap with sticky header */}
      <section className="pt-24 pb-10">
        <Container>
          <h1 className="text-3xl font-black">Rater Dashboard</h1>
          <p className="text-zinc-300 mt-2">
            Welcome! Track your progress and earnings at a glance.
          </p>

          {/* stat tiles */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            <Stat label="Pending Requests" value="3" />
            <Stat label="Total Ratings"   value="128" />
            <Stat label="Earnings (AED)"  value="452.00" />
            <Stat label="Avg Response"    value="1h&nbsp;14m" />
          </div>
        </Container>
      </section>
    </main>
  );
}
