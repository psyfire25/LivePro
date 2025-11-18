"use client";
import { useEffect, useState } from "react";
import { listEvents, createEvent } from "../lib/api/client";
import { Input } from "@repo/ui/src/components/ui/input";
import { Button } from "@repo/ui/src/components/ui/button";
import { useWorkspaceRole, hasMinRole } from "@/lib/auth/role";

export default function Home() {
  const { role } = useWorkspaceRole();
  const [loading, setLoading] = useState(true);
  const [hasEvents, setHasEvents] = useState<boolean | null>(null);
  const [form, setForm] = useState({ name: "", type: "CONCERT", startAt: "", endAt: "", location: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const events = await listEvents();
        setHasEvents((events as any[])?.length > 0);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createEvent(form as any);
      window.location.href = "/events";
    } finally { setSubmitting(false); }
  }

  return (
    <main className="min-h-screen lp-prose space-y-8">
      {/* First‑time focus: create your first event */}
      {!loading && hasEvents === false ? (
        <section className="lp-card lp-card-lg">
          <h1 className="mb-2">Create your first production</h1>
          <p className="opacity-80">Kick off by creating your first event. You can add stages, build a schedule, and assign tasks once it’s created.</p>
          <form onSubmit={submit} className="ui:mt-4 ui:grid ui:grid-cols-1 md:ui:grid-cols-2 ui:gap-3">
            <Input placeholder="Event name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
            <select className="ui:h-9 ui:rounded-md ui:border ui:border-[var(--lp-card-border)] ui:bg-[var(--lp-card-bg)] ui:px-3 ui:text-sm" value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
              {["CONCERT","FESTIVAL","CLUB_NIGHT","CONFERENCE","PRIVATE"].map(t=> <option key={t} value={t}>{t}</option>)}
            </select>
            <Input type="datetime-local" value={form.startAt} onChange={e=>setForm({...form,startAt:e.target.value})} />
            <Input type="datetime-local" value={form.endAt} onChange={e=>setForm({...form,endAt:e.target.value})} />
            <div className="md:ui:col-span-2 ui:flex ui:gap-2">
              <Input className="ui:flex-1" placeholder="Location (optional)" value={form.location} onChange={e=>setForm({...form,location:e.target.value})} />
              <Button disabled={submitting || !form.name || !form.startAt || !form.endAt}>{submitting?"Creating…":"Create event"}</Button>
            </div>
          </form>
        </section>
      ) : (
        <>
          <section className="relative overflow-hidden lp-card lp-card-lg lp-hero-bg">
            <h1>LivePro: Production</h1>
            <p className="mt-2">Plan, schedule, and run your event operations.</p>
            <div className="mt-6 ui:flex ui:gap-3">
              <a className="lp-card ui:rounded-md" href="/events">View Events</a>
              <a className="lp-card ui:rounded-md" href="/events">Create Event</a>
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <a className="lp-card" href="/events">
              <div className="text-lg font-semibold">Production Management</div>
              <div className="opacity-70 text-sm mt-1">Events, schedules, tasks</div>
            </a>
            {hasMinRole(role,'MANAGER') && (
            <a className="lp-card" href="/sections/build">
              <div className="text-lg font-semibold">Production Build</div>
              <div className="opacity-70 text-sm mt-1">Stages, tech specs, equipment</div>
            </a>
            )}
            {hasMinRole(role,'MANAGER') && (
            <a className="lp-card" href="/sections/logistics">
              <div className="text-lg font-semibold">Logistics</div>
              <div className="opacity-70 text-sm mt-1">Crew, suppliers, transport</div>
            </a>
            )}
          </section>
        </>
      )}
    </main>
  );
}
