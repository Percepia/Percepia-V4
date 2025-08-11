// src/lib/services/leaderboard.ts
import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  limit as qLimit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

export type LeaderboardRater = {
  uid: string;
  displayName: string;
  avatarUrl?: string;
  specialty?: string;
  ratingCount: number;     // total ratings done
  avgRating?: number;      // 0..5 (optional)
  earningsAED?: number;    // optional
  updatedAt?: any;
};

/** Realtime top raters (public) */
export function watchTopRaters(
  cb: (rows: LeaderboardRater[]) => void,
  opts?: { limit?: number; order?: "ratingCount" | "avgRating" }
) {
  const { limit = 50, order = "ratingCount" } = opts ?? {};
  const col = collection(db, "leaderboard_raters");
  const q = query(col, orderBy(order, "desc"), qLimit(limit));
  return onSnapshot(q, (snap) => {
    const rows = snap.docs.map((d) => ({ uid: d.id, ...(d.data() as Omit<LeaderboardRater, "uid">) }));
    cb(rows);
  });
}

/** Optional helper: publish/update a rater’s public entry (call from onboarding/profile) */
export async function publishRaterLeaderboardEntry(
  uid: string,
  data: Partial<LeaderboardRater>
) {
  const dref = doc(db, "leaderboard_raters", uid);
  await setDoc(
    dref,
    {
      displayName: data.displayName ?? "Rater",
      avatarUrl: data.avatarUrl ?? "",
      specialty: data.specialty ?? "",
      ratingCount: data.ratingCount ?? 0,
      avgRating: data.avgRating ?? 0,
      earningsAED: data.earningsAED ?? 0,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}
