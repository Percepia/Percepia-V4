// src/components/RaterGuidelinesModal.tsx
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function RaterGuidelinesModal() {
  // Persistent: open every visit
  const [open, setOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock background scroll while open
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  const onAcknowledge = () => setOpen(false);

  if (!open || !mounted) return null;

  // Render above everything, outside any stacking context
  return createPortal(
    <div
      className="fixed inset-0 z-[999999] bg-black/60 backdrop-blur-sm
                 flex items-start md:items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rater-guidelines-title"
    >
      <div className="w-full max-w-2xl rounded-2xl border border-white/15 bg-zinc-900/95 shadow-2xl">
        <div className="p-6">
          <h2 id="rater-guidelines-title" className="text-2xl font-bold text-white">
            Rater Guidelines
          </h2>
          <p className="text-zinc-300 mt-2">
            Please follow these rules when giving feedback. Keep it kind, actionable, and safe.
          </p>

          <div className="mt-4 max-h-[50vh] overflow-auto pr-1">
            <ul className="list-disc list-inside space-y-2 text-zinc-200">
              <li><span className="font-semibold">Be kind and respectful.</span> No insults, harassment, or mocking.</li>
              <li><span className="font-semibold">Be specific and actionable.</span> Suggest clear improvements (fit, color, framing, lighting, tone, etc.).</li>
              <li><span className="font-semibold">No NSFW or explicit content.</span> Follow platform safety policies.</li>
              <li><span className="font-semibold">Stay on-topic.</span> Focus only on what was requested.</li>
              <li><span className="font-semibold">Be honest, not harsh.</span> Balance positives with constructive tips.</li>
              <li><span className="font-semibold">Respect privacy.</span> Don’t ask for personal contact or identifiers.</li>
              <li><span className="font-semibold">Report problems.</span> Flag any unsafe or suspicious requests.</li>
            </ul>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={onAcknowledge}
              autoFocus
              className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              I have understood the guidelines
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
