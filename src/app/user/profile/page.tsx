"use client";

import { useState, useMemo } from "react";
import Container from "@/components/container";

const ACCENT = "#46A2FF"; // blue

export default function UserProfilePage() {
  const [file, setFile] = useState<File | null>(null);
  const fileUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  return (
    <main className="route" style={{ "--accent": ACCENT } as React.CSSProperties}>
      <section className="py-12">
        <Container>
          <h1 className="text-3xl font-black">Your Profile</h1>
          <p className="mt-2 text-zinc-300">Manage your details below.</p>

          <div className="card mt-8 grid max-w-xl gap-6 p-6">
            {/* Profile picture */}
            <div className="flex items-center gap-5">
              <div className="h-24 w-24 overflow-hidden rounded-full border border-white/20 bg-white/5 grid place-items-center">
                {fileUrl ? (
                  <img src={fileUrl} alt="Profile preview" className="h-full w-full object-cover" />
                ) : (
                  <svg width="40" height="40" viewBox="0 0 24 24" stroke="white" strokeWidth="1.8" fill="none">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c1.5-4 14.5-4 16 0" />
                  </svg>
                )}
              </div>

              <div>
                <input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                <label
                  htmlFor="avatar"
                  className="btn-3d btn-primary-3d cursor-pointer rounded-full bg-[--accent] px-4 py-2 text-sm font-semibold text-black"
                >
                  {file ? "Change photo" : "Upload photo"}
                </label>
              </div>
            </div>

            {/* Form fields */}
            <label>
              <span className="mb-1 block text-sm text-zinc-400">Name</span>
              <input className="input w-full" placeholder="John Doe" />
            </label>

            <label>
              <span className="mb-1 block text-sm text-zinc-400">Email</span>
              <input type="email" className="input w-full" placeholder="you@example.com" />
            </label>

            <label>
              <span className="mb-1 block text-sm text-zinc-400">Bio</span>
              <textarea className="input w-full min-h-[100px]" placeholder="Short bio..." />
            </label>

            <button className="btn-3d btn-primary-3d w-fit rounded-full bg-[--accent] px-6 py-2 text-black">
              Save Changes
            </button>
          </div>
        </Container>
      </section>
    </main>
  );
}
