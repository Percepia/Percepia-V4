"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Container from "@/components/container";
import { auth } from "@/lib/firebase";
import { watchRequestsForRater, type RequestItem } from "@/lib/services/requests";

const ACTIVE = ["pending", "assigned", "in_progress"];

function StatusBadge({ s }: { s?: string }) {
  const map: Record<string, string> = {
    pending: "bg-yellow-400/15 text-yellow-300 border-yellow-300/30",
    assigned: "bg-blue-400/15 text-blue-300 border-blue-300/30",
    in_progress: "bg-purple-400/15 text-purple-300 border-purple-300/30",
  };
  const cls = map[s || ""] || "bg-white/5 text-white/70 border-white/10";
  return <span className={`rounded-full border px-2 py-0.5 text-xs ${cls}`}>{s || "—"}</span>;
}

function MediaThumb({ url, type }: { url?: string; type?: string }) {
  if (!url) return <div className="h-16 w-16 rounded-md bg-white/5 border border-white/10" />;
  if (type?.startsWith("image/")) {
    return (
      <Image
        src={url}
        alt="media"
        width={64}
        height={64}
        className="h-16 w-16 rounded-md object-cover border border-white/10"
        // remove 'unoptimized' after next.config hosts are active
        unoptimized
      />
    );
  }
  if (type?.startsWith("video/")) {
    return <div className="h-16 w-16 rounded-md grid place-items-center bg-white/5 border border-white/10">🎥</div>;
  }
  if (type?.startsWith("audio/")) {
    return <div className="h-16 w-16 rounded-md grid place-items-center bg-white/5 border border-white/10">🎧</div>;
  }
  return <div className="h-16 w-16 rounded-md bg-white/5 border border-white/10" />;
}

export default function RaterRequestsPage() {
  const [items, setItems] = useState<RequestItem[]>([]);

  useEffect(() => {
    const u = auth.currentUser;
    if (!u) return;
    const stop = watchRequestsForRater(u.uid, ACTIVE, setItems);
    return stop;
  }, []);

  return (
    <main className="route theme-rater">
      <section className="py-10">
        <Container>
          <h1 className="text-3xl font-black">Requests</h1>
          <p className="text-zinc-300 mt-2">What’s currently assigned to you.</p>

          {items.length === 0 ? (
            <div className="card mt-6 p-6 text-zinc-400">No active requests right now.</div>
          ) : (
            <div className="mt-6 grid gap-3">
              {items.map(({ id, data }) => (
                <div key={id} className="card p-4 flex items-center gap-4">
                  <MediaThumb url={data.mediaUrl} type={data.mediaType} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold truncate">{data.title || "Untitled request"}</div>
                      <StatusBadge s={data.status} />
                    </div>
                    <div className="text-sm text-zinc-400 mt-0.5">
                      {data.coins ? `${data.coins} coins • ` : ""} submitted{" "}
                      {data.submittedAt ? new Date(data.submittedAt.toMillis()).toLocaleString() : "—"}
                    </div>
                  </div>

                  {/* If you already have a details page, this link will work.
                      Otherwise leave it or remove; no routing changes required. */}
                  {/* <Link href={`/rater/requests/${id}`} className="btn-3d px-3 py-1.5 rounded-full border border-white/10">
                    Open
                  </Link> */}
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
