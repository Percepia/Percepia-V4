import { db } from "@/lib/firebase";
import {
  Timestamp,
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

export type WalletTx = {
  amount: number;          // +credit (earn/buy), -debit (spend/payout)
  type?: string;           // "earning" | "purchase" | "spend" | "payout" | ...
  note?: string;
  currency?: string;       // default "AED"
  createdAt?: Timestamp;
};

export type WalletItem = { id: string; data: WalletTx };
export type WalletSnapshot = { balance: number; items: WalletItem[] };

/** Real-time wallet for a user/rater (same path for both). */
export function watchWallet(uid: string, cb: (s: WalletSnapshot) => void) {
  const col = collection(db, "wallet", uid, "transactions");
  const q = query(col, orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => {
    const items: WalletItem[] = snap.docs.map((d) => ({
      id: d.id,
      data: d.data() as WalletTx,
    }));
    const balance = items.reduce((sum, it) => sum + (Number(it.data.amount) || 0), 0);
    cb({ balance, items });
  });
}

/** Optional helper for seeding/testing (not used by UI). */
export async function addWalletTx(uid: string, tx: Partial<WalletTx>) {
  const col = collection(db, "wallet", uid, "transactions");
  await addDoc(col, {
    amount: 0,
    currency: "AED",
    createdAt: serverTimestamp(),
    ...tx,
  });
}
