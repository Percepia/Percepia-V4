// src/app/user/leaderboard/page.tsx
import Link from "next/link";

type Rater = {
  name: string;
  country: string;
  rating: number;
  price: number;
  slug: string;
};

const raters: Rater[] = [
  { name: "Aarav Sharma", country: "IN", rating: 4.6, price: 9, slug: "aarav-sharma" },
  { name: "Camille Dubois", country: "FR", rating: 4.7, price: 10, slug: "camille-dubois" },
  { name: "Diego Ramirez", country: "MX", rating: 4.8, price: 11, slug: "diego-ramirez" },
  { name: "Yuki Kobayashi", country: "JP", rating: 4.9, price: 12, slug: "yuki-kobayashi" },
  { name: "Layla Al-Farsi", country: "AE", rating: 4.7, price: 9, slug: "layla-al-farsi" },
  { name: "Noah Williams", country: "US", rating: 4.8, price: 10, slug: "noah-williams" },
  { name: "Zanele Mbeki", country: "ZA", rating: 4.9, price: 12, slug: "zanele-mbeki" },
  { name: "Fatima Zahra", country: "MA", rating: 4.7, price: 10, slug: "fatima-zahra" },
  { name: "Hans Müller", country: "DE", rating: 4.8, price: 11, slug: "hans-muller" },
  { name: "Sofia Rossi", country: "IT", rating: 4.9, price: 12, slug: "sofia-rossi" },
];

export default function Page() {
  return (
    <section className="py-10 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black">Leaderboard</h1>
        <Link href="/user" className="btn-3d glass rounded-full px-4 py-2">
          Back
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {raters.map((r) => (
          <div key={r.slug} className="card hover:shadow-neon transition-shadow">
            <div className="font-bold">
              {r.name}{" "}
              <span className="text-xs text-zinc-400">({r.country})</span>
            </div>
            <div className="text-sm text-zinc-400">
              Rating {r.rating} • {r.price} coins
            </div>
            <Link
              href={`/rater/${r.slug}`}
              className="btn-3d glass mt-3 inline-block rounded-full px-4 py-2"
            >
              View profile
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
