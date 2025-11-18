"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { getEvent, listSchedule, listStages, updateSchedule } from "../../../../lib/api/client";

type Stage = { id: string; name: string };
type ScheduleItem = {
  id: string;
  title: string;
  kind: string;
  startAt: string;
  endAt: string;
  stageId?: string;
  notes?: string;
  artist?: string;
};

export default function GanttPage() {
  const params = useParams<{ id: string }>();
  const eventId = useMemo(() => (Array.isArray(params?.id) ? params.id[0] : params?.id), [params]);

  const [event, setEvent] = useState<any | null>(null);
  const [stages, setStages] = useState<Stage[]>([]);
  const [items, setItems] = useState<ScheduleItem[]>([]);
  const [selected, setSelected] = useState<ScheduleItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [drag, setDrag] = useState<null | { id:string; mode:'move'|'resize-l'|'resize-r'; startX:number; origStart:number; origEnd:number }>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!eventId) return;
      setLoading(true);
      try {
        const [ev, st, it] = await Promise.all([
          getEvent(eventId),
          listStages(eventId),
          listSchedule(eventId),
        ]);
        if (!mounted) return;
        setEvent(ev);
        setStages(st as any);
        setItems((it as any[]).sort((a,b)=>+new Date(a.startAt)-+new Date(b.startAt)) as any);
      } finally { if (mounted) setLoading(false); }
    })();
    return () => { mounted = false; };
  }, [eventId]);

  const timeline = useMemo(() => {
    if (!event) return null;
    const start = new Date(event.startAt).getTime();
    const end = new Date(event.endAt).getTime();
    const totalMs = Math.max(end - start, 60*60*1000);
    // ticks each hour
    const ticks: { t:number; label:string }[] = [];
    const first = new Date(start);
    first.setMinutes(0,0,0);
    for (let t = first.getTime(); t <= end; t += 60*60*1000) {
      const d = new Date(t);
      ticks.push({ t, label: d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) });
    }
    return { start, end, totalMs, ticks };
  }, [event]);

  const rows = useMemo(() => {
    const byStage: Record<string, ScheduleItem[]> = {};
    for (const it of items) {
      const key = it.stageId ?? "__no_stage";
      (byStage[key] = byStage[key] || []).push(it);
    }
    const order: { key:string; label:string }[] = [];
    for (const st of stages) order.push({ key: st.id, label: st.name });
    if (byStage["__no_stage"]) order.push({ key: "__no_stage", label: "General" });
    return { byStage, order };
  }, [items, stages]);

  if (!eventId) return <main className="lp-wrap lp-container">Invalid event id</main>;
  if (loading || !timeline) return <main className="lp-wrap lp-container">Loading…</main>;

  return (
    <main className="lp-wrap lp-container space-y-6" onMouseMove={(e)=>{
      if (!drag || !timeline) return;
      const laneEl = (e.currentTarget.querySelector('#gantt-surface') as HTMLElement);
      if (!laneEl) return;
      const rect = laneEl.getBoundingClientRect();
      const dx = e.clientX - drag.startX;
      const pct = dx / rect.width;
      const deltaMs = pct * timeline.totalMs;
      setItems(prev=>prev.map(it=> it.id!==drag.id ? it : ({
        ...it,
        startAt: new Date((drag.mode==='move'||drag.mode==='resize-l')?drag.origStart+deltaMs:drag.origStart).toISOString(),
        endAt: new Date((drag.mode==='move'||drag.mode==='resize-r')?drag.origEnd+deltaMs:drag.origEnd).toISOString(),
      })) as any);
    }} onMouseUp={async()=>{
      if (!drag || !timeline || !eventId) return setDrag(null);
      const it = items.find(i=>i.id===drag.id);
      setDrag(null);
      if (!it) return;
      try { await updateSchedule(eventId, it.id, { startAt: it.startAt, endAt: it.endAt }); }
      catch(e){ console.warn(e); }
    }}>
      <header className="lp-prose">
        <h1>Gantt – {event?.name}</h1>
        <p className="opacity-80">{new Date(event.startAt).toLocaleString()} → {new Date(event.endAt).toLocaleString()}</p>
      </header>

      <section className="lp-card">
        {/* Timeline header */}
        <div className="grid" style={{ gridTemplateColumns: "220px 1fr" }}>
          <div className="px-3 py-2 text-sm font-medium">Stage</div>
          <div className="relative px-3 py-2" id="gantt-surface">
            <div className="absolute inset-0">
              <div className="flex h-full">
                {timeline.ticks.map((tk, i) => (
                  <div key={tk.t}
                       className="border-l border-slate-200 text-xs text-slate-500"
                       style={{ width: `${100/(timeline.ticks.length)}%` }}>
                    <div className="pl-1">{i===0?"":tk.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-slate-200">
          {rows.order.map(r => (
            <div key={r.key} className="grid" style={{ gridTemplateColumns: "220px 1fr" }}>
              <div className="px-3 py-2 text-sm font-medium">{r.label}</div>
              <div className="relative px-3 py-2">
                {/* lane */}
                <div className="absolute inset-0">
                  {/* items in lane */}
                  {(rows.byStage[r.key]||[]).map(it => {
                    const startMs = new Date(it.startAt).getTime();
                    const endMs = new Date(it.endAt).getTime();
                    const left = Math.max(0, ((startMs - timeline.start) / timeline.totalMs) * 100);
                    const width = Math.max(1, ((endMs - startMs) / timeline.totalMs) * 100);
                    return (
                      <div key={it.id}
                           className="absolute h-7 rounded-md bg-blue-600/80 hover:bg-blue-600 text-white text-xs px-2 overflow-hidden whitespace-nowrap text-ellipsis group cursor-move"
                           style={{ left: `${left}%`, width: `${width}%`, top: 6 }}
                           title={`${it.title} (${new Date(it.startAt).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}–${new Date(it.endAt).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})})`}
                           onMouseDown={(evt)=>{
                             if (evt.button!==0) return;
                             const mode = (evt.target as HTMLElement).dataset.handle as any || 'move';
                             setDrag({ id: it.id, mode, startX: evt.clientX, origStart: startMs, origEnd: endMs });
                           }}
                           onDoubleClick={()=>setSelected(it)}
                      >
                        <span className="pointer-events-none">{it.title}</span>
                        {/* resize handles */}
                        <span data-handle="resize-l" className="absolute left-0 top-0 h-full w-2 cursor-ew-resize bg-white/0 group-hover:bg-white/20" />
                        <span data-handle="resize-r" className="absolute right-0 top-0 h-full w-2 cursor-ew-resize bg-white/0 group-hover:bg-white/20" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/30" onClick={()=>setSelected(null)}>
          <div className="lp-card lp-card-lg w-full sm:max-w-xl" onClick={e=>e.stopPropagation()}>
            <div className="flex items-start justify-between">
              <h2 className="text-xl font-semibold">{selected.title}</h2>
              <button className="ui:px-2 ui:py-1 ui:rounded ui:border ui:border-black/10" onClick={()=>setSelected(null)}>Close</button>
            </div>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <Detail label="Kind" value={selected.kind} />
              <Detail label="Time" value={`${new Date(selected.startAt).toLocaleString()} → ${new Date(selected.endAt).toLocaleString()}`} />
              <Detail label="Stage" value={stages.find(s=>s.id===selected.stageId)?.name || "General"} />
              {selected.artist && <Detail label="Artist" value={selected.artist} />}
              {selected.notes && <div className="sm:col-span-2"><div className="text-xs opacity-70 mb-1">Notes</div><div>{selected.notes}</div></div>}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function Detail({ label, value }:{ label:string; value:string }){
  return (
    <div>
      <div className="text-xs opacity-70 mb-1">{label}</div>
      <div>{value}</div>
    </div>
  );
}
