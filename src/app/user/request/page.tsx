"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Route } from "next";
import Container from "@/components/container";
import { db } from "@/lib/firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  limit as qLimit,
} from "firebase/firestore";

type Step = 1 | 2 | 3 | 4;
type AssignMode = "auto" | "pick";

// 🔵 blue accent (same as user navbar)
const ACCENT = "#46A2FF";

const MAX_SIZE_MB = 100;
const ACCEPTED = "image/*,video/*,audio/*";

type TopRater = { uid: string; name?: string; count?: number };

export default function RequestWizardPage() {
  const router = useRouter();

  const [step, setStep] = useState<Step>(1);
  const [file, setFile] = useState<File | null>(null);
  const fileUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  const [assignMode, setAssignMode] = useState<AssignMode>("auto");
  const [chosenRater, setChosenRater] = useState("");

  const [coins, setCoins] = useState<number>(20);
  const [error, setError] = useState("");

  // 🔹 live top 3 raters (no dummies)
  const [topRaters, setTopRaters] = useState<TopRater[]>([]);
  useEffect(() => {
    const q = query(
      collection(db, "leaderboard_raters"),
      orderBy("count", "desc"),
      qLimit(3)
    );
    const stop = onSnapshot(q, (snap) => {
      const rows: TopRater[] = snap.docs.map((d) => {
        const data = d.data() as any;
        return {
          uid: d.id,
          name: data.name || data.displayName || undefined,
          count: typeof data.count === "number" ? data.count : 0,
        };
      });
      setTopRaters(rows);
    });
    return stop;
  }, []);

  const resetError = () => setError("");
  const clampStep = (n: number): Step => (n < 1 ? 1 : n > 4 ? 4 : (n as Step));
  const bytesToMB = (bytes: number) => Math.round((bytes / 1_048_576) * 10) / 10;

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    resetError();
    const f = e.target.files?.[0];
    if (!f) return;

    const sizeMB = bytesToMB(f.size);
    if (sizeMB > MAX_SIZE_MB) {
      setError(`File is too large (${sizeMB} MB). Max ${MAX_SIZE_MB} MB.`);
      e.target.value = "";
      return;
    }

    const ok = ["image/", "video/", "audio/"].some((p) => f.type.startsWith(p));
    if (!ok) {
      setError("Unsupported file type. Choose image, video, or audio.");
      e.target.value = "";
      return;
    }

    setFile(f);
  }

  const clearFile = () => (resetError(), setFile(null));
  const isImage = file?.type.startsWith("image/") ?? false;
  const isVideo = file?.type.startsWith("video/") ?? false;
  const isAudio = file?.type.startsWith("audio/") ?? false;

  function nextStep() {
    resetError();
    if (step === 1 && !file) return setError("Please select a media file.");
    if (step === 2 && (!title || title.trim().length < 3)) return setError("Add a short title.");
    if (step === 3) {
      if (assignMode === "pick") {
        if (topRaters.length === 0) return setError("No raters available right now. Try Auto-assign.");
        if (!chosenRater) return setError("Please pick a rater.");
      }
    }
    setStep((s) => clampStep(s + 1));
  }

  function prevStep() {
    resetError();
    step > 1 ? setStep((s) => clampStep(s - 1)) : router.back();
  }

  function submit() {
    resetError();
    if (!file) return setError("No file selected.");
    if (!title || title.trim().length < 3) return setError("Provide a valid title.");
    if (assignMode === "pick" && !chosenRater) return setError("Pick a rater.");
    router.push("/user/history" as Route);
  }

  return (
    <main className="route" style={{ "--accent": ACCENT } as React.CSSProperties}>
      <section className="py-12">
        <Container>
          <h1 className="text-3xl font-black">Ask a Rater</h1>
          <p className="text-zinc-300 mt-2">A quick four-step request: media → details → rater → review.</p>

          {/* step tracker */}
          <div className="mt-6 flex items-center gap-2 text-sm">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="flex items-center">
                <div
                  className={[
                    "h-8 w-8 rounded-full grid place-items-center border",
                    n <= step ? "bg-[--accent] text-black border-transparent" : "border-white/20 text-white/70"
                  ].join(" ")}
                >
                  {n}
                </div>
                {n < 4 && <div className="mx-2 h-[2px] w-10 bg-white/20" />}
              </div>
            ))}
          </div>

          {error && (
            <div className="mt-4 rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 text-red-200">
              {error}
            </div>
          )}

          {/* wizard card */}
          <div className="card mt-6 p-6">
            {/* STEP 1 — media */}
            {step === 1 && (
              <div className="grid gap-4">
                <p className="mb-2 text-sm text-zinc-400">
                  Select a media file (image / video / audio). Max {MAX_SIZE_MB} MB.
                </p>

                <div className="flex items-center gap-3">
                  <input id="mediaFile" type="file" accept={ACCEPTED} onChange={onSelectFile} className="hidden" />
                  <label
                    htmlFor="mediaFile"
                    className="btn-3d btn-primary-3d bg-[--accent] text-black px-5 py-2 rounded-full cursor-pointer"
                  >
                    {file ? "Choose a different file" : "Select a file"}
                  </label>
                  {file && (
                    <button
                      type="button"
                      onClick={clearFile}
                      className="btn-3d px-4 py-2 rounded-full border border-white/10"
                    >
                      Remove
                    </button>
                  )}
                </div>

                {file && (
                  <div className="mt-4 grid gap-3">
                    <p className="text-sm text-zinc-400">
                      Selected: <span className="text-zinc-200">{file.name}</span>{" "}
                      <span className="text-zinc-500">
                        ({file.type || "unknown"}, {bytesToMB(file.size)} MB)
                      </span>
                    </p>

                    <div className="rounded-lg border border-white/10 p-3">
                      {isImage && fileUrl && (
                        <img src={fileUrl} alt="Preview" className="max-h-80 w-auto rounded-md" />
                      )}
                      {isVideo && fileUrl && (
                        <video src={fileUrl} controls className="max-h-80 w-auto rounded-md" />
                      )}
                      {isAudio && fileUrl && <audio src={fileUrl} controls className="w-full" />}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 2 — details */}
            {step === 2 && (
              <div className="grid gap-6">
                <label>
                  <span className="mb-1 block text-sm text-zinc-400">Title</span>
                  <input
                    className="w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[--accent]"
                    placeholder="e.g., Outfit for interview"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </label>

                <label>
                  <span className="mb-1 block text-sm text-zinc-400">Notes for the rater</span>
                  <textarea
                    className="w-full min-h-[140px] resize-y rounded-md border border-white/20 bg-white/5 px-3 py-2 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[--accent]"
                    placeholder="What would you like feedback on?"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </label>
              </div>
            )}

            {/* STEP 3 — assignment */}
            {step === 3 && (
              <div className="grid gap-4">
                <p className="text-sm text-zinc-400">Assignment</p>

                <div className="flex flex-col gap-3 sm:flex-row">
                  {(["auto", "pick"] as AssignMode[]).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setAssignMode(mode)}
                      className={[
                        "px-5 py-2 rounded-full border",
                        assignMode === mode
                          ? "btn-3d btn-primary-3d bg-[--accent] text-black border-transparent"
                          : "border-white/10"
                      ].join(" ")}
                    >
                      {mode === "auto" ? "Auto-assign" : "Pick from leaderboard"}
                    </button>
                  ))}
                </div>

                {assignMode === "pick" && (
                  <div className="grid gap-2">
                    <label className="block">
                      <span className="mb-1 block text-sm text-zinc-400">Choose a rater</span>
                      <select
                        className="input"
                        value={chosenRater}
                        onChange={(e) => setChosenRater(e.target.value)}
                        disabled={topRaters.length === 0}
                      >
                        <option value="">{topRaters.length ? "Select…" : "No raters available"}</option>
                        {topRaters.map((r) => (
                          <option key={r.uid} value={r.uid}>
                            {(r.name && r.name.trim()) || `Rater ${r.uid.slice(0, 6)}`}{" "}
                            {typeof r.count === "number" ? `• ${r.count} ratings` : ""}
                          </option>
                        ))}
                      </select>
                    </label>

                    {topRaters.length === 0 && (
                      <div className="text-xs text-zinc-500">
                        No one on the leaderboard yet. You can still choose Auto-assign.
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* STEP 4 — review */}
            {step === 4 && (
              <div className="grid gap-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* summary */}
                  <div className="rounded-md border border-white/10 p-4">
                    <p className="text-sm text-zinc-400">Title</p>
                    <p className="font-semibold">{title || "—"}</p>

                    <p className="mt-3 text-sm text-zinc-400">Notes</p>
                    <p className="whitespace-pre-wrap break-words text-zinc-200">{notes || "—"}</p>
                  </div>

                  {/* assignment + coins */}
                  <div className="rounded-md border border-white/10 p-4">
                    <p className="text-sm text-zinc-400">Assignment</p>
                    <p className="font-semibold">
                      {assignMode === "auto"
                        ? "Auto-assign"
                        : chosenRater
                        ? (topRaters.find((r) => r.uid === chosenRater)?.name || `Rater ${chosenRater.slice(0, 6)}`)
                        : "—"}
                    </p>

                    <div className="mt-4">
                      <p className="mb-1 text-sm text-zinc-400">Coins to spend</p>
                      <input
                        type="number"
                        min={5}
                        step={5}
                        className="input w-40"
                        value={coins}
                        onChange={(e) => setCoins(Math.max(0, Number(e.target.value)))}
                      />
                      <p className="mt-1 text-xs text-zinc-500">Minimum suggested: 10 coins.</p>
                    </div>
                  </div>
                </div>

                {fileUrl && (
                  <div className="rounded-md border border-white/10 p-4">
                    <p className="mb-2 text-sm text-zinc-400">Media preview</p>
                    <div className="overflow-hidden rounded-md">
                      {isImage && <img src={fileUrl} alt="Preview" className="max-h-80 w-auto" />}
                      {isVideo && <video src={fileUrl} controls className="max-h-80 w-auto" />}
                      {isAudio && <audio src={fileUrl} controls className="w-full" />}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* nav buttons */}
          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={prevStep}
              className="btn-3d rounded-full border border-white/10 px-5 py-2"
            >
              Back
            </button>

            {step < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="btn-3d btn-primary-3d rounded-full bg-[--accent] px-6 py-2 text-black"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={submit}
                className="btn-3d btn-primary-3d rounded-full bg-[--accent] px-6 py-2 text-black"
              >
                Submit
              </button>
            )}
          </div>
        </Container>
      </section>
    </main>
  );
}
