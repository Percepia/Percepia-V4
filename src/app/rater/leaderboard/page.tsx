import BackButton from "@/components/back-button";

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
  { name: "Mateusz Kowalski", country: "PL", rating: 4.6, price: 9, slug: "mateusz-kowalski" },
  { name: "Ana Silva", country: "BR", rating: 4.7, price: 10, slug: "ana-silva" },
  { name: "Mei Lin", country: "CN", rating: 4.8, price: 11, slug: "mei-lin" },
  { name: "Omar Hassan", country: "EG", rating: 4.7, price: 10, slug: "omar-hassan" },
  { name: "Elena Popov", country: "RU", rating: 4.8, price: 11, slug: "elena-popov" },
  { name: "Nora Jónsdóttir", country: "IS", rating: 4.9, price: 12, slug: "nora-jonsdottir" },
  { name: "Arman Petrosyan", country: "AM", rating: 4.6, price: 9, slug: "arman-petrosyan" },
  { name: "Aisha Bello", country: "NG", rating: 4.7, price: 10, slug: "aisha-bello" },
  { name: "Seán O’Neill", country: "IE", rating: 4.8, price: 11, slug: "sean-oneill" },
  { name: "Khaled Mansour", country: "SA", rating: 4.7, price: 10, slug: "khaled-mansour" }
];

export default function Leaderboard(){
  return (
    <section className="py-10 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black">Leaderboard</h2>
        <BackButton/>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {raters.map((r) => (
          <div key={r.slug} className="card">
            <div className="font-bold">
              {r.name} <span className="text-xs text-zinc-400">({r.country})</span>
            </div>
            <div className="text-sm text-zinc-400">Rating {r.rating} • {r.price} coins</div>
            <a className="btn-3d glass mt-3 inline-block rounded-full px-4 py-2" href={`/rater/leaderboard/${r.slug}`}>
              View profile
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
