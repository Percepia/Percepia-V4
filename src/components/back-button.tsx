"use client";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className="btn-3d glass rounded-full px-4 py-2">
      ← Back
    </button>
  );
}
