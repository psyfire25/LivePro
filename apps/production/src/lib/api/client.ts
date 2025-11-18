// Optional: import OpenAPI types when generated; not required to run dev
// import type { API } from "@livepro/api-types";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export async function listEvents() {
  const res = await fetch(`${BASE}/events`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to list events");
  return res.json() as Promise<any[]>;
}

export async function createEvent(input: {
  name: string; type: "CLUB_NIGHT"|"CONCERT"|"FESTIVAL"|"CONFERENCE"|"PRIVATE";
  startAt: string; endAt: string; location?: string;
}) {
  const res = await fetch(`${BASE}/events`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(input)
  });
  if (!res.ok) throw new Error("Failed to create event");
  return res.json();
}

export async function getEvent(id: string) {
  const res = await fetch(`${BASE}/events/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load event");
  return res.json() as Promise<any>;
}

export async function listStages(eventId: string) {
  const res = await fetch(`${BASE}/events/${eventId}/stages`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to list stages");
  return res.json() as Promise<any[]>;
}

export async function createStage(eventId: string, name: string) {
  const res = await fetch(`${BASE}/events/${eventId}/stages`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name })
  });
  if (!res.ok) throw new Error("Failed to create stage");
  return res.json();
}

export async function listTasks(eventId: string) {
  const res = await fetch(`${BASE}/events/${eventId}/tasks`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to list tasks");
  return res.json() as Promise<any[]>;
}

export async function createTask(eventId: string, task: {
  title: string; description?: string; priority?: "LOW"|"MEDIUM"|"HIGH"|"CRITICAL"; dueAt?: string; stageId?: string;
}) {
  const res = await fetch(`${BASE}/events/${eventId}/tasks`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(task)
  });
  if (!res.ok) throw new Error("Failed to create task");
  return res.json();
}

export async function updateTaskStatus(eventId: string, taskId: string, status: "TODO"|"IN_PROGRESS"|"BLOCKED"|"DONE") {
  const res = await fetch(`${BASE}/events/${eventId}/tasks/${taskId}/status`, {
    method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status })
  });
  if (!res.ok) throw new Error("Failed to update task");
  return res.json();
}

export async function listSchedule(eventId: string) {
  const res = await fetch(`${BASE}/events/${eventId}/schedule`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to list schedule");
  return res.json() as Promise<any[]>;
}

export async function createSchedule(eventId: string, item: {
  title: string; kind: "DOORS"|"PERFORMANCE"|"CHANGEOVER"|"CURFEW"|"NOTE";
  startAt: string; endAt: string; stageId?: string; notes?: string; artist?: string;
}) {
  const res = await fetch(`${BASE}/events/${eventId}/schedule`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(item)
  });
  if (!res.ok) throw new Error("Failed to create schedule item");
  return res.json();
}

export async function updateSchedule(eventId: string, id: string, patch: Partial<{
  title: string; kind: "DOORS"|"PERFORMANCE"|"CHANGEOVER"|"CURFEW"|"NOTE";
  startAt: string; endAt: string; stageId?: string; notes?: string; artist?: string;
}>) {
  const res = await fetch(`${BASE}/events/${eventId}/schedule/${id}`, {
    method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch)
  });
  if (!res.ok) throw new Error("Failed to update schedule item");
  return res.json();
}

// Workspace role/membership
export async function getMembership(workspaceId: string, userId: string) {
  const res = await fetch(`${BASE}/workspaces/${workspaceId}/members/${userId}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json() as Promise<{ id: string; workspaceId: string; userId: string; role: string } | null>;
}

export async function upsertMembership(workspaceId: string, userId: string, role: 'DIRECTOR'|'MANAGER'|'LEAD'|'STAFF') {
  const res = await fetch(`${BASE}/workspaces/${workspaceId}/members`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId, role })
  });
  if (!res.ok) throw new Error('Failed to upsert membership');
  return res.json();
}
