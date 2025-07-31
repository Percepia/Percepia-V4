"use client";
import Link from "next/link";

export default function LoginSelector() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black/40 p-4">
      <h1 className="text-5xl text-white font-bold mb-12">Log in as…</h1>
      <div className="flex flex-col space-y-8">
        <Link
          href="/login/user"
          className="w-72 text-center py-6 bg-pink-500 hover:bg-pink-600 rounded-3xl text-white text-2xl font-semibold transition"
        >
          I’m a User
        </Link>
        <Link
          href="/login/rater"
          className="w-72 text-center py-6 bg-blue-500 hover:bg-blue-600 rounded-3xl text-white text-2xl font-semibold transition"
        >
          I’m a Rater
        </Link>
      </div>
    </div>
  );
}
