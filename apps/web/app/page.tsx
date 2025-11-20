"use client";
import { Reveal } from "@repo/motion";
import { Button, Modal, InfoModal } from "@repo/ui";
import { useState, useEffect } from "react";

const apps = [
  {
    name: "Production",
    url: "http://localhost:3010",
    icon: "🎬",
    description: "Event production management",
  },
  {
    name: "Talent",
    url: "http://localhost:3020",
    icon: "🎤",
    description: "Artist & talent coordination",
  },
  {
    name: "Staffing",
    url: "http://localhost:3030",
    icon: "👥",
    description: "Crew scheduling & management",
  },
  {
    name: "Finance",
    url: "http://localhost:3040",
    icon: "💰",
    description: "Budgets, quotes & invoices",
  },
];

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [showAppSelector, setShowAppSelector] = useState(false);

  useEffect(() => {
    // Show welcome modal for new users
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
    if (!hasSeenWelcome) {
      setShowWelcome(true);
    }
  }, []);

  const handleCloseWelcome = () => {
    localStorage.setItem("hasSeenWelcome", "true");
    setShowWelcome(false);
  };

  const links = [
    { href: "/onboarding", label: "Get Started (Onboarding)" },
    { href: "http://localhost:3010", label: "Production" },
    { href: "http://localhost:3030", label: "Staffing" },
    { href: "http://localhost:3020", label: "Talent" },
    { href: "http://localhost:3040", label: "Finance" },
    { href: "http://localhost:4000/docs", label: "API Docs (Nest)" },
  ];

  return (
    <>
      <main className="mx-auto max-w-5xl p-8 space-y-8 lp-prose">
        <Reveal variant="fade-up">
          <section className="relative overflow-hidden lp-card lp-card-lg lp-hero-bg">
            <h1>LivePro</h1>
            <p className="mt-2 max-w-2xl">
              A modular suite for live event production: plan shows, staff
              crews, coordinate talent, and reconcile finances — all in one
              place.
            </p>
            <div className="mt-6 flex gap-3">
              <Button asChild>
                <a href="/onboarding">Start Onboarding</a>
              </Button>
              <Button variant="outline" onClick={() => setShowAppSelector(true)}>
                Browse Apps
              </Button>
            </div>
          </section>
        </Reveal>

        <Reveal variant="fade-up" delay={100}>
          <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {links.slice(1).map((l) => (
              <a key={l.href} className="lp-card" href={l.href}>
                <div className="text-lg font-semibold">{l.label}</div>
                <div className="opacity-70 text-sm mt-1">{l.href}</div>
              </a>
            ))}
          </section>
        </Reveal>
      </main>

      {/* Welcome Modal */}
      <Modal
        isOpen={showWelcome}
        onClose={handleCloseWelcome}
        title="Welcome to LivePro!"
        size="lg"
        footer={
          <Button variant="primary" onClick={handleCloseWelcome}>
            Get Started
          </Button>
        }
      >
        <div className="ui:space-y-4">
          <p className="ui:text-gray-300">
            LivePro is your complete live event management platform. Here's what
            you can do:
          </p>

          <div className="ui:space-y-3">
            <div className="ui:flex ui:gap-3">
              <div className="ui:text-2xl">🎬</div>
              <div>
                <h4 className="ui:font-semibold">Production</h4>
                <p className="ui:text-sm ui:text-gray-600">
                  Plan events, manage stages, and coordinate logistics
                </p>
              </div>
            </div>

            <div className="ui:flex ui:gap-3">
              <div className="ui:text-2xl">🎤</div>
              <div>
                <h4 className="ui:font-semibold">Talent</h4>
                <p className="ui:text-sm ui:text-gray-600">
                  Book artists, manage riders, and track contracts
                </p>
              </div>
            </div>

            <div className="ui:flex ui:gap-3">
              <div className="ui:text-2xl">👥</div>
              <div>
                <h4 className="ui:font-semibold">Staffing</h4>
                <p className="ui:text-sm ui:text-gray-600">
                  Schedule crew, manage shifts, and track availability
                </p>
              </div>
            </div>

            <div className="ui:flex ui:gap-3">
              <div className="ui:text-2xl">💰</div>
              <div>
                <h4 className="ui:font-semibold">Finance</h4>
                <p className="ui:text-sm ui:text-gray-600">
                  Create budgets, generate invoices, and track expenses
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* App Selector Modal */}
      <Modal
        isOpen={showAppSelector}
        onClose={() => setShowAppSelector(false)}
        title="Select an App"
        size="lg"
      >
        <div className="ui:grid ui:grid-cols-2 ui:gap-4">
          {apps.map((app) => (
            <a
              key={app.name}
              href={app.url}
              className="ui:block ui:p-4 ui:border ui:border-gray-200 ui:rounded-md hover:ui:bg-gray-50 hover:ui:border-gray-300 ui:transition-colors ui:no-underline"
            >
              <div className="ui:text-3xl ui:mb-2">{app.icon}</div>
              <h3 className="ui:font-semibold ui:text-gray-900">{app.name}</h3>
              <p className="ui:text-sm ui:text-gray-600 ui:mt-1">
                {app.description}
              </p>
            </a>
          ))}
        </div>
      </Modal>
    </>
  );
}
