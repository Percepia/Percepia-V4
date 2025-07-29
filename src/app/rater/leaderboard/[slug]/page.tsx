import BackButton from "@/components/back-button";

export default function RaterProfile({ params }:{ params: { slug: string } }){
  const name = params.slug.replace(/-/g," ").replace(/\b\w/g,(m)=>m.toUpperCase());
  return (
    <section className="py-10 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black">{name}</h2>
        <BackButton/>
      </div>
      <div className="card space-y-2">
        <div className="text-zinc-300">Expertise: Outfit, Grooming, First impressions</div>
        <div className="text-zinc-300">Rating: 4.8/5</div>
        <a className="btn-3d bg-[--accent] text-black rounded-full px-5 py-3 inline-block" href="/user/request">
          Request feedback
        </a>
      </div>
    </section>
  );
}
