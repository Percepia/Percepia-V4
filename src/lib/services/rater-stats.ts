import { db } from "@/lib/firebase";
import {
  collection,
  collectionGroup,
  doc,
  onSnapshot,
  query,
  where,
  Timestamp,
} from "firebase/firestore";

export type RaterStats = {
  pending: number;            // requests assigned to me & not finished
  totalRatings: number;       // from leaderboard doc
  earningsAED: number;        // sum of wallet transactions (credits - debits)
  avgResponseMinutes: number; // average time to first response
};

/**
 * Real-time stats for the rater dashboard.
 * Adjust collection names/fields at the CONFIG block if yours differ.
 */
export function watchRaterStats(
  uid: string,
  cb: (stats: RaterStats) => void
) {
  const CONFIG = {
    // Requests the rater sees/works on (top-level)
    requests: {
      col: "requests",
      raterField: "assignedTo",            // string uid
      statusField: "status",               // string
      activeStatuses: ["pending", "assigned", "in_progress"],
      assignedAtField: "assignedAt" as const,        // Timestamp
      firstResponseAtField: "firstResponseAt" as const, // Timestamp
      doneStatuses: ["completed", "closed"],
    },

    // Leaderboard doc written by Cloud Function (we added earlier)
    leaderboard: {
      col: "leaderboard_raters",
      countField: "count",                 // number
    },

    // Wallet transactions under the rater (credits & debits)
    wallet: {
      col: "wallet",
      sub: "transactions",
      amountField: "amount",               // number, positive for credit, negative for debit
      currencyField: "currency",           // "AED" (can be ignored if you only use AED)
      typeField: "type",                   // "earning" | "payout" | ...
    },

    // Optional: if you store responses separately and want a different source
    // leave this unused for now
    responses: {
      collectionGroupName: "responses",
      raterField: "raterId",
      requestIdField: "requestId",
      createdAtField: "createdAt" as const,
    },
  };

  const unsubs: Array<() => void> = [];

  // 1) Pending requests (real-time)
  {
    const qPending = query(
      collection(db, CONFIG.requests.col),
      where(CONFIG.requests.raterField, "==", uid),
      where(CONFIG.requests.statusField, "in", CONFIG.requests.activeStatuses)
    );
    unsubs.push(
      onSnapshot(qPending, (snap) => {
        _patch({ pending: snap.size });
      })
    );
  }

  // 2) Total ratings (real-time from leaderboard doc)
  {
    const dref = doc(db, CONFIG.leaderboard.col, uid);
    unsubs.push(
      onSnapshot(dref, (snap) => {
        const n = (snap.exists() ? (snap.data() as any)[CONFIG.leaderboard.countField] : 0) ?? 0;
        _patch({ totalRatings: Number(n) || 0 });
      })
    );
  }

  // 3) Earnings (sum wallet transactions)
  {
    const qTx = collection(db, CONFIG.wallet.col, uid, CONFIG.wallet.sub);
    unsubs.push(
      onSnapshot(qTx, (snap) => {
        let sum = 0;
        snap.forEach((d) => {
          const data = d.data() as any;
          const amt = Number(data[CONFIG.wallet.amountField]) || 0;
          sum += amt;
        });
        _patch({ earningsAED: sum });
      })
    );
  }

  // 4) Avg response time (assignedAt → firstResponseAt)
  {
    // Any request for this rater that has a firstResponseAt
    const qResp = query(
      collection(db, CONFIG.requests.col),
      where(CONFIG.requests.raterField, "==", uid),
      where(CONFIG.requests.firstResponseAtField, "!=", null)
    );
    unsubs.push(
      onSnapshot(qResp, (snap) => {
        let totalMinutes = 0;
        let n = 0;
        snap.forEach((d) => {
          const data = d.data() as any;
          const a: Timestamp | null = data[CONFIG.requests.assignedAtField] ?? null;
          const f: Timestamp | null = data[CONFIG.requests.firstResponseAtField] ?? null;
          if (a && f && a.toMillis && f.toMillis) {
            const mins = (f.toMillis() - a.toMillis()) / 60000;
            if (isFinite(mins) && mins >= 0) {
              totalMinutes += mins;
              n += 1;
            }
          }
        });
        _patch({ avgResponseMinutes: n ? totalMinutes / n : 0 });
      })
    );
  }

  // Local reducer to merge partials & emit
  let state: RaterStats = {
    pending: 0,
    totalRatings: 0,
    earningsAED: 0,
    avgResponseMinutes: 0,
  };

  function _patch(partial: Partial<RaterStats>) {
    state = { ...state, ...partial };
    cb(state);
  }

  return () => unsubs.forEach((u) => u());
}
