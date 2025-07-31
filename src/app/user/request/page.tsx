"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Route } from "next";
import Container from "@/components/container";

type Step = 1 | 2 | 3 | 4;
type AssignMode = "auto" | "pick";

const MAX_SIZE_MB = 100;
const ACCEPTED = "image/*,video/*,audio/*";

const SAMPLE_RATERS = [
  { id: "alexandra", name: "Alexandra • Top 1%" },
  { id: "jamal", name: "Jamal • Fashion" },
  { id: "mina", name: "Mina • Hair & Makeup" }
];

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

  const resetError = () => setError("");

  const clampStep = (n: number): Step => {
    if (n < 1) return 1;
    if (n > 4) return 4;
    return n as Step;
  };

  function bytesToMB(bytes: number) {
    return Math.round((bytes / (1024 * 1024)) * 10) / 10;
  }

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    resetError();
    const f = e.target.files?.[0];
    if (!f) return;

    const sizeMB = bytesToMB(f.size);
    if (sizeMB > MAX_SIZE_MB) {
      setError("File is too large (" + sizeMB + " MB). Max allowed is " + MAX_SIZE_MB + " MB.");
      e.target.value = "";
      return;
    }

    const t = f.type || "";
    const ok =
      t.startsWith("image/") ||
      t.startsWith("video/") ||
      t.startsWith("audio/");
    if (!ok) {
      setError("Unsupported file type. Please choose an image, video, or audio file.");
      e.target.value = "";
      return;
    }

    setFile(f);
  }

  function clearFile() {
    resetError();
    setFile(null);
  }

  function nextStep() {
    resetError();
    if (step === 1 && !file) {
      setError("Please select a media file to continue.");
      return;
    }
    if (step === 2 && (!title || title.trim().length < 3)) {
      setError("Add a short title (at least 3 characters).");
      return;
    }
    if (step === 3 && assignMode === "pick" && !chosenRater) {
      setError("Please select a rater or choose Auto-assign.");
      return;
    }
    setStep((s) => clampStep(s + 1));
  }

  function prevStep() {
    resetError();
    if (step > 1) {
      setStep((s) => clampStep(s - 1));
    } else {
      router.back();
    }
  }

  async function submit() {
    resetError();
    if (!file) {
      setError("No file selected.");
      return;
    }
    if (!title || title.trim().length < 3) {
      setError("Please provide a valid title.");
      return;
    }
    if (assignMode === "pick" && !chosenRater) {
      setError("Please pick a rater.");
      return;
    }
    router.push("/user/history" as Route);
  }

  const isImage = file ? file.type.startsWith("image/") : false;
  const isVideo = file ? file.type.startsWith("video/") : false;
  const isAudio = file ? file.type.startsWith("audio/") : false;

  return (
    <main className="route">
      <section className="py-12">
        <Container>
          <h1 className="text-3xl font-black">Ask a Rater</h1>
          <p className="text-zinc-300 mt-2">A quick four-step request: media -> details -> rater -> review.</p>

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
                {n < 4 ? <div className="w-10 h-[2px] bg-white/20 mx-2" /> : null}
              </div>
            ))}
          </div>

          {error ? (
            <div className="mt-4 rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 text-red-200">
              {error}
            </div>
          ) : null}

          <div className="card mt-6 p-6">
            {step === 1 ? (
              <div className="grid gap-4">
                <div className="text-sm text-zinc-400 mb-2">
                  Select a media file (image/video/audio). Max {MAX_SIZE_MB} MB.
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept={ACCEPTED}
                    onChange={onSelectFile}
                    className="hidden"
                    id="mediaFile"
                  />
                  <label
                    htmlFor="mediaFile"
                    className="btn-3d btn-primary-3d bg-[--accent] text-black px-5 py-2 rounded-full cursor-pointer"
                  >
                    {file ? "Choose a different file" : "Select a file"}
                  </label>
                  {file ? (
                    <button
                      type="button"
                      onClick={clearFile}
                      className="btn-3d px-4 py-2 rounded-full border border-white/10"
                    >
                      Remove
                    </button>
                  ) : null}
                </div>

                {file ? (
                  <div className="mt-4 grid gap-3">
                    <div className="text-sm text-zinc-400">
                      Selected: <span className="text-zinc-200">{file.name}</span>{" "}
                      <span className="text-zinc-500">
                        ({file.type || "unknown"}, {bytesToMB(file.size)} MB)
                      </span>
                    </div>

                    <div className="rounded-lg border border-white/10 p-3">
                      {isImage && fileUrl ? (
                        <img src={fileUrl} alt="Preview" className="max-h-80 w-auto rounded-md" />
                      ) : null}
                      {isVideo && fileUrl ? (
                        <video src={fileUrl} controls className="max-h-80 w-auto rounded-md" />
                      ) : null}
                      {isAudio && fileUrl ? <audio src={fileUrl} controls className="w-full" /> : null}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}

            {step === 2 ? (
              <div className="grid gap-4">
                <label className="block">
                  <div className="text-sm text-zinc-400 mb-1">Title</div>
                  <input
                    className="input"
                    placeholder="e.g., Outfit for interview"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </label>

                <label className="block">
                  <div className="text-sm text-zinc-400 mb-1">Notes for the rater</div>
                  <textarea
                    className="input min-h-[120px]"
                    placeholder="What would you like feedback on?"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </label>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="grid gap-4">
                <div className="text-sm text-zinc-400">Assignment</div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => setAssignMode("auto")}
                    className={[
                      "px-5 py-2 rounded-full border",
                      assignMode === "auto"
                        ? "btn-3d btn-primary-3d bg-[--accent] text-black border-transparent"
                        : "border-white/10"
                    ].join(" ")}
                  >
                    Auto-assign
                  </button>

                  <button
                    type="button"
                    onClick={() => setAssignMode("pick")}
                    className={[
                      "px-5 py-2 rounded-full border",
                      assignMode === "pick"
                        ? "btn-3d btn-primary-3d bg-[--accent] text-black border-transparent"
                        : "border-white/10"
                    ].join(" ")}
                  >
                    Pick from leaderboard
                  </button>
                </div>

                {assignMode === "pick" ? (
                  <label className="block">
                    <div className="text-sm text-zinc-400 mb-1">Choose a rater</div>
                    <select
                      className="input"
                      value={chosenRater}
                      onChange={(e) => setChosenRater(e.target.value)}
                    >
                      <option value="">Select…</option>
                      {SAMPLE_RATERS.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name}
                        </option>
                      ))}
                    </select>
                  </label>
                ) : null}
              </div>
            ) : null}

            {step === 4 ? (
              <div className="grid gap-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="rounded-md border border-white/10 p-4">
                    <div className="text-sm text-zinc-400">Title</div>
                    <div className="font-semibold">{title || "—"}</div>
                    <div className="mt-3 text-sm text-zinc-400">Notes</div>
                    <div className="text-zinc-200 whitespace-pre-wrap break-words">{notes || "—"}</div>
                  </div>

                  <div className="rounded-md border border-white/10 p-4">
                    <div className="text-sm text-zinc-400">Assignment</div>
                    <div className="font-semibold">
                      {assignMode === "auto" ? "Auto-assign" : chosenRater || "—"}
                    </div>

                    <div className="mt-4">
                      <div className="text-sm text-zinc-400 mb-1">Coins to spend</div>
                      <input
                        type="number"
                        min={5}
                        step={5}
                        className="input w-40"
                        value={coins}
                        onChange={(e) => setCoins(Math.max(0, Number(e.target.value)))}
                      />
                      <div className="text-xs text-zinc-500 mt-1">Minimum suggested: 10 coins.</div>
                    </div>
                  </div>
                </div>

                {fileUrl ? (
                  <div className="rounded-md border border-white/10 p-4">
                    <div className="text-sm text-zinc-400 mb-2">Media preview</div>
                    <div className="rounded-md overflow-hidden">
                      {isImage ? <img src={fileUrl} alt="Preview" className="max-h-80 w-auto" /> : null}
                      {isVideo ? <video src={fileUrl} controls className="max-h-80 w-auto" /> : null}
                      {isAudio ? <audio src={fileUrl} controls className="w-full" /> : null}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={prevStep}
              className="btn-3d px-5 py-2 rounded-full border border-white/10"
            >
              Back
            </button>

            {step < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="btn-3d btn-primary-3d bg-[--accent] text-black px-6 py-2 rounded-full"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={submit}
                className="btn-3d btn-primary-3d bg-[--accent] text-black px-6 py-2 rounded-full"
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
