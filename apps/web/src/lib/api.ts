const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export type EventType =
  | "CLUB_NIGHT"
  | "CONCERT"
  | "FESTIVAL"
  | "CONFERENCE"
  | "PRIVATE";

export type EventInput = {
  name: string;
  type: EventType;
  startAt: string;
  endAt: string;
  location?: string;
};

export type Event = EventInput & {
  id: string;
  createdAt?: string | null;
};

export type Shift = {
  id: string;
  startTime?: string;
  endTime?: string;
};

export type StaffingRequestStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | string;

export type StaffingRequest = {
  id: string;
  status: StaffingRequestStatus;
};

export type DashboardStats = {
  activeProductions: number;
  upcomingEvents: number;
  staffOnSite: number;
  pendingInvoices: number;
};

export type RecentActivityItem = {
  id: string;
  title: string;
  timestamp: string;
  app: string;
};

export async function createEvent(input: EventInput): Promise<Event> {
  const res = await fetch(`${BASE}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || "Failed to create event");
  }

  return (await res.json()) as Event;
}

export async function getEvents(): Promise<Event[]> {
  const res = await fetch(`${BASE}/events`);
  if (!res.ok) throw new Error("Failed to fetch events");
  return (await res.json()) as Event[];
}

export async function getShifts(): Promise<Shift[]> {
  const res = await fetch(`${BASE}/staffing/shifts`);
  if (!res.ok) throw new Error("Failed to fetch shifts");
  return (await res.json()) as Shift[];
}

export async function getStaffingRequests(): Promise<StaffingRequest[]> {
  const res = await fetch(`${BASE}/staffing/requests`);
  if (!res.ok) throw new Error("Failed to fetch staffing requests");
  return (await res.json()) as StaffingRequest[];
}

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const [events, shifts, requests] = await Promise.all([
      getEvents().catch(() => [] as Event[]),
      getShifts().catch(() => [] as Shift[]),
      getStaffingRequests().catch(() => [] as StaffingRequest[]),
    ]);

    const now = new Date();

    const activeProductions = events.filter((e) => {
      const endDate = new Date(e.endAt);
      return endDate > now;
    }).length;

    const upcomingEvents = events.filter((e) => {
      const startDate = new Date(e.startAt);
      return startDate > now;
    }).length;

    const staffOnSite = shifts.filter((s) => {
      if (!s.startTime || !s.endTime) return false;
      const start = new Date(s.startTime);
      const end = new Date(s.endTime);
      return start <= now && end >= now;
    }).length;

    const pendingRequests = requests.filter(
      (r) => r.status === "PENDING",
    ).length;

    return {
      activeProductions,
      upcomingEvents,
      staffOnSite,
      pendingInvoices: pendingRequests,
    };
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    return {
      activeProductions: 0,
      upcomingEvents: 0,
      staffOnSite: 0,
      pendingInvoices: 0,
    };
  }
}

export async function getRecentActivity(): Promise<RecentActivityItem[]> {
  try {
    const events = await getEvents().catch(() => [] as Event[]);

    return events
      .sort((a, b) => {
        const aDate = new Date(a.createdAt ?? a.startAt);
        const bDate = new Date(b.createdAt ?? b.startAt);
        return bDate.getTime() - aDate.getTime();
      })
      .slice(0, 5)
      .map((event) => ({
        id: event.id,
        title: `New production created: "${event.name}"`,
        timestamp: event.createdAt ?? event.startAt,
        app: "Production App",
      }));
  } catch (error) {
    console.error("Failed to fetch recent activity:", error);
    return [];
  }
}