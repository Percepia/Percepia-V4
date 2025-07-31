import Container from "@/components/container";

export default function RaterHomePage() {
  return (
    <main className="route theme-rater">
      <section className="py-10">
        <Container>
          <h1 className="text-3xl font-black">Rater Dashboard</h1>
          <p className="text-zinc-300 mt-2">
            Welcome! This is a placeholder. Your ratings, earnings, and requests will appear here.
          </p>
        </Container>
      </section>
    </main>
  );
}
