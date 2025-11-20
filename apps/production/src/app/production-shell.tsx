"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { listEvents, createEvent } from "../lib/api/client";
import { Input, Button, FormModal } from "@repo/ui";
import { useWorkspaceRole, hasMinRole } from "@/lib/auth/role";
import type { API } from "@livepro/api-types";

type EventFormData = API.components["schemas"]["CreateEventDto"];
// if EventBase exists:
type Event = { id: string; name: string }; // minimal for listEvents result


type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export function ProductionShell({ searchParams }: Props) {
  const { role } = useWorkspaceRole();
  const [loading, setLoading] = useState(true);
  const [hasEvents, setHasEvents] = useState<boolean | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const view = (searchParams?.view as string | undefined) ?? "default";

  useEffect(() => {
    (async () => {
      try {
        const events = (await listEvents()) as Event[];
        setHasEvents(events?.length > 0);
        if (events?.length === 0) setShowCreateModal(true);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load events';
        console.error('Error loading events:', message);
        setError(message);
        setHasEvents(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

async function handleSubmit(data: Record<string, unknown>) {
  const typed: EventFormData = {
    name: String(data.name ?? ""),
    type: (data.type ?? "CONCERT") as EventFormData["type"],
    startAt: String(data.startAt ?? ""),
    endAt: String(data.endAt ?? ""),
    location: data.location ? String(data.location) : undefined,
  };

  await createEvent(typed);
  window.location.href = "/events";
}

  return (
    <>
      <main className="min-h-screen lp-prose space-y-8">
        {error && !loading && (
          <section className="lp-card lp-card-lg bg-red-50 border border-red-200">
            <h2 className="text-red-900">Configuration Error</h2>
            <p className="text-red-800 mt-2">{error}</p>
            <p className="text-red-700 text-sm mt-4">Please ensure the API_URL environment variable is configured in Vercel.</p>
          </section>
        )}
        {!loading && hasEvents === false && !error ? (
          <section className="lp-card lp-card-lg">
            <h1 className="mb-2">Create your first production</h1>
            <p className="opacity-80">
              Kick off by creating your first event. You can add stages, build a
              schedule, and assign tasks once it&apos;s created.
            </p>
            <div className="mt-6">
              <Button onClick={() => setShowCreateModal(true)}>
                Create Your First Event
              </Button>
            </div>
          </section>
        ) : (
          <>
            <section className="relative overflow-hidden lp-card lp-card-lg lp-hero-bg">
              <h1>LivePro: Production</h1>
              <p className="mt-2">
                Plan, schedule, and run your event operations. (View: {view})
              </p>
              <div className="mt-6 ui:flex ui:gap-3">
                <Link className="lp-card ui:rounded-md" href="/events">
                  View Events
                </Link>
                <Button onClick={() => setShowCreateModal(true)}>
                  Create Event
                </Button>
              </div>
            </section>

            <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              <Link className="lp-card" href="/events">
                <div className="text-lg font-semibold">
                  Production Management
                </div>
                <div className="opacity-70 text-sm mt-1">
                  Events, schedules, tasks
                </div>
              </Link>
              {hasMinRole(role, "MANAGER") && (
                <Link className="lp-card" href="/sections/build">
                  <div className="text-lg font-semibold">Production Build</div>
                  <div className="opacity-70 text-sm mt-1">
                    Stages, tech specs, equipment
                  </div>
                </Link>
              )}
              {hasMinRole(role, "MANAGER") && (
                <Link className="lp-card" href="/sections/logistics">
                  <div className="text-lg font-semibold">Logistics</div>
                  <div className="opacity-70 text-sm mt-1">
                    Crew, suppliers, transport
                  </div>
                </Link>
              )}
            </section>
          </>
        )}
      </main>

      <FormModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Event"
        onSubmit={handleSubmit}
        submitText="Create Event"
        size="lg"
      >
        <div className="ui:space-y-4">
          <div>
            <label
              htmlFor="name"
              className="ui:block ui:text-sm ui:font-medium ui:text-gray-300 ui:mb-2"
            >
              Event Name
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="e.g., Summer Music Festival 2025"
              required
            />
          </div>

          <div>
            <label
              htmlFor="type"
              className="ui:block ui:text-sm ui:font-medium ui:text-gray-300 ui:mb-2"
            >
              Event Type
            </label>
            <select
              id="type"
              name="type"
              required
              className="ui:w-full ui:h-9 ui:rounded-md ui:border ui:border-black/15 dark:ui:border-white/15 ui:bg-white dark:ui:bg-slate-900 ui:px-3 ui:py-2 ui:text-sm ui:text-black dark:ui:text-white ui:focus-visible:ui:outline-none ui:focus-visible:ui:ring-2 ui:focus-visible:ui:ring-black/20 dark:ui:focus-visible:ui:ring-white/20"
              defaultValue="CONCERT"
            >
              <option value="CONCERT">Concert</option>
              <option value="FESTIVAL">Festival</option>
              <option value="CLUB_NIGHT">Club Night</option>
              <option value="CONFERENCE">Conference</option>
              <option value="PRIVATE">Private Event</option>
            </select>
          </div>

          <div className="ui:grid ui:grid-cols-2 ui:gap-4">
            <div>
              <label
                htmlFor="startAt"
                className="ui:block ui:text-sm ui:font-medium ui:text-gray-300 ui:mb-2"
              >
                Start Date & Time
              </label>
              <Input type="datetime-local" id="startAt" name="startAt" required />
            </div>

            <div>
              <label
                htmlFor="endAt"
                className="ui:block ui:text-sm ui:font-medium ui:text-gray-300 ui:mb-2"
              >
                End Date & Time
              </label>
              <Input type="datetime-local" id="endAt" name="endAt" required />
            </div>
          </div>

          <div>
            <label
              htmlFor="location"
              className="ui:block ui:text-sm ui:font-medium ui:text-gray-300 ui:mb-2"
            >
              Location (Optional)
            </label>
            <Input
              type="text"
              id="location"
              name="location"
              placeholder="e.g., Madison Square Garden, New York"
            />
          </div>
        </div>
      </FormModal>
    </>
  );
}