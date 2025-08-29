"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { getEvent } from "../../../lib/api/client";

export default function EventDetailPage(){
  const params = useParams<{ id:string }>();
  const id = useMemo(()=> Array.isArray(params?.id)? params.id[0] : params?.id, [params]);
  const [ev, setEv] = useState<any|null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{ (async ()=>{ if(!id) return; setLoading(true); try{ setEv(await getEvent(id)); } finally{ setLoading(false);} })(); }, [id]);
  if (!id) return <main className="lp-wrap lp-container">Invalid id</main>;
  if (loading || !ev) return <main className="lp-wrap lp-container">Loading…</main>;
  return (
    <main className="lp-wrap lp-container lp-prose space-y-6">
      <section className="lp-card lp-card-lg">
        <h1 className="mb-1">{ev.name}</h1>
        <div className="text-sm opacity-80">{ev.type} • {new Date(ev.startAt).toLocaleString()} → {new Date(ev.endAt).toLocaleString()} • {ev.location||"TBD"}</div>
        <div className="mt-4 grid sm:grid-cols-3 gap-3">
          <a className="lp-card" href={`/events/${id}/gantt`}>Open Gantt</a>
          <a className="lp-card" href={`/events/${id}`}>Schedule</a>
          <a className="lp-card" href={`/events/${id}`}>Tasks</a>
        </div>
      </section>
      <section className="grid sm:grid-cols-2 gap-4">
        <div className="lp-card">
          <div className="text-sm opacity-70 mb-2">Stages</div>
          <ul className="list-disc pl-5">
            {(ev.stages||[]).map((s:any)=> <li key={s.id}>{s.name}</li>)}
            {(!ev.stages||ev.stages.length===0) && <li className="opacity-60">No stages</li>}
          </ul>
        </div>
        <div className="lp-card">
          <div className="text-sm opacity-70 mb-2">Recent Tasks</div>
          <ul className="list-disc pl-5">
            {(ev.tasks||[]).slice(0,8).map((t:any)=> <li key={t.id}>{t.title}</li>)}
            {(!ev.tasks||ev.tasks.length===0) && <li className="opacity-60">No tasks</li>}
          </ul>
        </div>
      </section>
    </main>
  );
}

