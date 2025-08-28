export default function Home() {
  return (
    <main className="min-h-screen lp-prose">
      <section className="relative overflow-hidden lp-card lp-card-lg lp-hero-bg">
        <h1>LivePro: Production</h1>
        <p className="mt-2">Plan, schedule, and run your event operations.</p>
        <div className="mt-6 ui:flex ui:gap-3">
          <a className="lp-card ui:rounded-md" href="/events">View Events</a>
          <a className="lp-card ui:rounded-md" href="/events">Create Event</a>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <a className="lp-card" href="/events">
          <div className="text-lg font-semibold">Events</div>
          <div className="opacity-70 text-sm mt-1">Browse and create events</div>
        </a>
        <a className="lp-card" href="/events">
          <div className="text-lg font-semibold">Tasks</div>
          <div className="opacity-70 text-sm mt-1">Track work across stages</div>
        </a>
        <a className="lp-card" href="/events">
          <div className="text-lg font-semibold">Schedule</div>
          <div className="opacity-70 text-sm mt-1">Doors, changeovers, and sets</div>
        </a>
      </section>
    </main>
  );
}
