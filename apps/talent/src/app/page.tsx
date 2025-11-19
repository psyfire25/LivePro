import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen p-8 space-y-10">
      <section className="rounded-2xl border p-10 bg-white">
        <h1 className="text-4xl font-bold">LivePro: Talent</h1>
        <p className="opacity-70 mt-2">Coordinate artists and logistics.</p>
        <div className="mt-6 flex gap-3">
          <Link className="border rounded px-4 py-2" href="/">Dashboard</Link>
          <Link className="border rounded px-4 py-2" href="/">Roster</Link>
        </div>
      </section>
    </main>
  );
}
