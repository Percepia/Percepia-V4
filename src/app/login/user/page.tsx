"use client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Container from "@/components/container";
import { useRouter } from "next/navigation";

export default function LoginUser() {
  const router = useRouter();
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push("/user");
  }
  return (
    <>
      <Navbar />
      <main className="route theme-user">
        <section className="py-16">
          <Container>
            <h2 className="text-3xl font-black mb-6">Log in (User)</h2>
            <form onSubmit={onSubmit} className="card grid gap-3 max-w-md">
              <input type="email" required className="rounded bg-black border border-white/10 p-3" placeholder="Email" />
              <input type="password" required className="rounded bg-black border border-white/10 p-3" placeholder="Password" />
              <button className="btn-3d bg-[--accent] text-black rounded-full px-5 py-3 shadow-neon-user">Log in</button>
              <div className="text-sm text-zinc-400">Or continue with:</div>
              <div className="flex gap-3">
                <button type="button" className="glass rounded-full px-4 py-2">Google</button>
                <button type="button" className="glass rounded-full px-4 py-2">Facebook</button>
                <button type="button" className="glass rounded-full px-4 py-2">Reddit</button>
              </div>
            </form>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
