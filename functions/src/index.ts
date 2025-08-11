import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

initializeApp();
const db = getFirestore();

// IMPORTANT: use your Firestore DB location
const REGION = "asia-south1" as const;

export const onRatingCreated = onDocumentCreated(
  {
    document: "users/{userId}/requests/{requestId}/ratings/{raterUid}",
    region: REGION,
  },
  async (event) => {
    const raterUid = String(event.params.raterUid);
    const data = (event.data?.data() as any) || {};

    const score = Number(data?.score ?? 0);
    const earned = Number(data?.earnedAED ?? 0);

    const lbRef = db.doc(`leaderboard_raters/${raterUid}`);
    const raterRef = db.doc(`users/${raterUid}`);

    await db.runTransaction(async (tx) => {
      const [lbSnap, raterSnap] = await Promise.all([tx.get(lbRef), tx.get(raterRef)]);

      const prev = lbSnap.exists
        ? (lbSnap.data() as any)
        : { ratingCount: 0, ratingSum: 0, avgRating: 0, earningsAED: 0 };

      const ratingCount = (prev.ratingCount || 0) + 1;
      const ratingSum = (prev.ratingSum || 0) + (isFinite(score) ? score : 0);
      const avgRating = ratingCount > 0 ? ratingSum / ratingCount : 0;
      const earningsAED = (prev.earningsAED || 0) + (isFinite(earned) ? earned : 0);

      const rater = raterSnap.exists ? (raterSnap.data() as any) : {};
      const displayName = prev.displayName ?? rater.name ?? "Rater";
      const avatarUrl = prev.avatarUrl ?? rater.avatarUrl ?? "";
      const specialty = prev.specialty ?? rater.specialty ?? "";

      tx.set(
        lbRef,
        {
          displayName,
          avatarUrl,
          specialty,
          ratingCount,
          ratingSum,
          avgRating,
          earningsAED,
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
    });
  }
);
