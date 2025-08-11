"use client";

import { useEffect, useMemo, useState } from "react";
import Container from "@/components/container";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  watchRaterProfile,
  saveRaterProfile,
  uploadRaterAvatar,
  type RaterProfile,
} from "@/lib/services/rater-profile";
import Image from "next/image";

const ACCENT = "#8CFF63"; // green

export default function RaterProfilePage() {
  const [uid, setUid] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [displayName, setDisplayName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const filePreview = useMemo<string | null>(() => (file ? URL.createObjectURL(file) : null), [file]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUid(u?.uid ?? null));
    return unsub;
  }, []);

  useEffect(() => {
    if (!uid) {
      setLoading(false);
      return;
    }
    const unsub = watchRaterProfile(uid, (p: RaterProfile | null) => {
      setDisplayName(p?.name ?? "");
      setSpecialty(p?.specialty ?? "");
      setBio(p?.bio ?? "");
      setAvatarUrl(p?.avatarUrl ?? null);
      setLoading(false);
    });
    return unsub;
  }, [uid]);

  useEffect(() => {
    if (!filePreview) return;
    return () => URL.revokeObjectURL(filePreview);
  }, [filePreview]);

  async function onSave() {
    if (!uid) return;
    setLoading(true);
    try {
      let url = avatarUrl ?? undefined;
      if (file) {
        url = await uploadRaterAvatar(uid, file);
        setFile(null);
      }
      await saveRaterProfile(uid, { name: displayName, specialty, bio, avatarUrl: url });
    } finally {
      setLoading(false);
    }
  }

  if (!uid) {
    return (
      <main className="route">
        <section className="py-12">
          <Container>
            <h1 className="text-3xl font-black">Your Profile</h1>
            <p className="mt-2 text-zinc-300">Please sign in to view your profile.</p>
          </Container>
        </section>
      </main>
    );
  }

  return (
    <main className="route" style={{ "--accent": ACCENT } as React.CSSProperties}>
      <section className="py-12">
        <Container>
          <h1 className="text-3xl font-black">Your Profile</h1>
          <p className="mt-2 text-zinc-300">Update your public rater profile.</p>

          <div className="card mt-8 grid max-w-xl gap-6 p-6">
            <div className="flex items-center gap-5">
              <div className="h-24 w-24 rounded-full overflow-hidden border border-white/20 bg-white/5 grid place-items-center">
                {filePreview ? (
                  <img src={filePreview} alt="Preview" className="h-full w-full object-cover" />
                ) : avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt="Avatar"
                    width={96}
                    height={96}
                    className="h-24 w-24 rounded-full object-cover"
                    priority
                  />
                ) : (
                  <svg width="40" height="40" viewBox="0 0 24 24" stroke="white" strokeWidth="1.8" fill="none">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c1.5-4 14.5-4 16 0" />
                  </svg>
                )}
              </div>

              <div>
                <input id="avatar" type="file" accept="image/*" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                <label htmlFor="avatar" className="btn-3d btn-primary-3d cursor-pointer rounded-full bg-[--accent] px-4 py-2 text-sm font-semibold text-black">
                  {file ? "Change photo" : avatarUrl ? "Change photo" : "Upload photo"}
                </label>
              </div>
            </div>

            <label>
              <span className="mb-1 block text-sm text-zinc-400">Display Name</span>
              <input className="input w-full" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
            </label>

            <label>
              <span className="mb-1 block text-sm text-zinc-400">Specialty</span>
              <input className="input w-full" value={specialty} onChange={(e) => setSpecialty(e.target.value)} placeholder="Style, Hair & Makeup…" />
            </label>

            <label>
              <span className="mb-1 block text-sm text-zinc-400">Bio</span>
              <textarea className="input w-full min-h-[100px]" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell users about yourself..." />
            </label>

            <button onClick={onSave} disabled={loading} className="btn-3d btn-primary-3d w-fit rounded-full bg-[--accent] px-6 py-2 text-black">
              {loading ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </Container>
      </section>
    </main>
  );
}
