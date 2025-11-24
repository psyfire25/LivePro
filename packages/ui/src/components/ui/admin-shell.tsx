"use client";

import { useEffect, useState, type ReactNode } from "react";
import { SearchInput } from "./search-input";
import { appConfig } from "../../lib/app-config";
import { RequireAuth } from "@repo/auth";

type NavItem = {
  href: string;
  label: string;
  icon?: ReactNode;
};

export function AdminShell({
  children,
  rightSlot,
  productNav = [
    { href: appConfig.production, label: "Production", icon: "🎬" },
    { href: appConfig.talent, label: "Talent", icon: "🎤" },
    { href: appConfig.staffing, label: "Staffing", icon: "👥" },
    { href: appConfig.finance, label: "Finance", icon: "💰" },
    { href: appConfig.web, label: "Web", icon: "🌐" },
    { href: appConfig.docs, label: "Docs", icon: "📚" },
  ],
  sideNav = [],
  appName = "LivePro",
  onSearch,
}: {
  children: ReactNode;
  rightSlot?: ReactNode;
  productNav?: (NavItem & { icon?: string })[]; // top bar app switcher
  sideNav?: NavItem[]; // left sidebar navigation
  appName?: string;
  onSearch?: (query: string) => void;
}) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
    };

    const stored =
      typeof window !== "undefined" ? getCookie("lp-theme") : null;
    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const t: "light" | "dark" =
      stored === "dark" || (!stored && prefersDark) ? "dark" : "light";

    setTheme(t);

    if (typeof document !== "undefined") {
      if (t === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.removeAttribute("data-theme");
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);

    if (typeof document !== "undefined") {
      if (next === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.removeAttribute("data-theme");
        document.documentElement.classList.remove("dark");
      }
      document.cookie = `lp-theme=${next}; path=/; max-age=31536000; SameSite=Lax`;
    }
  }

  return (
    <RequireAuth>
      <div
        className="ui:flex ui:flex-row ui:min-h-screen ui:text-[var(--lp-fg)]"
        style={{
          display: "flex",
          flexDirection: "row",
          background: "var(--lp-bg)",
        }}
      >
        {/* Global Sidebar (Icons) */}
        <aside
          className="ui:w-16 ui:flex-shrink-0 ui:bg-black ui:text-white ui:flex ui:flex-col ui:items-center ui:py-4 ui:gap-4 ui:z-50"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <a
            href="/"
            className="ui:w-10 ui:h-10 ui:bg-white/10 ui:rounded-xl ui:flex ui:items-center ui:justify-center ui:font-bold ui:text-lg ui:mb-4 ui:no-underline ui:text-white hover:ui:bg-white/20 ui:transition-colors"
          >
            LP
          </a>

          <nav
            className="ui:flex ui:flex-col ui:gap-2 ui:w-full ui:px-2"
            style={{ flexDirection: "column" }}
          >
            {productNav.map((l) => (
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
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
            <div className="ui:w-8 ui:h-8 ui:rounded-full ui:bg-gradient-to-tr ui:from-purple-500 ui:to-pink-500" />
          </div>
        </aside>

        {/* Main Content Area */}
        <div
          className="ui:flex-1 ui:flex ui:flex-col ui:min-w-0"
          style={{ display: "flex", flexDirection: "column" }}
        >
          {/* Top Bar */}
          <header className="ui:h-14 ui:flex ui:items-center ui:justify-between ui:px-6 ui:sticky ui:top-0 ui:z-40 lp-header">
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
          <div className="ui:flex-1 ui:flex ui:overflow-hidden w-full">
            {/* Local Sidebar */}
            {sideNav.length > 0 && (
              <aside
                className="ui:w-60 ui:border-r ui:flex-shrink-0 ui:overflow-y-auto ui:hidden md:ui:block"
                style={{
                  background: "var(--lp-card-bg)",
                  borderColor: "var(--lp-border)",
                }}
              >
                <nav className="ui:p-4 ui:space-y-1">
                  {sideNav.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      className="ui:flex ui:items-center ui:gap-3 ui:px-3 ui:py-2 ui:rounded-md ui:text-sm ui:font-medium ui:text-[var(--lp-nav-fg)] hover:ui:bg-[var(--lp-nav-hover)] hover:ui:text-[var(--lp-fg)] ui:no-underline ui:transition-colors"
                    >
                      {l.icon && (
                        <span className="ui:text-lg">{l.icon}</span>
                      )}
                      {l.label}
                    </a>
                  ))}
                </nav>
              </aside>
            )}

            {/* Page Content */}
            <main
              className="ui:flex-1 ui:overflow-auto"
              style={{ background: "var(--lp-bg)" }}
            >
              <div className="lp-container ui:py-8">{children}</div>
            </main>
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}