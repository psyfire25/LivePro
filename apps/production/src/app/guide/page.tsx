export default function GuidePage(){
  return (
    <main className="lp-wrap lp-container lp-prose space-y-8">
      <section className="lp-card lp-card-lg">
        <h1>Welcome to LivePro: Production</h1>
        <p>This short guide walks you through the core features using a demo event we seeded for you.</p>
        <ol>
          <li>
            <strong>Open the demo event:</strong> <a className="ui:underline" href="/events/demo-event">Event overview</a>
          </li>
          <li>
            <strong>View the schedule timeline:</strong> Open the <a className="ui:underline" href="/events/demo-event/gantt">Gantt view</a> and try dragging or resizing items – changes persist.
          </li>
          <li>
            <strong>Add tasks and stages:</strong> From the event overview you can see stages and recent tasks.
          </li>
          <li>
            <strong>Create your own production:</strong> Head to <a className="ui:underline" href="/events">Events</a> and click Create.
          </li>
        </ol>
      </section>
      <section className="grid sm:grid-cols-3 gap-3">
        <a className="lp-card" href="/events">Events</a>
        <a className="lp-card" href="/events/demo-event">Demo event</a>
        <a className="lp-card" href="/events/demo-event/gantt">Gantt</a>
      </section>
    </main>
  );
}

