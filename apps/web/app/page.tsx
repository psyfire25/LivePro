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

  const stats = [
    { label: "Active Productions", value: "3", icon: "🎬", color: "ui:bg-blue-500" },
    { label: "Upcoming Events", value: "12", icon: "📅", color: "ui:bg-purple-500" },
    { label: "Staff On-Site", value: "45", icon: "👥", color: "ui:bg-green-500" },
    { label: "Pending Invoices", value: "5", icon: "💰", color: "ui:bg-yellow-500" },
  ];

  return (
    <>
      <div className="ui:space-y-8">
        <div className="ui:flex ui:items-center ui:justify-between">
          <div>
            <h1 className="ui:text-2xl ui:font-bold ui:text-gray-900 dark:ui:text-white">Dashboard</h1>
            <p className="ui:text-gray-500 dark:ui:text-gray-400">Welcome back to LivePro Command Center.</p>
          </div>
          <div className="ui:flex ui:gap-3">
            <Button variant="outline" onClick={() => setShowAppSelector(true)}>
              Quick Launch
            </Button>
            <Button asChild>
              <a href="/onboarding">Onboarding</a>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="ui:grid ui:grid-cols-1 sm:ui:grid-cols-2 lg:ui:grid-cols-4 ui:gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="ui:bg-white dark:ui:bg-gray-800 ui:p-6 ui:rounded-xl ui:border ui:border-gray-200 dark:ui:border-gray-700 ui:shadow-sm ui:flex ui:items-center ui:gap-4">
              <div className={`ui:w-12 ui:h-12 ui:rounded-lg ${stat.color} ui:flex ui:items-center ui:justify-center ui:text-2xl ui:text-white`}>
                {stat.icon}
              </div>
              <div>
                <div className="ui:text-2xl ui:font-bold ui:text-gray-900 dark:ui:text-white">{stat.value}</div>
                <div className="ui:text-sm ui:text-gray-500 dark:ui:text-gray-400">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity / Apps */}
        <div className="ui:grid ui:grid-cols-1 lg:ui:grid-cols-3 ui:gap-8">
          <div className="lg:ui:col-span-2 ui:space-y-6">
            <section className="ui:bg-white dark:ui:bg-gray-800 ui:rounded-xl ui:border ui:border-gray-200 dark:ui:border-gray-700 ui:shadow-sm ui:overflow-hidden">
              <div className="ui:p-6 ui:border-b ui:border-gray-200 dark:ui:border-gray-700">
                <h3 className="ui:font-semibold ui:text-lg">Recent Activity</h3>
              </div>
              <div className="ui:divide-y ui:divide-gray-200 dark:ui:divide-gray-700">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="ui:p-4 ui:flex ui:items-center ui:gap-4 hover:ui:bg-gray-50 dark:hover:ui:bg-gray-750 ui:transition-colors">
                    <div className="ui:w-2 ui:h-2 ui:rounded-full ui:bg-blue-500"></div>
                    <div className="ui:flex-1">
                      <p className="ui:text-sm ui:font-medium ui:text-gray-900 dark:ui:text-white">New production created: "Summer Festival"</p>
                      <p className="ui:text-xs ui:text-gray-500">2 hours ago • Production App</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="ui:space-y-6">
            <section className="ui:bg-white dark:ui:bg-gray-800 ui:rounded-xl ui:border ui:border-gray-200 dark:ui:border-gray-700 ui:shadow-sm ui:overflow-hidden">
              <div className="ui:p-6 ui:border-b ui:border-gray-200 dark:ui:border-gray-700">
                <h3 className="ui:font-semibold ui:text-lg">Quick Access</h3>
              </div>
              <div className="ui:p-2">
                {apps.map((app) => (
                  <a
                    key={app.name}
                    href={app.url}
                    className="ui:flex ui:items-center ui:gap-3 ui:p-3 ui:rounded-lg hover:ui:bg-gray-50 dark:hover:ui:bg-gray-750 ui:transition-colors ui:no-underline ui:text-gray-900 dark:ui:text-white"
                  >
                    <span className="ui:text-xl">{app.icon}</span>
                    <span className="ui:font-medium">{app.name}</span>
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

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
