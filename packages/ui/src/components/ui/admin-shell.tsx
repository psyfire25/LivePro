"use client";
import { useEffect, useState, type ReactNode } from "react";
import { SearchInput } from "./search-input";

type NavItem = {
  href: string;
  label: string;
  icon?: ReactNode;
};

export function AdminShell({
  children,
  rightSlot,
  productNav = [
    { href: "http://localhost:3010", label: "Production", icon: "🎬" },
    { href: "http://localhost:3020", label: "Talent", icon: "🎤" },
    { href: "http://localhost:3030", label: "Staffing", icon: "👥" },
    { href: "http://localhost:3040", label: "Finance", icon: "💰" },
    { href: "http://localhost:3001", label: "Web", icon: "🌐" },
    { href: "http://localhost:3000", label: "Docs", icon: "📚" },
  ],
  sideNav = [],
  appName = "LivePro",
  onSearch,
}: {
  children: ReactNode;
  rightSlot?: ReactNode;
  productNav?: (NavItem & { icon?: string })[]; // top bar app switcher
  sideNav?: NavItem[];    // left sidebar navigation
  appName?: string;
  onSearch?: (query: string) => void;
}) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [open, setOpen] = useState(false);

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
      document.cookie = `lp-theme=${next}; path=/; max-age=31536000; SameSite=Lax`;
    }
  }

  return (
    <div className="ui:flex ui:min-h-screen ui:bg-gray-50 dark:ui:bg-gray-900 ui:text-gray-900 dark:ui:text-gray-100">
      {/* Global Sidebar (Icons) */}
      <aside className="ui:w-16 ui:flex-shrink-0 ui:bg-black ui:text-white ui:flex ui:flex-col ui:items-center ui:py-4 ui:gap-4 ui:z-50">
        <a href="/" className="ui:w-10 ui:h-10 ui:bg-white/10 ui:rounded-xl ui:flex ui:items-center ui:justify-center ui:font-bold ui:text-lg ui:mb-4 ui:no-underline ui:text-white hover:ui:bg-white/20 ui:transition-colors">
          LP
        </a>

        <nav className="ui:flex ui:flex-col ui:gap-2 ui:w-full ui:px-2">
          {productNav.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="ui:w-10 ui:h-10 ui:rounded-lg ui:flex ui:items-center ui:justify-center ui:text-xl ui:no-underline ui:text-white/70 hover:ui:text-white hover:ui:bg-white/10 ui:transition-all ui:mx-auto"
              title={l.label}
            >
              {l.icon || l.label[0]}
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
      <div className="ui:flex-1 ui:flex ui:flex-col">
        {/* Top Bar */}
        <header className="ui:h-14 ui:border-b ui:border-gray-200 dark:ui:border-gray-800 ui:bg-white dark:ui:bg-gray-950 ui:flex ui:items-center ui:justify-between ui:px-6 ui:sticky ui:top-0 ui:z-40">
          <div className="ui:flex ui:items-center ui:gap-4 ui:flex-1">
            <div className="ui:flex ui:items-center ui:gap-3 ui:mr-4">
              <span className="ui:font-semibold ui:text-lg">{appName}</span>
            </div>

            <SearchInput onChange={onSearch} />
          </div>
          <div className="ui:flex ui:items-center ui:gap-3">
            {rightSlot}
          </div>
        </header>

        {/* Content Body (with optional local sidebar) */}
        <div className="ui:flex-1 ui:flex ui:overflow-hidden">
          {/* Local Sidebar */}
          {sideNav.length > 0 && (
            <aside className="ui:w-60 ui:bg-white dark:ui:bg-gray-950 ui:border-r ui:border-gray-200 dark:ui:border-gray-800 ui:flex-shrink-0 ui:overflow-y-auto ui:hidden md:ui:block">
              <nav className="ui:p-4 ui:space-y-1">
                {sideNav.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="ui:flex ui:items-center ui:gap-3 ui:px-3 ui:py-2 ui:rounded-md ui:text-sm ui:font-medium ui:text-gray-600 dark:ui:text-gray-400 hover:ui:bg-gray-50 dark:hover:ui:bg-gray-900 hover:ui:text-gray-900 dark:hover:ui:text-gray-100 ui:no-underline ui:transition-colors"
                  >
                    {l.icon && <span className="ui:text-lg">{l.icon}</span>}
                    {l.label}
                  </a>
                ))}
              </nav>
            </aside>
          )}

          {/* Page Content */}
          <main className="ui:flex-1 ui:overflow-auto ui:bg-gray-50 dark:ui:bg-gray-900">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
