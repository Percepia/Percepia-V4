"use client";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/container";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-black/60 backdrop-blur border-b border-white/10">
      <Container>
        <nav className="h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Percepia" width={28} height={28} />
            <span className="font-black tracking-wide">Percepia</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link className="btn-3d px-4 py-2 glass rounded-full" href="/login">Log in</Link>
          </div>
        </nav>
      </Container>
    </header>
  );
}
