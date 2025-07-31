import Container from "@/components/container";
import BackButton from "@/components/back-button";

export default function Guidelines() {
  return (
    <>
      <main className="route theme-rater">
        <section className="py-10 space-y-6">
          <Container>
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black">Guidelines for Raters</h2>
              <BackButton />
            </div>
            <div className="card text-zinc-300 space-y-2">
              <p>• Be kind, honest, and constructive. No rudeness.</p>
              <p>• Do not exchange phone numbers or contact details.</p>
              <p>• Keep all conversation within Percepia.</p>
              <p>• Celebrate uniqueness and build confidence.</p>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
