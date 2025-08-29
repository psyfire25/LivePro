"use client";
import { useEffect, useState } from "react";
import { listEvents, createEvent } from "../../lib/api/client";
import { Card } from "@repo/ui/card";
import { Gradient } from "@repo/ui/gradient";
import { Input } from "@repo/ui/src/components/ui/input";
import { Button } from "@repo/ui/src/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/src/components/ui/tabs";
import { Reveal } from "@repo/motion";

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
    <main className="p-6 space-y-6 lp-prose">
      
      <Reveal variant="fade-up"><h1>Events</h1></Reveal>

      <Tabs defaultValue="list" className="ui:bg-transparent">
        <TabsList>
          <TabsTrigger value="list">All Events</TabsTrigger>
          <TabsTrigger value="create">Create Event</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="ui:mt-4">
          <form onSubmit={submit} className="ui:grid ui:grid-cols-1 md:ui:grid-cols-5 ui:gap-3 ui:items-end">
            <Input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
            <select className="ui:h-9 ui:rounded-md ui:border ui:border-black/15 ui:bg-white ui:px-3 ui:text-sm" value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
              {["CLUB_NIGHT","CONCERT","FESTIVAL","CONFERENCE","PRIVATE"].map(t=><option key={t} value={t}>{t}</option>)}
            </select>
            <Input type="datetime-local" value={form.startAt} onChange={e=>setForm({...form,startAt:e.target.value})} />
            <Input type="datetime-local" value={form.endAt} onChange={e=>setForm({...form,endAt:e.target.value})} />
            <div className="ui:flex ui:gap-2">
              <Input className="ui:flex-1" placeholder="Location" value={form.location} onChange={e=>setForm({...form,location:e.target.value})} />
              <Button disabled={loading}>{loading?"…":"Create"}</Button>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="list" className="ui:mt-4">
          <table className="ui:w-full ui:text-left ui:border ui:rounded-md ui:overflow-hidden">
            <thead>
              <tr className="ui:bg-black/5"><th className="ui:p-2">Name</th><th className="ui:p-2">Type</th><th className="ui:p-2">Start</th><th className="ui:p-2">End</th></tr>
            </thead>
            <tbody>
              {events.map(ev=>(
                <tr key={ev.id} className="ui:border-t hover:ui:bg-black/5">
                  <td className="ui:p-2 ui:flex ui:items-center ui:gap-3">
                    <a className="ui:underline" href={`/events/${ev.id}`}>{ev.name}</a>
                    <a className="ui:text-xs ui:underline ui:opacity-70" href={`/events/${ev.id}/gantt`}>Gantt</a>
                  </td>
                  <td className="ui:p-2">{ev.type}</td>
                  <td className="ui:p-2">{new Date(ev.startAt).toLocaleString()}</td>
                  <td className="ui:p-2">{new Date(ev.endAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabsContent>
      </Tabs>
    </main>
  );
}
