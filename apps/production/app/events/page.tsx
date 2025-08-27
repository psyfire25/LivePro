"use client";
import { useEffect, useState } from "react";
import { listEvents, createEvent } from "@/src/lib/api/client";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [form, setForm] = useState({ name:"", type:"CLUB_NIGHT", startAt:"", endAt:"", location:"" });
  const [loading, setLoading] = useState(false);

  const load = async () => setEvents(await listEvents());
  useEffect(() => { load(); }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await createEvent(form as any);
      setForm({ name:"", type:"CLUB_NIGHT", startAt:"", endAt:"", location:"" });
      await load();
    } catch (e:any) {
      alert(e.message ?? "Failed to create event");
    } finally { setLoading(false); }
  }

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Events</h1>

      <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
        <input className="border rounded p-2" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
        <select className="border rounded p-2" value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
          {["CLUB_NIGHT","CONCERT","FESTIVAL","CONFERENCE","PRIVATE"].map(t=><option key={t} value={t}>{t}</option>)}
        </select>
        <input className="border rounded p-2" type="datetime-local" value={form.startAt} onChange={e=>setForm({...form,startAt:e.target.value})} />
        <input className="border rounded p-2" type="datetime-local" value={form.endAt} onChange={e=>setForm({...form,endAt:e.target.value})} />
        <div className="flex gap-2">
          <input className="border rounded p-2 flex-1" placeholder="Location" value={form.location} onChange={e=>setForm({...form,location:e.target.value})} />
          <button disabled={loading} className="border rounded px-3 py-2">{loading?"…":"Create"}</button>
        </div>
      </form>

      <table className="w-full text-left border">
        <thead>
          <tr className="bg-gray-50"><th className="p-2">Name</th><th className="p-2">Type</th><th className="p-2">Start</th><th className="p-2">End</th></tr>
        </thead>
        <tbody>
          {events.map(ev=>(
            <tr key={ev.id} className="border-t hover:bg-gray-50">
              <td className="p-2"><a className="underline" href={`/events/${ev.id}`}>{ev.name}</a></td>
              <td className="p-2">{ev.type}</td>
              <td className="p-2">{new Date(ev.startAt).toLocaleString()}</td>
              <td className="p-2">{new Date(ev.endAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
