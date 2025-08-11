// src/lib/services/profile-core.ts
import { db, storage } from "@/lib/firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export type Profile = {
  // existing
  name?: string;
  email?: string;
  bio?: string;
  avatarUrl?: string;
  specialty?: string;            // rater-only (optional)
  role?: "user" | "rater";

  // ⬇️ new fields used by onboarding
  onboarded?: boolean;
  dob?: string;                  // ISO date "YYYY-MM-DD"
  interests?: string[];
  pronouns?: string;
};

/** Realtime listener; returns unsubscribe */
export function watchProfile(uid: string, cb: (p: Profile | null) => void) {
  const d = doc(db, "users", uid);
  return onSnapshot(d, (snap) => cb((snap.data() as Profile) ?? null));
}

/** Merge-save */
export async function saveProfile(uid: string, data: Partial<Profile>) {
  const d = doc(db, "users", uid);
  await setDoc(d, data, { merge: true });
}

/** Upload avatar and return public URL */
export async function uploadAvatar(uid: string, file: File, who: "users" | "raters"): Promise<string> {
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const key = `avatars/${who}/${uid}/avatar-${Date.now()}.${ext}`;
  const r = ref(storage, key);
  await uploadBytes(r, file, { contentType: file.type });
  return getDownloadURL(r);
}
