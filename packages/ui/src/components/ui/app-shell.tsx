"use client";
import { useEffect, useState, type ReactNode } from "react";

export function AppShell({ children, rightSlot }: { children: ReactNode; rightSlot?: ReactNode }) {
  const links = [
    { href: "http://localhost:3010", label: "Production", icon: "🎬" },
    { href: "http://localhost:3020", label: "Talent", icon: "🎤" },
    { href: "http://localhost:3030", label: "Staffing", icon: "👥" },
    { href: "http://localhost:3040", label: "Finance", icon: "💰" },
    { href: "http://localhost:3001", label: "Web", icon: "🌐" },
    { href: "http://localhost:3000", label: "Docs", icon: "📚" },
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
    <div className="ui:flex ui:min-h-screen ui:bg-gray-50 dark:ui:bg-gray-900 ui:text-gray-900 dark:ui:text-gray-100">
      {/* Sidebar */}
      <aside className="ui:w-16 ui:flex-shrink-0 ui:bg-black ui:text-white ui:flex ui:flex-col ui:items-center ui:py-4 ui:gap-4 ui:z-50">
        <a href="/" className="ui:w-10 ui:h-10 ui:bg-white/10 ui:rounded-xl ui:flex ui:items-center ui:justify-center ui:font-bold ui:text-lg ui:mb-4 ui:no-underline ui:text-white hover:ui:bg-white/20 ui:transition-colors">
          LP
        </a>

        <nav className="ui:flex ui:flex-col ui:gap-2 ui:w-full ui:px-2">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="ui:w-10 ui:h-10 ui:rounded-lg ui:flex ui:items-center ui:justify-center ui:text-xl ui:no-underline ui:text-white/70 hover:ui:text-white hover:ui:bg-white/10 ui:transition-all ui:mx-auto"
              title={l.label}
            >
              {l.icon}
            </a>
          ))}
        </nav>

        <div className="ui:mt-auto ui:flex ui:flex-col ui:gap-3 ui:items-center">
          <button
            onClick={toggleTheme}
            className="ui:w-10 ui:h-10 ui:rounded-lg ui:flex ui:items-center ui:justify-center hover:ui:bg-white/10 ui:text-white/70 hover:ui:text-white ui:transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <div className="ui:w-8 ui:h-8 ui:rounded-full ui:bg-gradient-to-tr ui:from-purple-500 ui:to-pink-500"></div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="ui:flex-1 ui:flex ui:flex-col ui:min-w-0">
        {/* Top Bar */}
        <header className="ui:h-14 ui:border-b ui:border-gray-200 dark:ui:border-gray-800 ui:bg-white dark:ui:bg-gray-950 ui:flex ui:items-center ui:justify-between ui:px-6 ui:sticky ui:top-0 ui:z-40">
          <div className="ui:flex ui:items-center ui:gap-4 ui:flex-1">
            <div className="ui:relative ui:max-w-md ui:w-full">
              <span className="ui:absolute ui:left-3 ui:top-1/2 -ui:translate-y-1/2 ui:text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Search... (⌘K)"
                className="ui:w-full ui:pl-9 ui:pr-4 ui:py-1.5 ui:bg-gray-100 dark:ui:bg-gray-900 ui:border-none ui:rounded-md ui:text-sm focus:ui:ring-2 focus:ui:ring-black/5 dark:focus:ui:ring-white/10 ui:outline-none"
              />
            </div>
          </div>
          <div className="ui:flex ui:items-center ui:gap-3">
            {rightSlot}
          </div>
        </header>

        {/* Page Content */}
        <main className="ui:flex-1 ui:overflow-auto">
          <div className="lp-wrap lp-container ui:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
