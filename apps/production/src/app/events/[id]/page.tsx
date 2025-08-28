"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  getEvent,
  createStage,
  listStages,
  createTask,
  listTasks,
  listSchedule,
  createSchedule,
  updateTaskStatus,
} from "../../../lib/api/client";

type TaskStatus = "TODO" | "IN_PROGRESS" | "BLOCKED" | "DONE";
type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
type ScheduleKind = "DOORS" | "PERFORMANCE" | "CHANGEOVER" | "CURFEW" | "NOTE";

export default function EventDetailPage() {
  const params = useParams<{ id: string }>();
  const eventId = useMemo(() => (Array.isArray(params?.id) ? params.id[0] : params?.id), [params]);

  const [event, setEvent] = useState<any | null>(null);
  const [stages, setStages] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [schedule, setSchedule] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [stageName, setStageName] = useState("");
  const [task, setTask] = useState<{ title: string; description?: string; priority: TaskPriority; dueAt?: string; stageId?: string }>({ title: "", description: "", priority: "MEDIUM" });
  const [sched, setSched] = useState<{ title: string; kind: ScheduleKind; startAt: string; endAt: string; stageId?: string; notes?: string; artist?: string }>({ title: "", kind: "DOORS", startAt: "", endAt: "" });

  async function loadAll() {
    if (!eventId) return;
    setLoading(true);
    try {
      const [ev, st, ts, sc] = await Promise.all([
        getEvent(eventId),
        listStages(eventId),
        listTasks(eventId),
        listSchedule(eventId),
      ]);
      setEvent(ev);
      setStages(st);
      setTasks(ts);
      setSchedule(sc);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  async function onCreateStage(e: React.FormEvent) {
    e.preventDefault();
    if (!stageName.trim()) return;
    await createStage(eventId!, stageName.trim());
    setStageName("");
    await loadAll();
  }

  async function onCreateTask(e: React.FormEvent) {
    e.preventDefault();
    if (!task.title.trim()) return;
    await createTask(eventId!, { ...task, dueAt: task.dueAt || undefined, description: task.description || undefined, stageId: task.stageId || undefined });
    setTask({ title: "", description: "", priority: "MEDIUM" });
    await loadAll();
  }

  async function onCreateSchedule(e: React.FormEvent) {
    e.preventDefault();
    if (!sched.title.trim() || !sched.startAt || !sched.endAt) return;
    await createSchedule(eventId!, { ...sched, notes: sched.notes || undefined, artist: sched.artist || undefined, stageId: sched.stageId || undefined });
    setSched({ title: "", kind: "DOORS", startAt: "", endAt: "" });
    await loadAll();
  }

  async function onUpdateTaskStatus(taskId: string, status: TaskStatus) {
    await updateTaskStatus(eventId!, taskId, status);
    await loadAll();
  }

  if (!eventId) return <main className="p-6">Invalid event id</main>;

  return (
    <main className="p-6 space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Event</h1>
          {event && (
            <p className="text-sm opacity-70">{event.name} · {event.type} · {new Date(event.startAt).toLocaleString()} → {new Date(event.endAt).toLocaleString()}</p>
          )}
        </div>
        <a href="/events" className="underline">Back to events</a>
      </div>

      {loading && <p>Loading…</p>}

      {!loading && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="space-y-3">
            <h2 className="text-lg font-medium">Stages</h2>
            <form onSubmit={onCreateStage} className="flex gap-2">
              <input className="border rounded p-2 flex-1" placeholder="Stage name" value={stageName} onChange={e=>setStageName(e.target.value)} />
              <button className="border rounded px-3 py-2">Add</button>
            </form>
            <ul className="divide-y border rounded">
              {stages.map(s => (
                <li key={s.id} className="p-2 flex items-center justify-between">
                  <span>{s.name}</span>
                </li>
              ))}
              {stages.length === 0 && <li className="p-2 text-sm opacity-60">No stages</li>}
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-medium">Tasks</h2>
            <form onSubmit={onCreateTask} className="grid grid-cols-1 gap-2">
              <input className="border rounded p-2" placeholder="Title" value={task.title} onChange={e=>setTask({...task, title:e.target.value})} />
              <textarea className="border rounded p-2" placeholder="Description" value={task.description||""} onChange={e=>setTask({...task, description:e.target.value})} />
              <div className="flex gap-2">
                <select className="border rounded p-2" value={task.priority} onChange={e=>setTask({...task, priority: e.target.value as TaskPriority})}>
                  {["LOW","MEDIUM","HIGH","CRITICAL"].map(p=>(<option key={p} value={p}>{p}</option>))}
                </select>
                <input className="border rounded p-2" type="datetime-local" value={task.dueAt||""} onChange={e=>setTask({...task, dueAt:e.target.value})} />
                <select className="border rounded p-2" value={task.stageId||""} onChange={e=>setTask({...task, stageId:e.target.value||undefined})}>
                  <option value="">No stage</option>
                  {stages.map(s=>(<option key={s.id} value={s.id}>{s.name}</option>))}
                </select>
                <button className="border rounded px-3">Add</button>
              </div>
            </form>
            <ul className="divide-y border rounded">
              {tasks.map(t => (
                <li key={t.id} className="p-2 grid grid-cols-5 gap-2 items-center">
                  <div className="col-span-2">
                    <div className="font-medium">{t.title}</div>
                    {t.description && <div className="text-sm opacity-70">{t.description}</div>}
                  </div>
                  <div className="text-sm">{t.stage?.name || stages.find(s=>s.id===t.stageId)?.name || "—"}</div>
                  <div className="text-sm">{t.dueAt ? new Date(t.dueAt).toLocaleString() : ""}</div>
                  <div className="flex gap-2 items-center">
                    <select className="border rounded p-1" value={t.status} onChange={e=>onUpdateTaskStatus(t.id, e.target.value as TaskStatus)}>
                      {["TODO","IN_PROGRESS","BLOCKED","DONE"].map(s=>(<option key={s} value={s}>{s}</option>))}
                    </select>
                    <span className="text-xs opacity-70">{t.priority}</span>
                  </div>
                </li>
              ))}
              {tasks.length === 0 && <li className="p-2 text-sm opacity-60">No tasks</li>}
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-medium">Schedule</h2>
            <form onSubmit={onCreateSchedule} className="grid grid-cols-1 gap-2">
              <input className="border rounded p-2" placeholder="Title" value={sched.title} onChange={e=>setSched({...sched, title:e.target.value})} />
              <div className="flex gap-2">
                <select className="border rounded p-2" value={sched.kind} onChange={e=>setSched({...sched, kind: e.target.value as ScheduleKind})}>
                  {["DOORS","PERFORMANCE","CHANGEOVER","CURFEW","NOTE"].map(k=>(<option key={k} value={k}>{k}</option>))}
                </select>
                <input className="border rounded p-2" type="datetime-local" value={sched.startAt} onChange={e=>setSched({...sched, startAt:e.target.value})} />
                <input className="border rounded p-2" type="datetime-local" value={sched.endAt} onChange={e=>setSched({...sched, endAt:e.target.value})} />
              </div>
              <div className="flex gap-2">
                <select className="border rounded p-2" value={sched.stageId||""} onChange={e=>setSched({...sched, stageId: e.target.value||undefined})}>
                  <option value="">No stage</option>
                  {stages.map(s=>(<option key={s.id} value={s.id}>{s.name}</option>))}
                </select>
                <input className="border rounded p-2 flex-1" placeholder="Artist (optional)" value={sched.artist||""} onChange={e=>setSched({...sched, artist:e.target.value})} />
              </div>
              <textarea className="border rounded p-2" placeholder="Notes (optional)" value={sched.notes||""} onChange={e=>setSched({...sched, notes:e.target.value})} />
              <button className="border rounded px-3 py-2">Add</button>
            </form>
            <ul className="divide-y border rounded">
              {schedule.map(it => (
                <li key={it.id} className="p-2 grid grid-cols-5 gap-2">
                  <div className="font-medium">{it.title}</div>
                  <div>{it.kind}</div>
                  <div className="text-sm">{new Date(it.startAt).toLocaleString()}</div>
                  <div className="text-sm">{new Date(it.endAt).toLocaleString()}</div>
                  <div className="text-sm">{stages.find(s=>s.id===it.stageId)?.name || "—"}</div>
                </li>
              ))}
              {schedule.length === 0 && <li className="p-2 text-sm opacity-60">No schedule items</li>}
            </ul>
          </section>
        </div>
      )}
    </main>
  );
}

