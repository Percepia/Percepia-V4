"use client";
import { useEffect } from "react";

export default function Modal({ open, onClose, title, children }:{ open:boolean, onClose:()=>void, title:string, children: React.ReactNode }) {
  useEffect(()=>{
    const onEsc = (e: KeyboardEvent)=>{ if(e.key === "Escape") onClose(); };
    if(open) document.addEventListener("keydown", onEsc);
    return ()=>document.removeEventListener("keydown", onEsc);
  }, [open, onClose]);
  if(!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70">
      <div className="glass rounded-2xl p-6 w-[min(520px,92vw)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">{title}</h3>
          <button onClick={onClose} className="rounded-full px-3 py-1 glass">✕</button>
        </div>
        <div className="text-zinc-200">{children}</div>
      </div>
    </div>
  );
}
