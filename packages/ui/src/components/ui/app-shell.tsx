"use client";
import { useEffect, useState, type ReactNode } from "react";

export function AppShell({ children }: { children: ReactNode }) {
  const links = [
    { href: "http://localhost:3010", label: "Production" },
    { href: "http://localhost:3030", label: "Staffing" },
    { href: "http://localhost:3020", label: "Talent" },
    { href: "http://localhost:3040", label: "Finance" },
    { href: "http://localhost:3001", label: "Web" },
    { href: "http://localhost:3000", label: "Docs" },
  ];
  const [theme, setTheme] = useState<"light"|"dark">("light");

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? (localStorage.getItem('lp-theme') as any) : null;
    const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const t: "light"|"dark" = stored === 'dark' || (!stored && prefersDark) ? 'dark' : 'light';
    setTheme(t);
    if (typeof document !== 'undefined') {
      if (t === 'dark') document.documentElement.setAttribute('data-theme','dark');
      else document.documentElement.removeAttribute('data-theme');
    }
  }, []);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    if (typeof document !== 'undefined') {
      if (next === 'dark') document.documentElement.setAttribute('data-theme','dark');
      else document.documentElement.removeAttribute('data-theme');
    }
    try { localStorage.setItem('lp-theme', next); } catch {}
  }

  return (
    <div className="ui:min-h-screen ui:bg-white">
      <header className="ui:sticky ui:top-0 ui:z-50 ui:border-b ui:bg-white/70 ui:backdrop-blur ui:px-4 ui:py-3">
        <div className="ui:mx-auto ui:max-w-6xl ui:flex ui:items-center ui:justify-between">
          <a href="/" className="ui:font-semibold ui:text-black ui:no-underline">LivePro</a>
          <div className="ui:flex ui:items-center ui:gap-3">
            <nav className="lp-nav ui:text-sm">
              {links.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  className="ui:px-3 ui:py-1.5 ui:rounded-md ui:no-underline"
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <button onClick={toggleTheme} className="ui:inline-flex ui:items-center ui:justify-center ui:h-8 ui:w-8 ui:rounded-md ui:border ui:border-black/10 hover:ui:bg-black/5" aria-label="Toggle theme">
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>
      <main className="ui:mx-auto ui:max-w-6xl ui:px-4 ui:py-8">
        {children}
      </main>
    </div>
  );
}
