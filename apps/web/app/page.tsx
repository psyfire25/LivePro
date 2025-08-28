"use client";
import { Reveal } from "@repo/motion";
import { Button } from "@repo/ui/src/components/ui/button";

export default function Home() {
  const links = [
    { href: "/onboarding", label: "Get Started (Onboarding)" },
    { href: "http://localhost:3010", label: "Production" },
    { href: "http://localhost:3030", label: "Staffing" },
    { href: "http://localhost:3020", label: "Talent" },
    { href: "http://localhost:3040", label: "Finance" },
    { href: "http://localhost:4000/docs", label: "API Docs (Nest)" }
  ];
  return (
    <main className="mx-auto max-w-5xl p-8 space-y-8 lp-prose">
      <Reveal variant="fade-up">
        <section className="relative overflow-hidden lp-card lp-card-lg lp-hero-bg">
          <h1>LivePro</h1>
          <p className="mt-2 max-w-2xl">A modular suite for live event production: plan shows, staff crews, coordinate talent, and reconcile finances — all in one place.</p>
          <div className="mt-6 flex gap-3">
            <Button asChild>
              <a href="/onboarding">Start Onboarding</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="http://localhost:3010">Open Production</a>
            </Button>
          </div>
        </section>
      </Reveal>

      <Reveal variant="fade-up" delay={100}>
        <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {links.slice(1).map(l => (
            <a key={l.href} className="lp-card" href={l.href}>
              <div className="text-lg font-semibold">{l.label}</div>
              <div className="opacity-70 text-sm mt-1">{l.href}</div>
            </a>
          ))}
        </section>
      </Reveal>
    </main>
  );
}
