"use client";

import { useEffect, useMemo, useState } from "react";
import Container from "@/components/container";
import { auth } from "@/lib/firebase";
import {
  saveUserProfile,
  uploadUserAvatar,
  watchUserProfile,
  type UserProfile,
} from "@/lib/services/user-profile";
import Image from "next/image";

const ACCENT = "#46A2FF";

export default function UserProfilePage() {
  const [uid, setUid] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const filePreview = useMemo<string | null>(() => (file ? URL.createObjectURL(file) : null), [file]);

  useEffect(() => {
    const u = auth.currentUser;
    setUid(u?.uid ?? null);
    if (!u) return;
    const stop = watchUserProfile(u.uid, (p) => {
      setProfile(p);
      setName(p?.name || "");
      setDob(p?.dob || "");
      setPronouns(p?.pronouns || "");
    });
    return stop;
  }, []);

  useEffect(() => {
    if (!filePreview) return;
    return () => URL.revokeObjectURL(filePreview);
  }, [filePreview]);

  async function onPickAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f || !uid) return;
    try {
      setBusy(true);
      await uploadUserAvatar(uid, f);
      setFile(null);
      setMsg("Profile picture updated.");
    } catch (e: any) {
      setMsg(e?.message || "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  async function onSave() {
    if (!uid) return;
    try {
      setBusy(true);
      await saveUserProfile(uid, { name: name.trim(), dob: dob.trim(), pronouns: pronouns.trim() });
      setMsg("Profile saved.");
    } catch (e: any) {
      setMsg(e?.message || "Save failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="route" style={{ "--accent": ACCENT } as React.CSSProperties}>
      <section className="py-12">
        <Container>
          <h1 className="text-3xl font-black">Your profile</h1>
          <p className="text-zinc-300 mt-2">Update your picture and details.</p>

          {msg && <div className="mt-4 rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm">{msg}</div>}

          <div className="card mt-6 p-6 grid gap-6 md:grid-cols-[160px_1fr]">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-3">
              <div className="h-36 w-36 rounded-full overflow-hidden border border-white/10">
                {filePreview ? (
                  <img src={filePreview} alt="Preview" className="h-full w-full object-cover" />
                ) : (
                  <Image
                    src={profile?.avatarUrl || "/avatar-placeholder.png"}
                    alt="avatar"
                    width={144}
                    height={144}
                    className="h-36 w-36 rounded-full object-cover"
                    priority
                  />
                )}
              </div>

              <label className="btn-3d btn-primary-3d bg-[--accent] text-black rounded-full px-4 py-2 cursor-pointer">
                Change photo
                <input type="file" accept="image/*" className="hidden" onChange={onPickAvatar} disabled={busy} />
              </label>
            </div>

            {/* Details */}
            <div className="grid gap-4">
              <label>
                <div className="text-sm text-zinc-400 mb-1">Name</div>
                <input
                  className="input"
                  placeholder="How should we call you?"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={busy}
                />
              </label>
              <label>
                <div className="text-sm text-zinc-400 mb-1">Date of birth</div>
                <input type="date" className="input" value={dob} onChange={(e) => setDob(e.target.value)} disabled={busy} />
              </label>
              <label>
                <div className="text-sm text-zinc-400 mb-1">Pronouns (optional)</div>
                <input
                  className="input"
                  placeholder="she/her, he/him, they/them…"
                  value={pronouns}
                  onChange={(e) => setPronouns(e.target.value)}
                  disabled={busy}
                />
              </label>

              <div className="pt-2">
                <button onClick={onSave} disabled={busy} className="btn-3d btn-primary-3d bg-[--accent] text-black rounded-full px-6 py-2">
                  {busy ? "Saving…" : "Save changes"}
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
