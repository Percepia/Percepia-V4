import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Container from "@/components/container";
import BackButton from "@/components/back-button";
import Table from "@/components/table";

export default function History() {
  const columns = ["Date","Topic","Rater","Status"];
  const rows = [
    ["2025-07-01","Outfit check","Camille Dubois","Completed"],
    ["2025-07-05","First impression","Aarav Sharma","Completed"],
    ["2025-07-10","Grooming","Diego Ramirez","Pending"],
  ];
  return (
    <>
      <Navbar />
      <main className="route theme-user">
        <section className="py-10 space-y-6">
          <Container>
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black">History</h2>
              <BackButton />
            </div>
            <div className="card">
              <Table columns={columns} rows={rows} />
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
