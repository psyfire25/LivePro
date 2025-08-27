"use client";
import { useEffect, useMemo, useState } from "react";
import { getEvent, listStages, createStage, listTasks, createTask, listSchedule, createSchedule, updateTaskStatus } from "@/src/lib/api/client";

export default function EventDetail({ params }: { params: { id: string } }) {
  const eventId = params.id;
  const [ev, setEv] = useState<any|null>(null);
  const [stages, setStages] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [schedule, setSchedule] = useState<any[]>([]);
  const [newStage, setNewStage] = useState("");
  const [newTask, setNewTask] = useState({ title:"", description:"", stageId:"", priority:"MEDIUM" as any, dueAt:"" });
  const [sched, setSched] = useState({ title:"", kind:"PERFORMANCE", stageId:"", startAt:"", endAt:"", notes:"", artist:"" });

  const load = async () => {
    const [e, s, t, sc] = await Promise.all([getEvent(eventId), listStages(eventId), listTasks(eventId), listSchedule(eventId)]);
    setEv(e); setStages(s); setTasks(t); setSchedule(sc);
  };

  useEffect(()=>{ load(); }, [eventId]);

  const stageOptions = useMemo(()=> stages.map(s=>({ value:s.id, label:s.name })), [stages]);

  async function addStage(e: React.FormEvent) {
    e.preventDefault();
    if (!newStage.trim()) return;
    await createStage(eventId, newStage.trim());
    setNewStage(""); await load();
  }

  async function addTask(e: React.FormEvent) {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    await createTask(eventId, newTask);
    setNewTask({ title:"", description:"", stageId:"", priority:"MEDIUM", dueAt:"" } as any);
    await load();
  }

  async function addSchedule(e: React.FormEvent) {
    e.preventDefault();
    if (!sched.title.trim() || !sched.startAt || !sched.endAt) return;
    await createSchedule(eventId, { ...sched, stageId: sched.stageId || undefined } as any);
    setSched({ title:"", kind:"PERFORMANCE", stageId:"", startAt:"", endAt:"", notes:"", artist:"" });
    await load();
  }

  if (!ev) return <main className="p-6">Loading…</main>;

  return (
    <main className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{ev.name}</h1>
          <p className="text-sm text-gray-600">{ev.type} • {new Date(ev.startAt).toLocaleString()} → {new Date(ev.endAt).toLocaleString()} {ev.location ? `• ${ev.location}` : ""}</p>
        </div>
        <a className="underline" href="/events">Back to events</a>
      </div>

      {/* Stages */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Stages</h2>
        <form onSubmit={addStage} className="flex gap-2">
          <input className="border rounded p-2" placeholder="New stage name" value={newStage} onChange={e=>setNewStage(e.target.value)} />
          <button className="border rounded px-3">Add Stage</button>
        </form>
        <ul className="list-disc ml-6">
          {stages.map(s => <li key={s.id}>{s.name}</li>)}
        </ul>
      </section>

      {/* Tasks */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Tasks</h2>
        <form onSubmit={addTask} className="grid grid-cols-1 md:grid-cols-5 gap-2 items-end">
          <input className="border rounded p-2" placeholder="Title" value={newTask.title} onChange={e=>setNewTask({...newTask, title:e.target.value})} />
          <input className="border rounded p-2" placeholder="Description" value={newTask.description} onChange={e=>setNewTask({...newTask, description:e.target.value})} />
          <select className="border rounded p-2" value={newTask.stageId} onChange={e=>setNewTask({...newTask, stageId:e.target.value})}>
            <option value="">(No stage)</option>
            {stageOptions.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <select className="border rounded p-2" value={newTask.priority} onChange={e=>setNewTask({...newTask, priority:e.target.value as any})}>
            {["LOW","MEDIUM","HIGH","CRITICAL"].map(p=><option key={p} value={p}>{p}</option>)}
          </select>
          <div className="flex gap-2">
            <input className="border rounded p-2" type="datetime-local" value={newTask.dueAt} onChange={e=>setNewTask({...newTask, dueAt:e.target.value})} />
            <button className="border rounded px-3">Add Task</button>
          </div>
        </form>

        <table className="w-full text-left border">
          <thead><tr className="bg-gray-50"><th className="p-2">Title</th><th className="p-2">Stage</th><th className="p-2">Priority</th><th className="p-2">Status</th><th className="p-2">Due</th></tr></thead>
          <tbody>
            {tasks.map(t=>(
              <tr key={t.id} className="border-t">
                <td className="p-2">{t.title}</td>
                <td className="p-2">{stages.find(s=>s.id===t.stageId)?.name ?? "-"}</td>
                <td className="p-2">{t.priority}</td>
                <td className="p-2">
                  <select
                    className="border rounded p-1"
                    value={t.status}
                    onChange={async e => { await updateTaskStatus(eventId, t.id, e.target.value as any); await load(); }}
                  >
                    {["TODO","IN_PROGRESS","BLOCKED","DONE"].map(s=><option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td className="p-2">{t.dueAt ? new Date(t.dueAt).toLocaleString() : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Schedule */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Schedule</h2>
        <form onSubmit={addSchedule} className="grid grid-cols-1 md:grid-cols-6 gap-2 items-end">
          <input className="border rounded p-2" placeholder="Title" value={sched.title} onChange={e=>setSched({...sched, title:e.target.value})} />
          <select className="border rounded p-2" value={sched.kind} onChange={e=>setSched({...sched, kind:e.target.value})}>
            {["DOORS","PERFORMANCE","CHANGEOVER","CURFEW","NOTE"].map(k=><option key={k} value={k}>{k}</option>)}
          </select>
          <select className="border rounded p-2" value={sched.stageId} onChange={e=>setSched({...sched, stageId:e.target.value})}>
            <option value="">(Site-wide)</option>
            {stages.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <input className="border rounded p-2" type="datetime-local" value={sched.startAt} onChange={e=>setSched({...sched, startAt:e.target.value})} />
          <input className="border rounded p-2" type="datetime-local" value={sched.endAt} onChange={e=>setSched({...sched, endAt:e.target.value})} />
          <div className="flex gap-2">
            <input className="border rounded p-2 flex-1" placeholder="Artist/Notes" value={sched.artist || sched.notes} onChange={e=>setSched({...sched, artist:e.target.value, notes:e.target.value})} />
            <button className="border rounded px-3">Add</button>
          </div>
        </form>

        {schedule.length ? (
          <ul className="space-y-1">
            {schedule.map(i=>(
              <li key={i.id} className="border rounded p-2">
                <b>{i.title}</b> — {i.kind} • {i.stageId ? (stages.find(s=>s.id===i.stageId)?.name) : "Site"}
                {' '}• {new Date(i.startAt).toLocaleTimeString()} → {new Date(i.endAt).toLocaleTimeString()}
                {i.artist ? ` • ${i.artist}` : ""} {i.notes ? ` — ${i.notes}` : ""}
              </li>
            ))}
          </ul>
        ) : <p className="text-gray-600">No schedule items yet.</p>}
      </section>
    </main>
  );
}
