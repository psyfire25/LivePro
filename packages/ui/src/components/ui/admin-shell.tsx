"use client";
import { useEffect, useState, type ReactNode } from "react";

type NavItem = {
  href: string;
  label: string;
  icon?: ReactNode;
};

export function AdminShell({
  children,
  rightSlot,
  productNav = [
    { href: "http://localhost:3010", label: "Production" },
    { href: "http://localhost:3030", label: "Staffing" },
    { href: "http://localhost:3020", label: "Talent" },
    { href: "http://localhost:3040", label: "Finance" },
    { href: "http://localhost:3001", label: "Web" },
    { href: "http://localhost:3000", label: "Docs" },
  ],
  sideNav = [],
  appName = "LivePro",
}: {
  children: ReactNode;
  rightSlot?: ReactNode;
  productNav?: NavItem[]; // top bar app switcher
  sideNav?: NavItem[];    // left sidebar navigation
  appName?: string;
}) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? (localStorage.getItem('lp-theme') as any) : null;
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
    try { localStorage.setItem('lp-theme', next); } catch { }
  }

  return (
    <div className="ui:min-h-screen ui:bg-[var(--lp-bg)] ui:text-[var(--lp-fg)]">
      {/* Top bar */}
      <header className="ui:sticky ui:top-0 ui:z-50 lp-header">
        <div className="lp-wrap lp-container ui:flex ui:items-center ui:gap-3 ui:justify-between">
          <div className="ui:flex ui:items-center ui:gap-3">
            <button className="ui:md:hidden ui:inline-flex ui:h-9 ui:w-9 ui:items-center ui:justify-center ui:rounded-md ui:border ui:border-black/10 hover:ui:bg-black/5"
              aria-label="Toggle navigation" onClick={() => setOpen(v => !v)}>
              ☰
            </button>
            <a href="/" className="ui:font-semibold ui:no-underline">{appName}</a>
            <div className="ui:hidden md:ui:flex ui:items-center ui:gap-1 ui:text-sm ui:ml-2">
              {productNav.map((l) => (
                <a key={l.href} href={l.href} className="ui:px-2 ui:py-1.5 ui:rounded-md ui:no-underline ui:text-[var(--lp-nav-fg)] hover:ui:bg-[var(--lp-nav-hover)] hover:ui:text-[var(--lp-fg)]">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <div className="ui:flex ui:items-center ui:gap-2">
            {rightSlot}
            <button onClick={toggleTheme} className="ui:inline-flex ui:items-center ui:justify-center ui:h-8 ui:w-8 ui:rounded-md ui:border ui:border-black/10 hover:ui:bg-black/5" aria-label="Toggle theme">
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      {/* Body with sidebar */}
      <div className="lp-wrap lp-container ui:grid ui:grid-cols-1 md:ui:grid-cols-[240px_1fr] ui:gap-4">
        {/* Sidebar */}
        <aside className={"ui:relative md:ui:static"}>
          {/* Mobile drawer */}
          {open && sideNav.length > 0 && (
            <div className="ui:md:hidden ui:absolute ui:z-40 ui:inset-x-0 ui:top-2 ui:rounded-lg ui:border ui:border-[var(--lp-border)] ui:bg-[var(--lp-card-bg)] ui:shadow">
              <nav className="ui:p-2 ui:flex ui:flex-col">
                {sideNav.map((l) => (
                  <a key={l.href} href={l.href} className="ui:px-3 ui:py-2 ui:rounded-md ui:no-underline hover:ui:bg-[var(--lp-nav-hover)]">
                    {l.label}
                  </a>
                ))}
              </nav>
            </div>
          )}
          {/* Desktop sidebar */}
          {sideNav.length > 0 && (
            <div className="ui:hidden md:ui:block ui:sticky ui:top-[4.25rem] ui:self-start">
              <nav className="ui:rounded-xl ui:border ui:border-[var(--lp-border)] ui:bg-[var(--lp-card-bg)] ui:shadow-sm ui:p-2 ui:flex ui:flex-col">
                {sideNav.map((l) => (
                  <a key={l.href} href={l.href} className="ui:px-3 ui:py-2 ui:rounded-md ui:no-underline ui:text-sm hover:ui:bg-[var(--lp-nav-hover)]">
                    {l.label}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </aside>

        {/* Main content */}
        <main className="ui:min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
