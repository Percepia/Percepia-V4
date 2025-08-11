"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Container from "@/components/container";
import { auth } from "@/lib/firebase";
import { watchRequestsForRater, type RequestItem } from "@/lib/services/requests";

const DONE = ["completed", "closed"];

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

export default function RaterHistoryPage() {
  const [items, setItems] = useState<RequestItem[]>([]);

  useEffect(() => {
    const u = auth.currentUser;
    if (!u) return;
    const stop = watchRequestsForRater(u.uid, DONE, setItems);
    return stop;
  }, []);

  return (
    <main className="route theme-rater">
      <section className="py-10">
        <Container>
          <h1 className="text-3xl font-black">History</h1>
          <p className="text-zinc-300 mt-2">Your completed requests.</p>

          {items.length === 0 ? (
            <div className="card mt-6 p-6 text-zinc-400">No completed requests yet.</div>
          ) : (
            <div className="mt-6 grid gap-3">
              {items.map(({ id, data }) => (
                <div key={id} className="card p-4 flex items-center gap-4">
                  <MediaThumb url={data.mediaUrl} type={data.mediaType} />
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold truncate">{data.title || "Untitled request"}</div>
                    <div className="text-sm text-zinc-400 mt-0.5">
                      {data.coins ? `${data.coins} coins • ` : ""} completed{" "}
                      {data.completedAt
                        ? new Date(data.completedAt.toMillis()).toLocaleString()
                        : data.submittedAt
                        ? new Date(data.submittedAt.toMillis()).toLocaleString()
                        : "—"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
