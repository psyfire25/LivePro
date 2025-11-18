# Modal Integration Examples for Web App

This document provides practical examples of using the Modal component in the Web (main portal) app.

## Common Use Cases

### 1. User Onboarding Welcome Modal

```tsx
"use client";
import { useState, useEffect } from "react";
import { Modal, Button } from "@repo/ui";

export function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show welcome modal for new users
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
    if (!hasSeenWelcome) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("hasSeenWelcome", "true");
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Welcome to LivePro!"
      size="lg"
      footer={
        <Button variant="primary" onClick={handleClose}>
          Get Started
        </Button>
      }
    >
      <div className="ui:space-y-4">
        <p className="ui:text-gray-700">
          LivePro is your complete live event management platform. Here's what you can do:
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
  );
}
```

### 2. App Selector Modal

```tsx
"use client";
import { useState } from "react";
import { Modal, Button } from "@repo/ui";

const apps = [
  {
    name: "Production",
    url: "http://localhost:3010",
    icon: "🎬",
    description: "Event production management"
  },
  {
    name: "Talent",
    url: "http://localhost:3020",
    icon: "🎤",
    description: "Artist & talent coordination"
  },
  {
    name: "Staffing",
    url: "http://localhost:3030",
    icon: "👥",
    description: "Crew scheduling & management"
  },
  {
    name: "Finance",
    url: "http://localhost:3040",
    icon: "💰",
    description: "Budgets, quotes & invoices"
  },
];

export function AppSelectorButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Browse Apps</Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
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
```

### 3. Help/Documentation Modal

```tsx
"use client";
import { useState } from "react";
import { InfoModal, Button } from "@repo/ui";

export function HelpButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="ghost" onClick={() => setIsOpen(true)}>
        Help
      </Button>

      <InfoModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Getting Help"
        size="md"
      >
        <div className="ui:space-y-4">
          <p className="ui:text-gray-700">
            Need help getting started? Here are some resources:
          </p>

          <div className="ui:space-y-3">
            <a
              href="http://localhost:3000"
              className="ui:block ui:p-3 ui:bg-blue-50 ui:rounded-md hover:ui:bg-blue-100 ui:transition-colors"
            >
              <div className="ui:font-semibold ui:text-blue-900">
                📚 Documentation
              </div>
              <div className="ui:text-sm ui:text-blue-700">
                Comprehensive guides and tutorials
              </div>
            </a>

            <a
              href="http://localhost:4000/docs"
              className="ui:block ui:p-3 ui:bg-green-50 ui:rounded-md hover:ui:bg-green-100 ui:transition-colors"
            >
              <div className="ui:font-semibold ui:text-green-900">
                🔧 API Documentation
              </div>
              <div className="ui:text-sm ui:text-green-700">
                Technical API reference
              </div>
            </a>

            <div className="ui:p-3 ui:bg-gray-50 ui:rounded-md">
              <div className="ui:font-semibold ui:text-gray-900">
                💬 Support
              </div>
              <div className="ui:text-sm ui:text-gray-700">
                Email: support@livepro.com
              </div>
            </div>
          </div>
        </div>
      </InfoModal>
    </>
  );
}
```

### 4. Quick Actions Modal

```tsx
"use client";
import { useState } from "react";
import { Modal, Button } from "@repo/ui";

export function QuickActionsButton() {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      label: "Create Event",
      icon: "🎬",
      href: "http://localhost:3010/events/new",
    },
    {
      label: "Add Artist",
      icon: "🎤",
      href: "http://localhost:3020/artists/new",
    },
    {
      label: "Schedule Crew",
      icon: "👥",
      href: "http://localhost:3030/shifts/new",
    },
    {
      label: "Create Budget",
      icon: "💰",
      href: "http://localhost:3040/budgets/new",
    },
  ];

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Quick Actions</Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Quick Actions"
        size="md"
      >
        <div className="ui:grid ui:grid-cols-2 ui:gap-3">
          {actions.map((action) => (
            <a
              key={action.label}
              href={action.href}
              className="ui:flex ui:items-center ui:gap-3 ui:p-3 ui:border ui:border-gray-200 ui:rounded-md hover:ui:bg-gray-50 hover:ui:border-gray-300 ui:transition-colors ui:no-underline"
            >
              <span className="ui:text-2xl">{action.icon}</span>
              <span className="ui:font-medium ui:text-gray-900">
                {action.label}
              </span>
            </a>
          ))}
        </div>
      </Modal>
    </>
  );
}
```

### 5. Workspace Switcher (if multi-workspace)

```tsx
"use client";
import { useState } from "react";
import { SelectionModal, Button } from "@repo/ui";

interface Workspace {
  id: string;
  name: string;
  role: string;
}

export function WorkspaceSwitcher({ workspaces }: { workspaces: Workspace[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentWorkspace, setCurrentWorkspace] = useState(workspaces[0]);

  const handleSelect = async (workspace: Workspace) => {
    // Switch workspace
    await fetch("/api/workspace/switch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ workspaceId: workspace.id }),
    });
    setCurrentWorkspace(workspace);
    window.location.reload();
  };

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        {currentWorkspace.name}
      </Button>

      <SelectionModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Switch Workspace"
        items={workspaces}
        onSelect={handleSelect}
        keyExtractor={(ws) => ws.id}
        renderItem={(ws) => (
          <div>
            <div className="ui:font-medium">{ws.name}</div>
            <div className="ui:text-sm ui:text-gray-500">{ws.role}</div>
          </div>
        )}
        searchable
      />
    </>
  );
}
```

## Integration Checklist

- [ ] Add welcome modal for new users
- [ ] Create app selector modal
- [ ] Add help/documentation modal
- [ ] Implement quick actions
- [ ] Add workspace switcher (if needed)
- [ ] Test all navigation links
- [ ] Mobile responsiveness

## Best Practices

1. **First impressions matter** - Welcome modal should be visually appealing
2. **Make navigation easy** - App selector should be accessible
3. **Provide help** - Always have a help button visible
4. **Quick actions** - Let users jump to common tasks
5. **Test links** - Ensure all modal links work in development and production
