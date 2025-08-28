import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-3xl font-bold mb-4">Production</h1>
      <p>Plan and manage LivePro events and productions.</p>
      <ul className="list-disc pl-5 mt-4 space-y-1">
        <li>
          <Link className="underline" href="/events">Events</Link>
        </li>
      </ul>
    </main>
  );
}
