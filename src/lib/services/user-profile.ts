import { db, storage } from "@/lib/firebase";
import { doc, onSnapshot, setDoc, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export type UserProfile = {
  name?: string;
  dob?: string;                      // ISO or YYYY-MM-DD
  pronouns?: string;
  interests?: string[] | string;
  role?: "user" | "rater";
  avatarUrl?: string;
  avatarPath?: string;
  onboarded?: boolean;
  updatedAt?: any;
  createdAt?: any;
};

export function watchUserProfile(uid: string, cb: (p: UserProfile | null) => void) {
  const dref = doc(db, "users", uid);
  return onSnapshot(dref, (snap) => cb(snap.exists() ? (snap.data() as UserProfile) : null));
}

export async function saveUserProfile(uid: string, data: Partial<UserProfile>) {
  const dref = doc(db, "users", uid);
  await setDoc(
    dref,
    { ...data, updatedAt: serverTimestamp(), createdAt: serverTimestamp() },
    { merge: true }
  );
}

export async function uploadUserAvatar(uid: string, file: File) {
  const ext = (file.name.split(".").pop() || "bin").toLowerCase();
  const path = `avatars/users/${uid}/${Date.now()}.${ext}`;
  const obj = ref(storage, path);
  await uploadBytes(obj, file, {
    contentType: file.type,
    // makes avatars cacheable and super fast on repeat views
    cacheControl: "public, max-age=31536000, immutable"
  });
  const url = await getDownloadURL(obj);
  await saveUserProfile(uid, { avatarUrl: url, avatarPath: path });
  return { url, path };
}
