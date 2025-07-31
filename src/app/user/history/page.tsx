import Container from "@/components/container";
import Link from "next/link";

const mock = [
  { id: "101", title: "First date outfit", status: "Completed", date: "24 Jul 2025" },
  { id: "102", title: "Hair & beard trim", status: "Awaiting feedback", date: "27 Jul 2025" },
  { id: "103", title: "Interview suit", status: "Completed", date: "29 Jul 2025" },
];

export default function HistoryPage() {
  return (
    <main className="route">
      <section className="py-12">
        <Container>
          <h1 className="text-3xl font-black">Your History</h1>
          <p className="text-zinc-300 mt-2">
            Previous requests and feedback.
          </p>

          <div className="grid gap-4 mt-8">
            {mock.map((item) => (
              <div key={item.id} className="card p-5 flex items-center justify-between">
                <div>
                  <div className="font-semibold">{item.title}</div>
                  <div className="text-sm text-zinc-400">
                    Status: {item.status} • {item.date}
                  </div>
                </div>
                <Link href={`/user/history/${item.id}`} className="text-[--accent] underline">
                  View
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
