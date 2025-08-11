import { db } from "@/lib/firebase";
import {
  Timestamp,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

export type RequestDoc = {
  title?: string;
  mediaUrl?: string;                 // storage download URL (image/video/audio)
  mediaType?: string;                // "image/*", "video/*", "audio/*"
  coins?: number;
  status?: string;                   // "pending" | "assigned" | "in_progress" | "completed" | "closed" | ...
  submittedAt?: Timestamp;
  assignedAt?: Timestamp;
  firstResponseAt?: Timestamp;
  completedAt?: Timestamp;
  userId?: string;
  assignedTo?: string;
};

export type RequestItem = { id: string; data: RequestDoc };

/** Real-time list of this rater’s requests; client-filters by status set. */
export function watchRequestsForRater(
  uid: string,
  statuses: string[],
  cb: (items: RequestItem[]) => void
) {
  const q = query(
    collection(db, "requests"),
    where("assignedTo", "==", uid),
    orderBy("submittedAt", "desc")
  );

  return onSnapshot(q, (snap) => {
    const all: RequestItem[] = snap.docs.map((d) => ({ id: d.id, data: d.data() as RequestDoc }));
    const filtered = all.filter((r) => (r.data.status ? statuses.includes(r.data.status) : false));
    cb(filtered);
  });
}
