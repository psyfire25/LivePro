"use client";
import { useEffect, useState, type ReactNode } from "react";
import { SearchInput } from "./search-input";
import { appConfig } from "../../lib/app-config";

export function AppShell({ children, rightSlot, onSearch }: { children: ReactNode; rightSlot?: ReactNode; onSearch?: (query: string) => void }) {
  const links = [
    { href: appConfig.production, label: "Production", icon: "🎬" },
    { href: appConfig.talent, label: "Talent", icon: "🎤" },
    { href: appConfig.staffing, label: "Staffing", icon: "👥" },
    { href: appConfig.finance, label: "Finance", icon: "💰" },
    { href: appConfig.web, label: "Web", icon: "🌐" },
    { href: appConfig.docs, label: "Docs", icon: "📚" },
  ];
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
    };

    const stored = typeof window !== 'undefined' ? getCookie('lp-theme') : null;
    const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const t: "light" | "dark" = stored === 'dark' || (!stored && prefersDark) ? 'dark' : 'light';
    setTheme(t);
    if (typeof document !== 'undefined') {
      if (t === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    if (typeof document !== 'undefined') {
      if (next === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
        document.documentElement.classList.remove('dark');
      }
      document.cookie = `lp-theme=${next}; path=/; max-age=31536000; SameSite=Lax`;
    }
  }

  return (
    <div className="ui:flex ui:flex-row ui:min-h-screen ui:text-[var(--lp-fg)]" style={{ display: 'flex', flexDirection: 'row', background: 'var(--lp-bg)' }}>
      {/* Sidebar */}
      <aside className="ui:w-16 ui:flex-shrink-0 ui:bg-black ui:text-white ui:flex ui:flex-col ui:items-center ui:py-4 ui:gap-4 ui:z-50" style={{ display: 'flex', flexDirection: 'column' }}>
        <a href="/" className="ui:w-10 ui:h-10 ui:bg-white/10 ui:rounded-xl ui:flex ui:items-center ui:justify-center ui:font-bold ui:text-lg ui:mb-4 ui:no-underline ui:text-white hover:ui:bg-white/20 ui:transition-colors">
          LP
        </a>

        <nav className="ui:flex ui:flex-col ui:gap-2 ui:w-full ui:px-2" style={{ flexDirection: 'column' }}>
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
      <div className="ui:flex-1 ui:flex ui:flex-col ui:min-w-0" style={{ display: 'flex', flexDirection: 'column' }}>
        {/* Top Bar */}
        <header className="ui:h-14 ui:flex ui:items-center ui:justify-between ui:px-6 ui:sticky ui:top-0 ui:z-40 lp-header">
          <div className="ui:flex ui:items-center ui:gap-4 ui:flex-1">
            <SearchInput onChange={onSearch} />
          </div>
          <div className="ui:flex ui:items-center ui:gap-3">
            {rightSlot}
          </div>
        </header>

        {/* Page Content */}
        <main className="ui:flex-1 ui:overflow-auto" style={{ background: 'var(--lp-bg)' }}>
          <div className="lp-wrap lp-container ui:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
