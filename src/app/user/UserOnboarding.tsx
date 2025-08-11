"use client";

import { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { watchUserProfile, saveUserProfile, type UserProfile } from "@/lib/services/user-profile";

export default function UserOnboarding() {
  const router = useRouter();
  const ACCENT = "#46A2FF";

  // auth + show?
  const [uid, setUid] = useState<string | null>(null);
  const [shouldShow, setShouldShow] = useState(false);
  const [loading, setLoading] = useState(true);

  type Step = 0 | 1 | 2 | 3 | 4; // name, dob, interests, pronouns, prank
  const [step, setStep] = useState<Step>(0);

  // form state
  const [name, setName] = useState("");
  const [dob, setDob] = useState(""); // yyyy-mm-dd
  const [interests, setInterests] = useState<string[]>([]);
  const [pronouns, setPronouns] = useState("");
  const [customPronouns, setCustomPronouns] = useState("");

  // prank
  const [prankStage, setPrankStage] = useState<"q" | "jk" | "done">("q");

  const INTEREST_OPTIONS = [
    "Style & outfits",
    "Hair & makeup",
    "Confidence & presence",
    "Voice / tone",
    "Other",
  ];
  const PRONOUN_OPTIONS = ["she/her", "he/him", "they/them", "prefer not to say", "custom"];

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUid(u?.uid ?? null));
    return unsub;
  }, []);

  useEffect(() => {
    if (!uid) {
      setLoading(false);
      return;
    }
    const stop = watchUserProfile(uid, (p: UserProfile | null) => {
      const onboarded = p?.onboarded === true;
      const missing = !p?.name || !p?.dob;
      setShouldShow(!onboarded || missing);
      setLoading(false);
    });
    return stop;
  }, [uid]);

  // prank timer
  useEffect(() => {
    if (shouldShow && step === 4 && prankStage === "q") {
      const t = setTimeout(() => setPrankStage("jk"), 6000);
      return () => clearTimeout(t);
    }
  }, [shouldShow, step, prankStage]);

  const toggleInterest = (val: string) =>
    setInterests((prev) => (prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]));

  const pronounsValue = useMemo(
    () => (pronouns === "custom" ? customPronouns.trim() : pronouns),
    [pronouns, customPronouns]
  );

  const canNext = () => {
    if (step === 0) return name.trim().length >= 2;
    if (step === 1) return !!dob;
    if (step === 2) return interests.length >= 1;
    if (step === 3) return pronouns !== "custom" ? pronouns.length > 0 : customPronouns.trim().length > 0;
    return true;
  };

  const next = () => setStep((s) => (s < 4 ? ((s + 1) as Step) : s));
  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && canNext()) next();
  };

  async function finish() {
    if (!uid) return;
    setPrankStage("done");
    setLoading(true);
    try {
      await saveUserProfile(uid, {
        name: name.trim(),
        dob,
        interests,
        pronouns: pronounsValue || undefined,
        onboarded: true,
        role: "user",
      });
    } finally {
      setLoading(false);
      router.push("/user");
    }
  }

  if (!shouldShow || loading) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
      style={{ "--accent": ACCENT } as React.CSSProperties}
    >
      <div className="card w-full max-w-lg p-6 relative overflow-hidden">
        {/* progress */}
        <div className="mb-4 flex items-center gap-2 text-xs text-zinc-400">
          {[0,1,2,3,4].map((i) => (
            <div key={i} className={`h-1 w-full rounded ${i <= step ? "bg-[--accent]" : "bg-white/10"}`} />
          ))}
        </div>

        {/* Step 0: name */}
        {step === 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">How should we call you?</h3>
            <input
              autoFocus
              className="input w-full"
              placeholder="e.g., Alex"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={onEnter}
            />
            <div className="flex justify-end">
              <button
                className="btn-3d btn-primary-3d rounded-full bg-[--accent] px-5 py-2 text-black disabled:opacity-50"
                onClick={next}
                disabled={!canNext()}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 1: dob */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">How young are you?</h3>
            <input
              type="date"
              className="input w-full"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              onKeyDown={onEnter}
            />
            <div className="flex justify-end">
              <button
                className="btn-3d btn-primary-3d rounded-full bg-[--accent] px-5 py-2 text-black disabled:opacity-50"
                onClick={next}
                disabled={!canNext()}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 2: interests */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">What do you mostly want feedback on right now?</h3>
            <div className="flex flex-wrap gap-2">
              {INTEREST_OPTIONS.map((opt) => {
                const active = interests.includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => toggleInterest(opt)}
                    className={`rounded-full border px-4 py-1.5 text-sm ${active ? "bg-[--accent] text-black border-transparent" : "border-white/15"}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            <div className="flex justify-end">
              <button
                className="btn-3d btn-primary-3d rounded-full bg-[--accent] px-5 py-2 text-black disabled:opacity-50"
                onClick={next}
                disabled={!canNext()}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: pronouns */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Which pronouns should we use?</h3>
            <div className="flex flex-wrap gap-2">
              {PRONOUN_OPTIONS.map((opt) => {
                const active = pronouns === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setPronouns(opt)}
                    className={`rounded-full border px-4 py-1.5 text-sm ${active ? "bg-[--accent] text-black border-transparent" : "border-white/15"}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {pronouns === "custom" && (
              <input
                autoFocus
                className="input w-full"
                placeholder="write yours…"
                value={customPronouns}
                onChange={(e) => setCustomPronouns(e.target.value)}
                onKeyDown={onEnter}
              />
            )}
            <div className="flex justify-end">
              <button
                className="btn-3d btn-primary-3d rounded-full bg-[--accent] px-5 py-2 text-black disabled:opacity-50"
                onClick={next}
                disabled={!canNext()}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 4: prank */}
        {step === 4 && (
          <div className="space-y-6">
            {prankStage === "q" && (
              <>
                <h3 className="text-xl font-semibold">
                  Define Riemann’s hypothesis?
                </h3>
                <p className="text-zinc-400">😵‍💫</p>
              </>
            )}
            {prankStage === "jk" && (
              <div className="animate-in fade-in zoom-in-95 space-y-2">
                <h3 className="text-xl font-semibold">Just kidding 😄</h3>
                <p className="text-zinc-300">Welcome to Percepia!</p>
                <div className="flex justify-end">
                  <button
                    className="btn-3d btn-primary-3d rounded-full bg-[--accent] px-5 py-2 text-black"
                    onClick={finish}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
