export default function Page(){
  return (
    <main className="lp-wrap lp-container lp-prose space-y-6">
      <section className="lp-card lp-card-lg">
        <h1>Production Management</h1>
        <p className="opacity-80">Central hub for events, schedules, and tasks.</p>
        <div className="grid sm:grid-cols-3 gap-3 mt-4">
          <a className="lp-card" href="/events">Events</a>
          <a className="lp-card" href="/events">Schedules</a>
          <a className="lp-card" href="/events">Tasks</a>
        </div>
      </section>
    </main>
  );
}

