// src/lib/services/wallet.ts
import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  addDoc,
  type Timestamp,
} from "firebase/firestore";

export type WalletDoc = { balance: number; updatedAt?: any; createdAt?: any };
export type Txn = {
  id: string;
  amount: number;                 // positive numbers; sign handled by type
  type: "credit" | "debit";
  note?: string;
  createdAt?: Timestamp | null;
};

export function watchWallet(uid: string, cb: (w: WalletDoc | null) => void) {
  const wref = doc(db, "users", uid, "wallet", "default");
  return onSnapshot(wref, (snap) =>
    cb(snap.exists() ? (snap.data() as WalletDoc) : null)
  );
}

export function watchTransactions(
  uid: string,
  cb: (rows: Txn[]) => void,
  limit = 20
) {
  const q = query(
    collection(db, "users", uid, "wallet", "default", "txns"),
    orderBy("createdAt", "desc")
  );
  return onSnapshot(q, (snap) =>
    cb(
      snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Txn, "id">) }))
    )
  );
}

/** Example helpers you can call later from buy/earn flows */
export async function credit(uid: string, amount: number, note?: string) {
  await runTransaction(db, async (tx) => {
    const wref = doc(db, "users", uid, "wallet", "default");
    const snap = await tx.get(wref);
    const prev = snap.exists() ? snap.data()! : { balance: 0 };
    const balance = Number(prev.balance || 0) + Math.abs(amount);

    tx.set(
      wref,
      { balance, updatedAt: serverTimestamp(), createdAt: serverTimestamp() },
      { merge: true }
    );

    const tref = collection(db, "users", uid, "wallet", "default", "txns");
    tx.set(doc(tref), {
      amount: Math.abs(amount),
      type: "credit",
      note: note || "Credit",
      createdAt: serverTimestamp(),
    });
  });
}

export async function debit(uid: string, amount: number, note?: string) {
  await runTransaction(db, async (tx) => {
    const wref = doc(db, "users", uid, "wallet", "default");
    const snap = await tx.get(wref);
    const prev = snap.exists() ? snap.data()! : { balance: 0 };
    const balance = Math.max(0, Number(prev.balance || 0) - Math.abs(amount));

    tx.set(
      wref,
      { balance, updatedAt: serverTimestamp(), createdAt: serverTimestamp() },
      { merge: true }
    );

    const tref = collection(db, "users", uid, "wallet", "default", "txns");
    tx.set(doc(tref), {
      amount: Math.abs(amount),
      type: "debit",
      note: note || "Debit",
      createdAt: serverTimestamp(),
    });
  });
}
