"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { listEvents, createEvent } from "../lib/api/client";
import { Input, Button, FormModal, Card, Gradient } from "@repo/ui";
import { useWorkspaceRole, hasMinRole } from "@/lib/auth/role";
import type { API } from "@livepro/api-types";

type EventFormData = API.components["schemas"]["CreateEventDto"];
type Event = { id: string; name: string };

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
      <div className="ui:space-y-8 ui:py-8">
        {error && !loading && (
          <section className="lp-card lp-card-lg bg-red-50 border border-red-200">
            <h2 className="text-red-900">Configuration Error</h2>
            <p className="text-red-800 mt-2">{error}</p>
            <p className="text-red-700 text-sm mt-4">Please ensure the API_URL environment variable is configured in Vercel.</p>
          </section>
        )}

        {!loading && hasEvents === false && !error ? (
          <section className="ui:relative ui:overflow-hidden lp-card lp-card-lg ui:text-center ui:py-20">
            <Gradient className="ui:opacity-20" />
            <div className="ui:relative ui:z-10 ui:max-w-md ui:mx-auto">
              <h1 className="ui:text-3xl ui:font-bold ui:mb-4">Create your first production</h1>
              <p className="ui:text-lg ui:opacity-70 ui:mb-8">
                Kick off by creating your first event. You can add stages, build a
                schedule, and assign tasks once it&apos;s created.
              </p>
              <Button onClick={() => setShowCreateModal(true)} className="ui:w-full sm:ui:w-auto">
                Create Your First Event
              </Button>
            </div>
          </section>
        ) : (
          <>
            <section className="ui:relative ui:overflow-hidden lp-card lp-card-lg lp-hero-bg ui:min-h-[300px] ui:flex ui:flex-col ui:justify-center">
              <Gradient className="ui:opacity-30" conic />
              <div className="ui:relative ui:z-10">
                <h1 className="ui:text-5xl ui:font-bold ui:tracking-tight">Production</h1>
                <p className="ui:mt-4 ui:text-xl ui:opacity-80 ui:max-w-2xl">
                  Plan, schedule, and run your event operations with precision.
                </p>
                <div className="ui:mt-8 ui:flex ui:gap-4">
                  <Link href="/events">
                    <Button variant="outline" className="ui:bg-white/50 ui:backdrop-blur-sm hover:ui:bg-white/80">
                      View All Events
                    </Button>
                  </Link>
                  <Button onClick={() => setShowCreateModal(true)}>
                    Create New Event
                  </Button>
                </div>
              </div>
            </section>

            <section className="ui:grid ui:gap-6 sm:ui:grid-cols-2 md:ui:grid-cols-3">
              <Card title="Management" href="/events">
                Manage your events, master schedules, and operational tasks.
              </Card>

              {hasMinRole(role, "MANAGER") && (
                <Card title="Production Build" href="/sections/build">
                  Configure stages, technical specifications, and equipment lists.
                </Card>
              )}

              {hasMinRole(role, "MANAGER") && (
                <Card title="Logistics" href="/sections/logistics">
                  Manage crew assignments, supplier contracts, and transport.
                </Card>
              )}
            </section>
          </>
        )}
      </div>

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
              className="ui:block ui:text-sm ui:font-medium ui:text-gray-500 ui:mb-1"
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
              className="ui:block ui:text-sm ui:font-medium ui:text-gray-500 ui:mb-1"
            >
              Event Type
            </label>
            <select
              id="type"
              name="type"
              required
              className="ui:w-full ui:h-9 ui:rounded-md ui:border ui:border-black/15 dark:ui:border-white/15 ui:bg-transparent ui:px-3 ui:py-2 ui:text-sm ui:focus-visible:ui:outline-none ui:focus-visible:ui:ring-2 ui:focus-visible:ui:ring-black/20 dark:ui:focus-visible:ui:ring-white/20"
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
                className="ui:block ui:text-sm ui:font-medium ui:text-gray-500 ui:mb-1"
              >
                Start Date & Time
              </label>
              <Input type="datetime-local" id="startAt" name="startAt" required />
            </div>

            <div>
              <label
                htmlFor="endAt"
                className="ui:block ui:text-sm ui:font-medium ui:text-gray-500 ui:mb-1"
              >
                End Date & Time
              </label>
              <Input type="datetime-local" id="endAt" name="endAt" required />
            </div>
          </div>

          <div>
            <label
              htmlFor="location"
              className="ui:block ui:text-sm ui:font-medium ui:text-gray-500 ui:mb-1"
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