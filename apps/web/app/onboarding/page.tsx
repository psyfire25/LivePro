"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Gradient } from "@repo/ui/gradient";
import { Tile } from "@repo/ui/src/components/ui/tile";
import { Button } from "@repo/ui/src/components/ui/button";
import { Stepper } from "@repo/ui/src/components/ui/stepper";
import { createEvent } from "@/src/lib/api";
import { Reveal } from "@repo/motion";

type ModuleKey = "production" | "staffing" | "talent" | "finance" | "docs";

const MODULES: { key: ModuleKey; name: string; description: string; devUrl: string }[] = [
  { key: "production", name: "LivePro:Production", description: "Plan and run live events: stages, tasks, and detailed schedules.", devUrl: "http://localhost:3010" },
  { key: "staffing", name: "LivePro:Staffing", description: "Crew assignment, roles, and availability.", devUrl: "http://localhost:3030" },
  { key: "talent", name: "LivePro:Talent", description: "Artist/talent coordination and logistics.", devUrl: "http://localhost:3020" },
  { key: "finance", name: "LivePro:Finance", description: "Budgets, suppliers, and settlements.", devUrl: "http://localhost:3040" },
  { key: "docs", name: "Developer Docs", description: "API documentation and references.", devUrl: "http://localhost:3000" },
];

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [workspace, setWorkspace] = useState("");
  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState<Record<ModuleKey, boolean>>({
    production: true,
    staffing: false,
    talent: false,
    finance: false,
    docs: false,
  });

  const selectedList = useMemo<Array<(typeof MODULES)[number]>>(
    () => MODULES.filter(module => selected[module.key]),
    [selected],
  );
  const [createdEventId, setCreatedEventId] = useState<string | null>(null);
  const [provisioning, setProvisioning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggleModule(key: ModuleKey) {
    setSelected(prev => {
      const nextState: Record<ModuleKey, boolean> = { ...prev, [key]: !prev[key] };
      return nextState;
    });
  }

  function next() {
    setStep(current => Math.min(3, current + 1));
  }
  function back() {
    setStep(current => Math.max(1, current - 1));
  }

  async function finish() {
    setError(null);
    try {
      // Persist lightweight onboarding context for other apps to read if needed
      localStorage.setItem("livepro.workspace", workspace.trim());
      localStorage.setItem("livepro.email", email.trim());
      localStorage.setItem("livepro.modules", JSON.stringify(selected));

      // Provision a starter Event if Production is selected
      if (selected.production) {
        setProvisioning(true);
        const now = new Date();
        const start = new Date(now.getTime() + 60 * 60 * 1000); // +1h
        const end = new Date(start.getTime() + 3 * 60 * 60 * 1000); // +3h
        const name = workspace?.trim() ? `${workspace} Launch Event` : "New Event";
        const ev = await createEvent({
          name,
          type: "CONFERENCE",
          startAt: start.toISOString(),
          endAt: end.toISOString(),
          location: "TBD",
        });
        setCreatedEventId(ev.id);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to provision resources";
      setError(message);
    } finally {
      setProvisioning(false);
      setStep(3);
    }
  }

  return (
    <main className="relative max-w-5xl mx-auto p-8 space-y-8 lp-prose">
      <Gradient conic className="inset-[-25%] opacity-30" />

      <header className="relative z-10">
        <Reveal variant="fade-up">
          <h1>Welcome to LivePro</h1>
          <p className="mt-1">Let’s set up your workspace and pick the modules you need.</p>
        </Reveal>
      </header>

      <nav className="relative z-10">
        <Stepper steps={["Modules","Workspace","Launch"]} current={step} />
      </nav>

      {step === 1 && (
        <section className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MODULES.map(m => (
            <Tile
              key={m.key}
              onClick={() => toggleModule(m.key)}
              title={m.name}
              subtitle={m.description}
              selected={!!selected[m.key]}
            />
          ))}
          <div className="col-span-full flex justify-between items-center mt-2">
            <span className="text-xs opacity-70">Choose one or more modules</span>
            <div className="flex gap-2">
              <Button onClick={next}>Continue</Button>
            </div>
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="relative z-10 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Workspace Name</label>
            <input className="border rounded p-2 w-full" placeholder="e.g. Acme Events" value={workspace} onChange={e=>setWorkspace(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Your Email</label>
            <input className="border rounded p-2 w-full" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
          <div className="flex justify-between">
            <button className="border rounded px-3 py-2" onClick={back}>Back</button>
            <button className="border rounded px-3 py-2" onClick={finish} disabled={!workspace.trim()}>Finish</button>
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="relative z-10 space-y-4">
          <h2 className="text-xl font-semibold">You’re all set{workspace ? `, ${workspace}` : ""}!</h2>
          <p className="opacity-80">Launch the modules you selected below. You can open them in new tabs and start working immediately.</p>
          {provisioning && <p className="text-sm">Provisioning your starter event…</p>}
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {selectedList.map(module => {
              const href = module.key === "production" && createdEventId
                ? `${module.devUrl}/events/${createdEventId}?w=${encodeURIComponent(workspace)}`
                : `${module.devUrl}/?w=${encodeURIComponent(workspace)}`;
              return (
                <a key={module.key} className="lp-card ui:rounded" href={href} target="_blank" rel="noreferrer">
                  <div className="font-medium">{module.name}</div>
                  <div className="text-sm opacity-70">{module.devUrl}</div>
                </a>
              );
            })}
          </div>
          <div className="flex gap-2 pt-2">
            <Link className="underline" href="/">
              Return home
            </Link>
            <Link className="underline" href="/onboarding">
              Restart onboarding
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
