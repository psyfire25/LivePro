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

