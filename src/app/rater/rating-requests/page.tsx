import Container from "@/components/container";
import BackButton from "@/components/back-button";
import Table from "@/components/table";

export default function RatingRequests() {
  const columns = ["User","Category","Media","Status"];
  const rows = [
    ["Kevin","Outfit check","Photo","New"],
    ["Mia","First impression","Voice","Pending"],
    ["Jamal","Grooming","Video","New"]
  ];
  return (
    <>
      <main className="route theme-rater">
        <section className="py-10 space-y-6">
          <Container>
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black">Rating Requests</h2>
              <BackButton />
            </div>
            <div className="card">
              <Table columns={columns} rows={rows} />
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
