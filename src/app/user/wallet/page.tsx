"use client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Container from "@/components/container";
import BackButton from "@/components/back-button";
import Modal from "@/components/modal";
import { useState } from "react";

export default function Wallet() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Navbar />
      <main className="route theme-user">
        <section className="py-10 space-y-6">
          <Container>
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black">Wallet</h2>
              <BackButton />
            </div>
            <div className="card flex items-center gap-4">
              <div className="text-zinc-300">Balance:</div>
              <div className="text-2xl font-bold">120 coins</div>
              <button onClick={()=>setOpen(true)} className="ml-auto btn-3d bg-[--accent] text-black rounded-full px-5 py-3 shadow-neon-user">
                Buy coins
              </button>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
      <Modal open={open} onClose={()=>setOpen(false)} title="Add coins">
        This is a simulation. Payment integration is not connected in this demo.
      </Modal>
    </>
  );
}
