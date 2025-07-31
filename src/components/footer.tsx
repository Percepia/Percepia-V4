export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-white/50">
        © {new Date().getFullYear()} Percepia
      </div>
    </footer>
  );
}
