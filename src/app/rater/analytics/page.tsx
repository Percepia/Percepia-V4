import Container from "@/components/container";
import BackButton from "@/components/back-button";

function Stat({ title, value }:{ title:string, value:string }) {
  return (
    <div className="card">
      <div className="text-sm text-zinc-400">{title}</div>
      <div className="text-2xl font-bold mt-1">{value}</div>
    </div>
  );
}

export default function Analytics() {
  return (
    <>
      <main className="route theme-rater">
        <section className="py-10 space-y-6">
          <Container>
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black">Rater Analytics</h2>
              <BackButton />
            </div>
            <div className="grid md:grid-cols-4 gap-4">
              <Stat title="Avg response" value="2h 15m" />
              <Stat title="Completed" value="148" />
              <Stat title="Rating" value="4.8/5" />
              <Stat title="This month" value="+12%" />
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
