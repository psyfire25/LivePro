const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export async function createEvent(input: {
  name: string;
  type: "CLUB_NIGHT" | "CONCERT" | "FESTIVAL" | "CONFERENCE" | "PRIVATE";
  startAt: string;
  endAt: string;
  location?: string;
}) {
  const res = await fetch(`${BASE}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || "Failed to create event");
  }
  return res.json();
}

export async function getEvents() {
  const res = await fetch(`${BASE}/events`);
  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
}

export async function getShifts() {
  const res = await fetch(`${BASE}/staffing/shifts`);
  if (!res.ok) throw new Error("Failed to fetch shifts");
  return res.json();
}

export async function getStaffingRequests() {
  const res = await fetch(`${BASE}/staffing/requests`);
  if (!res.ok) throw new Error("Failed to fetch staffing requests");
  return res.json();
}

export async function getDashboardStats() {
  try {
    const [events, shifts, requests] = await Promise.all([
      getEvents().catch(() => []),
      getShifts().catch(() => []),
      getStaffingRequests().catch(() => []),
    ]);

    const now = new Date();

    // Count active productions (events that haven't ended yet)
    const activeProductions = events.filter((e: any) => {
      const endDate = new Date(e.endAt);
      return endDate > now;
    }).length;

    // Count upcoming events (events that start in the future)
    const upcomingEvents = events.filter((e: any) => {
      const startDate = new Date(e.startAt);
      return startDate > now;
    }).length;

    // Count staff on-site (current shifts)
    const staffOnSite = shifts.filter((s: any) => {
      if (!s.startTime || !s.endTime) return false;
      const start = new Date(s.startTime);
      const end = new Date(s.endTime);
      return start <= now && end >= now;
    }).length;

    // Count pending requests
    const pendingRequests = requests.filter((r: any) => r.status === 'PENDING').length;

    return {
      activeProductions,
      upcomingEvents,
      staffOnSite,
      pendingInvoices: pendingRequests, // Using pending requests as a proxy for invoices
    };
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error);
    // Return default values if API is unavailable
    return {
      activeProductions: 0,
      upcomingEvents: 0,
      staffOnSite: 0,
      pendingInvoices: 0,
    };
  }
}

export async function getRecentActivity() {
  try {
    const events = await getEvents().catch(() => []);

    // Get the most recent events (sorted by creation date)
    return events
      .sort((a: any, b: any) => {
        const aDate = new Date(a.createdAt || a.startAt);
        const bDate = new Date(b.createdAt || b.startAt);
        return bDate.getTime() - aDate.getTime();
      })
      .slice(0, 5)
      .map((event: any) => ({
        id: event.id,
        title: `New production created: "${event.name}"`,
        timestamp: event.createdAt || event.startAt,
        app: 'Production App',
      }));
  } catch (error) {
    console.error('Failed to fetch recent activity:', error);
    return [];
  }
}
