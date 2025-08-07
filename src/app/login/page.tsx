"use client";
import Link from "next/link";

export default function LoginSelector() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black/40 p-4">
      <h1 className="mb-12 text-5xl font-bold text-white">Log in as…</h1>

      <div className="flex flex-col space-y-8">
        {/* User → blue */}
        <Link
          href="/login/user"
          className="w-72 rounded-3xl bg-[#46A2FF] py-6 text-center text-2xl font-semibold text-black transition hover:bg-[#3490e6]"
        >
          I’m a User
        </Link>

        {/* Rater → green */}
        <Link
          href="/login/rater"
          className="w-72 rounded-3xl bg-[#8CFF63] py-6 text-center text-2xl font-semibold text-black transition hover:bg-[#76e452]"
        >
          I’m a Rater
        </Link>
      </div>
    </div>
  );
}
