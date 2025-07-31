"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function UserLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "/user";
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      window.location.href = "/user";
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      await signInWithPopup(auth, new FacebookAuthProvider());
      window.location.href = "/user";
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Image
        src="/friends.jpg"
        alt="Background"
        fill
        className="object-cover opacity-30"
        priority
      />

      <div className="relative z-10 max-w-md w-full mx-auto top-1/2 -translate-y-1/2 p-8 bg-transparent space-y-6">
        <h1 className="text-3xl font-bold text-white text-center">
          User Log In
        </h1>
        {error && <p className="text-red-400">{error}</p>}

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded bg-white/20 text-white placeholder-white/60"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded bg-white/20 text-white placeholder-white/60"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full py-3 rounded-3xl bg-pink-500 hover:bg-pink-600 font-semibold text-white transition"
          >
            Continue with Email
          </button>
        </form>

        <div className="flex flex-col space-y-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full py-3 rounded-3xl bg-red-600 hover:bg-red-700 text-white transition"
          >
            Continue with Google
          </button>
          <button
            onClick={handleFacebookLogin}
            className="w-full py-3 rounded-3xl bg-blue-800 hover:bg-blue-900 text-white transition"
          >
            Continue with Facebook
          </button>
        </div>

        <p className="text-center text-sm text-white/70">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-pink-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
