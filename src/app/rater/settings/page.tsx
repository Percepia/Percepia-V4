import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Container from "@/components/container";
import BackButton from "@/components/back-button";

export default function Settings() {
  return (
    <>
      <Navbar />
      <main className="route theme-rater">
        <section className="py-10 space-y-6">
          <Container>
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black">Rater Settings</h2>
              <BackButton />
            </div>
            <div className="card grid gap-3">
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked />
                <span>Show in Outfit & Grooming categories</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked />
                <span>Enable notifications</span>
              </label>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
