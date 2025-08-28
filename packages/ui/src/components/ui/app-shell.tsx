import type { ReactNode } from "react";

export function AppShell({ children }: { children: ReactNode }) {
  const links = [
    { href: "http://localhost:3010", label: "Production" },
    { href: "http://localhost:3030", label: "Staffing" },
    { href: "http://localhost:3020", label: "Talent" },
    { href: "http://localhost:3040", label: "Finance" },
    { href: "http://localhost:3001", label: "Web" },
    { href: "http://localhost:3000", label: "Docs" },
  ];
  return (
    <div className="ui:min-h-screen ui:bg-white">
      <header className="ui:sticky ui:top-0 ui:z-50 ui:border-b ui:bg-white/70 ui:backdrop-blur ui:px-4 ui:py-3">
        <div className="ui:mx-auto ui:max-w-6xl ui:flex ui:items-center ui:justify-between">
          <a href="/" className="ui:font-semibold ui:text-black ui:no-underline">LivePro</a>
          <nav className="lp-nav ui:text-sm">
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                className="ui:px-3 ui:py-1.5 ui:rounded-md ui:text-slate-700 ui:no-underline hover:ui:text-slate-900 hover:ui:bg-slate-100"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </header>
      <main className="ui:mx-auto ui:max-w-6xl ui:px-4 ui:py-8">
        {children}
      </main>
    </div>
  );
}
