"use client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Container from "@/components/container";
import BackButton from "@/components/back-button";
import Modal from "@/components/modal";
import { useState } from "react";

const sampleRaters = [
  { id: 1, name: "Camille Dubois", price: 10, rating: 4.7 },
  { id: 2, name: "Aarav Sharma", price: 9, rating: 4.6 },
  { id: 3, name: "Diego Ramirez", price: 11, rating: 4.8 },
  { id: 4, name: "Yuki Kobayashi", price: 12, rating: 4.9 },
];

export default function NewRequest() {
  const [selected, setSelected] = useState<number | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [voice, setVoice] = useState<File | null>(null);
  const [open, setOpen] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    <>
      <Navbar />
      <main className="route theme-user">
        <section className="py-10 space-y-6">
          <Container>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-3xl font-black">Ask a Rater</h2>
              <BackButton />
            </div>

            <form onSubmit={submit} className="grid md:grid-cols-2 gap-6">
              <div className="card">
                <div className="card-title">Select a rater</div>
                <div className="card-sub mb-3">Leaderboard pricing based on community ratings.</div>
                <div className="grid gap-2">
                  {sampleRaters.map(r => (
                    <label key={r.id} className="flex items-center gap-3 glass rounded-xl p-3 cursor-pointer">
                      <input type="radio" name="rater" onChange={()=>setSelected(r.id)} checked={selected===r.id} />
                      <div className="flex-1">
                        <div className="font-semibold">{r.name}</div>
                        <div className="text-xs text-zinc-400">Rating {r.rating} • {r.price} coins</div>
                      </div>
                    </label>
                  ))}
                </div>
                <button type="submit" className="mt-4 btn-3d bg-[--accent] text-black rounded-full px-5 py-3 shadow-neon-user">
                  Continue
                </button>
              </div>

              <div className="card grid gap-3">
                <div className="card-title">Upload media</div>
                <div className="grid gap-2">
                  <div>
                    <label className="text-sm text-zinc-300">Photo</label>
                    <input onChange={(e)=>setPhoto(e.target.files?.[0]??null)} type="file" accept="image/*" className="block w-full mt-1" />
                    {photo && <div className="text-xs text-zinc-400 mt-1">Selected: {photo.name}</div>}
                  </div>
                  <div>
                    <label className="text-sm text-zinc-300">Video</label>
                    <input onChange={(e)=>setVideo(e.target.files?.[0]??null)} type="file" accept="video/*" className="block w-full mt-1" />
                    {video && <div className="text-xs text-zinc-400 mt-1">Selected: {video.name}</div>}
                  </div>
                  <div>
                    <label className="text-sm text-zinc-300">Voice note</label>
                    <input onChange={(e)=>setVoice(e.target.files?.[0]??null)} type="file" accept="audio/*" className="block w-full mt-1" />
                    {voice && <div className="text-xs text-zinc-400 mt-1">Selected: {voice.name}</div>}
                  </div>
                </div>
              </div>
            </form>
          </Container>
        </section>
      </main>
      <Footer />
      <Modal open={open} onClose={()=>setOpen(false)} title="Submitted">
        We’ll notify you when the rater responds.
      </Modal>
    </>
  );
}
