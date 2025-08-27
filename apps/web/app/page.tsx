export default function Home() {
  const links = [
    { href: "/production", label: "Production" },
    { href: "/staffing", label: "Staffing" },
    { href: "/talent", label: "Talent" },
    { href: "/finance", label: "Finance" },
    { href: "/docs", label: "API Docs (Nest)" }
  ];
  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-3xl font-bold mb-6">LivePro</h1>
      <ul className="space-y-3">
        {links.map(l => (
          <li key={l.href}>
            <a className="underline" href={l.href}>{l.label}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}