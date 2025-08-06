// src/app/user/footer.tsx
export default function UserFooter() {
  return (
    <footer className="bg-black/40 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-6 text-sm text-zinc-400">
        © {new Date().getFullYear()} Percepia — User
      </div>
    </footer>
  );
}

