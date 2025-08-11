"use client";

import { useEffect, useState } from "react";
import Container from "@/components/container";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  type Timestamp,
} from "firebase/firestore";
import Link from "next/link";

type Media = {
  url: string;
  path: string;
  name: string;
  size: number;
  contentType: string;
};

type ReqDoc = {
  title: string;
  notes: string;
  assignMode: "auto" | "pick";
  chosenRater: string | null;
  coins: number;
  media: Media | null;
  status: "pending" | "assigned" | "completed";
  createdAt?: Timestamp | null;
};

type ReqItem = ReqDoc & { id: string };

function fmt(ts?: Timestamp | null) {
  if (!ts) return "—";
  try {
    const d = ts.toDate();
    return d.toLocaleString();
  } catch {
    return "—";
  }
}

function StatusBadge({ status }: { status: ReqDoc["status"] }) {
  const map: Record<ReqDoc["status"], string> = {
    pending: "bg-yellow-500/20 text-yellow-200 border-yellow-500/30",
    assigned: "bg-blue-500/20 text-blue-200 border-blue-500/30",
    completed: "bg-green-500/20 text-green-200 border-green-500/30",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs ${map[status]}`}>
      {status}
    </span>
  );
}

export default function UserHistoryPage() {
  const [uid, setUid] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<ReqItem[]>([]);

  // Track auth
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUid(u?.uid ?? null));
    return unsub;
  }, []);

  // Subscribe to requests for this user
  useEffect(() => {
    if (!uid) {
      setItems([]);
      setLoading(false);
      return;
    }
    const q = query(
      collection(db, "users", uid, "requests"),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, (snap) => {
      const next: ReqItem[] = snap.docs.map((d) => ({ id: d.id, ...(d.data() as ReqDoc) }));
      setItems(next);
      setLoading(false);
    });
    return unsub;
  }, [uid]);

  // UI
  if (!uid) {
    return (
      <main className="route">
        <section className="py-12">
          <Container>
            <h1 className="text-3xl font-black">History</h1>
            <p className="mt-2 text-zinc-300">Please sign in to view your requests.</p>
          </Container>
        </section>
      </main>
    );
  }

  return (
    <main className="route">
      <section className="py-12">
        <Container>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-black">History</h1>
            <Link href="/user/request" className="btn-3d rounded-full border border-white/10 px-4 py-2 text-sm">
              New request
            </Link>
          </div>
          <p className="mt-2 text-zinc-300">Your past requests and their status.</p>

          {/* Empty state */}
          {!loading && items.length === 0 && (
            <div className="card mt-8 p-6 text-center">
              <p className="text-zinc-300">No requests yet.</p>
              <Link
                href="/user/request"
                className="mt-4 inline-flex rounded-full border border-white/10 px-5 py-2"
              >
                Create your first request
              </Link>
            </div>
          )}

          {/* Loading skeleton */}
          {loading && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="card p-4 animate-pulse">
                  <div className="h-40 rounded-md bg-white/5" />
                  <div className="mt-3 h-4 w-1/2 bg-white/10 rounded" />
                  <div className="mt-2 h-3 w-1/3 bg-white/10 rounded" />
                </div>
              ))}
            </div>
          )}

          {/* Grid */}
          {!loading && items.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
              {items.map((r) => {
                const type = r.media?.contentType || "";
                const isImage = type.startsWith("image/");
                const isVideo = type.startsWith("video/");
                const isAudio = type.startsWith("audio/");
                return (
                  <div key={r.id} className="card overflow-hidden">
                    {/* Media preview */}
                    <div className="border-b border-white/10">
                      <div className="h-44 w-full overflow-hidden">
                        {isImage && r.media?.url && (
                          <img
                            src={r.media.url}
                            alt={r.media.name || "media"}
                            className="h-44 w-full object-cover"
                          />
                        )}
                        {isVideo && r.media?.url && (
                          <video
                            src={r.media.url}
                            controls
                            className="h-44 w-full object-cover"
                          />
                        )}
                        {isAudio && r.media?.url && (
                          <div className="p-3">
                            <audio src={r.media.url} controls className="w-full" />
                          </div>
                        )}
                        {!r.media?.url && (
                          <div className="h-44 grid place-items-center text-zinc-500">
                            No media
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="font-semibold truncate">{r.title || "Untitled"}</div>
                        <StatusBadge status={r.status} />
                      </div>

                      <div className="mt-1 text-xs text-zinc-400">{fmt(r.createdAt)}</div>

                      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                        <div className="rounded-md border border-white/10 p-2">
                          <div className="text-xs text-zinc-400">Assignment</div>
                          <div className="truncate">
                            {r.assignMode === "auto" ? "Auto-assign" : r.chosenRater || "—"}
                          </div>
                        </div>
                        <div className="rounded-md border border-white/10 p-2">
                          <div className="text-xs text-zinc-400">Coins</div>
                          <div className="font-medium">{r.coins ?? 0}</div>
                        </div>
                      </div>

                      {r.notes && (
                        <div className="mt-3">
                          <div className="text-xs text-zinc-400">Notes</div>
                          <p className="line-clamp-2 text-sm text-zinc-200">{r.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
