import Link from "next/link";
import { Card, Tile, Gradient, Button } from "@repo/ui";

export default function Home() {
  return (
    <>
      <section className="ui:relative ui:overflow-hidden lp-card lp-card-lg lp-hero-bg ui:min-h-[300px] ui:flex ui:flex-col ui:justify-center ui:mx-6 ui:my-8">
        <Gradient className="ui:opacity-30" conic />
        <div className="ui:relative ui:z-10">
          <h1 className="ui:text-5xl ui:font-bold ui:tracking-tight">Staffing</h1>
          <p className="ui:mt-4 ui:text-xl ui:opacity-80 ui:max-w-2xl">
            Manage your crews, coordinate shifts, and ensure perfect event execution.
          </p>
          <div className="ui:mt-8 ui:flex ui:gap-4">
            <Button>View Schedule</Button>
            <Button variant="outline" className="ui:bg-white/50 ui:backdrop-blur-sm hover:ui:bg-white/80">
              Manage Crews
            </Button>
          </div>
        </div>
      </section>

      <div className="ui:grid ui:gap-6 md:ui:grid-cols-2 lg:ui:grid-cols-4 ui:mx-6 ui:my-8">
        <Tile title="Active Crews" subtitle="12 crews deployed" selected />
        <Tile title="Pending Shifts" subtitle="5 shifts need approval" />
        <Tile title="Availability" subtitle="85% workforce available" />
        <Tile title="Next Event" subtitle="Summer Festival - 2 days" />
      </div>

      <section className="ui:grid ui:gap-6 sm:ui:grid-cols-2 ui:mx-6 ui:my-8">
        <Card title="Crews" href="/crews">
          Manage crew profiles, skills, and certifications.
        </Card>
        <Card title="Shifts" href="/shifts">
          Plan and assign shifts for upcoming events.
        </Card>
        <Card title="Availability" href="/availability">
          Track crew availability and time off requests.
        </Card>
        <Card title="Reports" href="/reports">
          View staffing costs, hours worked, and performance metrics.
        </Card>
      </section>
    </>
  );
}
