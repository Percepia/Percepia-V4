"use client";

import { useEffect, useMemo, useState } from "react";
import Container from "@/components/container";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  watchUserProfile,
  saveUserProfile,
  uploadUserAvatar,
  type UserProfile,
} from "@/lib/services/user-profile";

const ACCENT = "#46A2FF"; // blue

export default function UserProfilePage() {
  const [uid, setUid] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");   // editable for now
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const filePreview = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUid(u?.uid ?? null);
      setEmail(u?.email ?? "");
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (!uid) {
      setLoading(false);
      return;
    }
    const unsub = watchUserProfile(uid, (p: UserProfile | null) => {
      setName(p?.name ?? "");
      setBio(p?.bio ?? "");
      setAvatarUrl(p?.avatarUrl ?? null);
      setLoading(false);
    });
    return unsub;
  }, [uid]);

  useEffect(() => () => filePreview && URL.revokeObjectURL(filePreview), [filePreview]);

  async function onSave() {
    if (!uid) return;
    setLoading(true);
    try {
      let url = avatarUrl ?? undefined;
      if (file) {
        url = await uploadUserAvatar(uid, file);
        setFile(null);
      }
      await saveUserProfile(uid, { name, email, bio, avatarUrl: url });
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
          <p className="mt-2 text-zinc-300">Manage your details below.</p>

          <div className="card mt-8 grid max-w-xl gap-6 p-6">
            {/* Avatar + uploader (UI unchanged) */}
            <div className="flex items-center gap-5">
              <div className="h-24 w-24 rounded-full border border-white/20 bg-white/5 overflow-hidden grid place-items-center">
                {filePreview ? (
                  <img src={filePreview} alt="Preview" className="h-full w-full object-cover" />
                ) : avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
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
                  {file ? "Change photo" : avatarUrl ? "Change photo" : "Upload photo"}
                </label>
              </div>
            </div>

            <label>
              <span className="mb-1 block text-sm text-zinc-400">Name</span>
              <input className="input w-full" value={name} onChange={(e) => setName(e.target.value)} />
            </label>

            <label>
              <span className="mb-1 block text-sm text-zinc-400">Email</span>
              <input className="input w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>

            <label>
              <span className="mb-1 block text-sm text-zinc-400">Bio</span>
              <textarea
                className="input w-full min-h-[100px]"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Short bio..."
              />
            </label>

            <button
              onClick={onSave}
              disabled={loading}
              className="btn-3d btn-primary-3d w-fit rounded-full bg-[--accent] px-6 py-2 text-black"
            >
              {loading ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </Container>
      </section>
    </main>
  );
}
