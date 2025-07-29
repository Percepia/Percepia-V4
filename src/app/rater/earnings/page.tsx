"use client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Container from "@/components/container";
import BackButton from "@/components/back-button";
import Modal from "@/components/modal";
import { useState } from "react";

export default function Earnings() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Navbar />
      <main className="route theme-rater">
        <section className="py-10 space-y-6">
          <Container>
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black">Earnings</h2>
              <BackButton />
            </div>
            <div className="card flex items-center gap-4">
              <div className="text-zinc-300">Coins:</div>
              <div className="text-2xl font-bold">72</div>
              <button onClick={()=>setOpen(true)} className="ml-auto btn-3d bg-[--accent] text-black rounded-full px-5 py-3 shadow-neon-rater">
                Withdraw
              </button>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
      <Modal open={open} onClose={()=>setOpen(false)} title="Withdraw coins">
        You can swap coins for real money. (Payout methods are not connected in this demo.)
      </Modal>
    </>
  );
}
