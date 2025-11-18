# Modal Integration Examples for Production App

This document provides practical examples of using the Modal component in the Production app.

## Common Use Cases

### 1. Delete Event Confirmation

```tsx
"use client";
import { useConfirmDialog } from "@repo/ui";
import { Button } from "@repo/ui";

export function EventCard({ event }) {
  const { confirm, ConfirmDialog } = useConfirmDialog();

  const handleDelete = async () => {
    confirm({
      title: "Delete Event",
      message: `Are you sure you want to delete "${event.name}"? This action cannot be undone.`,
      confirmText: "Delete",
      variant: "danger",
      onConfirm: async () => {
        // Delete the event
        await fetch(`/api/events/${event.id}`, { method: "DELETE" });
        // Refresh the page or update state
      },
    });
  };

  return (
    <>
      <div className="event-card">
        <h3>{event.name}</h3>
        <Button variant="ghost" onClick={handleDelete}>
          Delete
        </Button>
      </div>
      <ConfirmDialog />
    </>
  );
}
```

### 2. Create New Event Form

```tsx
"use client";
import { useState } from "react";
import { FormModal, Button, Input } from "@repo/ui";

export function CreateEventButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (data: any) => {
    await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    // Refresh events list
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Create Event</Button>

      <FormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Create New Event"
        onSubmit={handleSubmit}
        submitText="Create Event"
        size="lg"
      >
        <div>
          <label htmlFor="name" className="ui:block ui:text-sm ui:font-medium ui:mb-1">
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
          <label htmlFor="date" className="ui:block ui:text-sm ui:font-medium ui:mb-1">
            Event Date
          </label>
          <Input type="date" id="date" name="date" required />
        </div>

        <div>
          <label htmlFor="venue" className="ui:block ui:text-sm ui:font-medium ui:mb-1">
            Venue
          </label>
          <Input
            type="text"
            id="venue"
            name="venue"
            placeholder="e.g., Madison Square Garden"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="ui:block ui:text-sm ui:font-medium ui:mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="ui:w-full ui:px-3 ui:py-2 ui:border ui:border-gray-300 ui:rounded-md"
            placeholder="Event description..."
          />
        </div>
      </FormModal>
    </>
  );
}
```

### 3. Add Stage to Event

```tsx
"use client";
import { useState } from "react";
import { FormModal, Button, Input } from "@repo/ui";

export function AddStageButton({ eventId }: { eventId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (data: any) => {
    await fetch(`/api/events/${eventId}/stages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Add Stage</Button>

      <FormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add Stage"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="stageName" className="ui:block ui:text-sm ui:font-medium ui:mb-1">
            Stage Name
          </label>
          <Input
            type="text"
            id="stageName"
            name="name"
            placeholder="e.g., Main Stage"
            required
          />
        </div>

        <div>
          <label htmlFor="capacity" className="ui:block ui:text-sm ui:font-medium ui:mb-1">
            Capacity
          </label>
          <Input
            type="number"
            id="capacity"
            name="capacity"
            placeholder="e.g., 5000"
          />
        </div>
      </FormModal>
    </>
  );
}
```

### 4. Assign Task Modal

```tsx
"use client";
import { useState } from "react";
import { SelectionModal, Button } from "@repo/ui";

interface CrewMember {
  id: string;
  name: string;
  role: string;
}

export function AssignTaskButton({ taskId, crewMembers }: {
  taskId: string;
  crewMembers: CrewMember[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = async (member: CrewMember) => {
    await fetch(`/api/tasks/${taskId}/assign`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ assigneeId: member.id }),
    });
  };

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        Assign
      </Button>

      <SelectionModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Assign Task"
        items={crewMembers}
        onSelect={handleSelect}
        keyExtractor={(member) => member.id}
        renderItem={(member) => (
          <div>
            <div className="ui:font-medium">{member.name}</div>
            <div className="ui:text-sm ui:text-gray-500">{member.role}</div>
          </div>
        )}
        searchable
      />
    </>
  );
}
```

### 5. Event Details Info Modal

```tsx
"use client";
import { useState } from "react";
import { InfoModal, Button } from "@repo/ui";

export function EventInfoButton({ event }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="ghost" onClick={() => setIsOpen(true)}>
        View Details
      </Button>

      <InfoModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={event.name}
        size="lg"
      >
        <div className="ui:space-y-4">
          <div>
            <h4 className="ui:font-semibold ui:mb-1">Date</h4>
            <p className="ui:text-gray-700">{event.date}</p>
          </div>
          <div>
            <h4 className="ui:font-semibold ui:mb-1">Venue</h4>
            <p className="ui:text-gray-700">{event.venue}</p>
          </div>
          <div>
            <h4 className="ui:font-semibold ui:mb-1">Description</h4>
            <p className="ui:text-gray-700">{event.description}</p>
          </div>
          <div>
            <h4 className="ui:font-semibold ui:mb-1">Stages</h4>
            <ul className="ui:list-disc ui:list-inside ui:text-gray-700">
              {event.stages?.map((stage) => (
                <li key={stage.id}>{stage.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </InfoModal>
    </>
  );
}
```

## Integration Checklist

- [x] Modal component available from `@repo/ui`
- [x] Modal patterns (useConfirmDialog, FormModal, etc.) available
- [ ] Integrate delete confirmations for events, stages, tasks
- [ ] Add create/edit forms using FormModal
- [ ] Use SelectionModal for assignments
- [ ] Add InfoModal for viewing details
- [ ] Test all modals on mobile devices
- [ ] Ensure proper error handling in forms

## Best Practices

1. **Always use ConfirmDialog for destructive actions** - Prevents accidental deletions
2. **Use FormModal for all forms** - Consistent UX across the app
3. **Handle loading states** - Show loading indicators during async operations
4. **Provide clear error messages** - Help users understand what went wrong
5. **Mobile-first** - Test all modals on mobile devices
6. **Accessibility** - Modal component has built-in accessibility features

## Next Steps

1. Replace existing confirmation dialogs with `useConfirmDialog`
2. Convert existing forms to use `FormModal`
3. Add selection modals where appropriate
4. Ensure all modals follow the same patterns
