const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
    const res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    if (!res.ok) {
        const error = await res.text();
        throw new Error(error || "API request failed");
    }

    return res.json();
}

export async function getRoster() {
    return fetchAPI("/staffing/roster");
}

export async function getShifts(userId?: string, eventId?: string) {
    const params = new URLSearchParams();
    if (userId) params.append("userId", userId);
    if (eventId) params.append("eventId", eventId);
    return fetchAPI(`/staffing/shifts?${params.toString()}`);
}

export async function createShift(data: any) {
    return fetchAPI("/staffing/shifts", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function getRequests() {
    return fetchAPI("/staffing/requests");
}

export async function createRequest(data: any) {
    return fetchAPI("/staffing/requests", {
        method: "POST",
        body: JSON.stringify(data),
    });
}
