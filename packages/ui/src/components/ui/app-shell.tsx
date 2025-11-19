"use client";
import { useEffect, useState, type ReactNode } from "react";

export function AppShell({ children, rightSlot }: { children: ReactNode; rightSlot?: ReactNode }) {
  const links = [
    { href: "http://localhost:3010", label: "Production" },
    { href: "http://localhost:3030", label: "Staffing" },
    { href: "http://localhost:3020", label: "Talent" },
    { href: "http://localhost:3040", label: "Finance" },
    { href: "http://localhost:3001", label: "Web" },
    { href: "http://localhost:3000", label: "Docs" },
  ];
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? (localStorage.getItem('lp-theme') as string | null) : null;
    const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const t: "light" | "dark" = stored === 'dark' || (!stored && prefersDark) ? 'dark' : 'light';
    setTheme(t);
    if (typeof document !== 'undefined') {
      if (t === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
      else document.documentElement.removeAttribute('data-theme');
    }
  }, []);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    if (typeof document !== 'undefined') {
      if (next === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
      else document.documentElement.removeAttribute('data-theme');
    }
    try { localStorage.setItem('lp-theme', next); } catch { /* ignore */ }
  }

  return (
    <div className="ui:min-h-screen">
      <header className="ui:sticky ui:top-0 ui:z-50 lp-header">
        <div className="lp-wrap lp-container ui:flex ui:items-center ui:justify-between">
          <nav className="ui:flex lp-nav ui:text-sm ui:items-center ui:gap-3">
            <a href="/" className="ui:font-semibold ui:no-underline">LivePro</a>
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
          <div className="ui:flex ui:items-center ui:gap-3">
            {rightSlot}
            <button onClick={toggleTheme} className="ui:inline-flex ui:items-center ui:justify-center ui:h-8 ui:w-8 ui:rounded-md ui:border ui:border-black/10 hover:ui:bg-black/5" aria-label="Toggle theme">
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>
      <main className="lp-wrap lp-container">
        {children}
      </main>
    </div>
  );
}
