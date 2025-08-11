// src/lib/services/user-requests.ts
import { auth, db, storage } from "@/lib/firebase";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export type AssignMode = "auto" | "pick";

type SavedMedia = {
  url: string;
  path: string;
  name: string;
  size: number;
  contentType: string;
};

export async function saveNewUserRequest(args: {
  title: string;
  notes: string;
  assignMode: AssignMode;
  chosenRater?: string;
  coins: number;
  file?: File | null;
}) {
  const user = auth.currentUser;
  if (!user) throw new Error("You must be signed in.");
  const uid = user.uid;

  // Create a new request doc id under the user
  const reqRef = doc(collection(db, "users", uid, "requests"));
  const requestId = reqRef.id;

  let media: SavedMedia | null = null;

  if (args.file) {
    const f = args.file;
    const ext = (f.name.split(".").pop() || "bin").toLowerCase();
    const path = `requests/users/${uid}/${requestId}/${Date.now()}.${ext}`;
    const objRef = ref(storage, path);
    await uploadBytes(objRef, f, { contentType: f.type });
    const url = await getDownloadURL(objRef);

    media = {
      url,
      path,
      name: f.name,
      size: f.size,
      contentType: f.type || "application/octet-stream",
    };
  }

  const payload = {
    title: args.title.trim(),
    notes: args.notes.trim(),
    assignMode: args.assignMode,
    chosenRater:
      args.assignMode === "pick" && args.chosenRater ? args.chosenRater : null,
    coins: Number(args.coins) || 0,
    media,               // null if no file
    status: "pending",   // future: assigned/completed
    createdAt: serverTimestamp(),
  };

  await setDoc(reqRef, payload, { merge: false });
  return { requestId };
}
