"use client";
import { useEffect, useState } from "react";
import { listEvents, createEvent } from "../lib/api/client";
import { Input, Button, FormModal } from "@repo/ui";
import { useWorkspaceRole, hasMinRole } from "@/lib/auth/role";

export default function Home() {
  const { role } = useWorkspaceRole();
  const [loading, setLoading] = useState(true);
  const [hasEvents, setHasEvents] = useState<boolean | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    type: "CONCERT",
    startAt: "",
    endAt: "",
    location: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const events = await listEvents();
        setHasEvents((events as any[])?.length > 0);
        // Auto-open modal if no events
        if ((events as any[])?.length === 0) {
          setShowCreateModal(true);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleSubmit(data: any) {
    const eventData = {
      name: data.name,
      type: data.type,
      startAt: data.startAt,
      endAt: data.endAt,
      location: data.location || "",
    };
    await createEvent(eventData as any);
    window.location.href = "/events";
  }

  return (
    <>
      <main className="min-h-screen lp-prose space-y-8">
        {/* First‑time focus: create your first event */}
        {!loading && hasEvents === false ? (
          <section className="lp-card lp-card-lg">
            <h1 className="mb-2">Create your first production</h1>
            <p className="opacity-80">
              Kick off by creating your first event. You can add stages, build a
              schedule, and assign tasks once it's created.
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
              <p className="mt-2">Plan, schedule, and run your event operations.</p>
              <div className="mt-6 ui:flex ui:gap-3">
                <a className="lp-card ui:rounded-md" href="/events">
                  View Events
                </a>
                <Button onClick={() => setShowCreateModal(true)}>
                  Create Event
                </Button>
              </div>
            </section>

            <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              <a className="lp-card" href="/events">
                <div className="text-lg font-semibold">
                  Production Management
                </div>
                <div className="opacity-70 text-sm mt-1">
                  Events, schedules, tasks
                </div>
              </a>
              {hasMinRole(role, "MANAGER") && (
                <a className="lp-card" href="/sections/build">
                  <div className="text-lg font-semibold">Production Build</div>
                  <div className="opacity-70 text-sm mt-1">
                    Stages, tech specs, equipment
                  </div>
                </a>
              )}
              {hasMinRole(role, "MANAGER") && (
                <a className="lp-card" href="/sections/logistics">
                  <div className="text-lg font-semibold">Logistics</div>
                  <div className="opacity-70 text-sm mt-1">
                    Crew, suppliers, transport
                  </div>
                </a>
              )}
            </section>
          </>
        )}
      </main>

      {/* Create Event Modal */}
      <FormModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Event"
        onSubmit={handleSubmit}
        submitText="Create Event"
        size="lg"
      >
        <div>
          <label
            htmlFor="name"
            className="ui:block ui:text-sm ui:font-medium ui:mb-1"
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
            className="ui:block ui:text-sm ui:font-medium ui:mb-1"
          >
            Event Type
          </label>
          <select
            id="type"
            name="type"
            required
            className="ui:w-full ui:h-9 ui:rounded-md ui:border ui:border-gray-300 ui:bg-white ui:px-3 ui:text-sm"
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
              className="ui:block ui:text-sm ui:font-medium ui:mb-1"
            >
              Start Date & Time
            </label>
            <Input type="datetime-local" id="startAt" name="startAt" required />
          </div>

          <div>
            <label
              htmlFor="endAt"
              className="ui:block ui:text-sm ui:font-medium ui:mb-1"
            >
              End Date & Time
            </label>
            <Input type="datetime-local" id="endAt" name="endAt" required />
          </div>
        </div>

        <div>
          <label
            htmlFor="location"
            className="ui:block ui:text-sm ui:font-medium ui:mb-1"
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
      </FormModal>
    </>
  );
}

