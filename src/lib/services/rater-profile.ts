import { db, storage } from "@/lib/firebase";
import { doc, onSnapshot, setDoc, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export type RaterProfile = {
  name?: string;
  specialty?: string;
  bio?: string;
  avatarUrl?: string;
  avatarPath?: string;
  onboarded?: boolean;
  updatedAt?: any;
  createdAt?: any;
};

export function watchRaterProfile(uid: string, cb: (p: RaterProfile | null) => void) {
  const dref = doc(db, "users", uid);
  return onSnapshot(dref, (snap) => cb(snap.exists() ? (snap.data() as RaterProfile) : null));
}

export async function saveRaterProfile(uid: string, data: Partial<RaterProfile>) {
  const dref = doc(db, "users", uid);
  await setDoc(
    dref,
    { ...data, updatedAt: serverTimestamp(), createdAt: serverTimestamp() },
    { merge: true }
  );
}

export async function uploadRaterAvatar(uid: string, file: File) {
  const ext = (file.name.split(".").pop() || "bin").toLowerCase();
  const path = `avatars/users/${uid}/${Date.now()}.${ext}`;
  const obj = ref(storage, path);
  await uploadBytes(obj, file, {
    contentType: file.type,
    cacheControl: "public, max-age=31536000, immutable"
  });
  const url = await getDownloadURL(obj);
  await saveRaterProfile(uid, { avatarUrl: url, avatarPath: path });
  return url;
}
