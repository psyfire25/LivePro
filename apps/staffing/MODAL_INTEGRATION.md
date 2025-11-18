# Modal Integration Examples for Staffing App

This document provides practical examples of using the Modal component in the Staffing app.

## Common Use Cases

### 1. Add Crew Member

```tsx
"use client";
import { useState } from "react";
import { FormModal, Button, Input } from "@repo/ui";

export function AddCrewButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (data: any) => {
    await fetch("/api/crew", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Add Crew Member</Button>

      <FormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add Crew Member"
        onSubmit={handleSubmit}
        size="lg"
      >
        <div>
          <label htmlFor="name" className="ui:block ui:text-sm ui:font-medium ui:mb-1">
            Full Name
          </label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="John Doe"
            required
          />
        </div>

        <div>
          <label htmlFor="role" className="ui:block ui:text-sm ui:font-medium ui:mb-1">
            Primary Role
          </label>
          <select
            id="role"
            name="role"
            required
            className="ui:w-full ui:px-3 ui:py-2 ui:border ui:border-gray-300 ui:rounded-md"
          >
            <option value="">Select role...</option>
            <option value="stage-tech">Stage Technician</option>
            <option value="sound-engineer">Sound Engineer</option>
            <option value="lighting-tech">Lighting Technician</option>
            <option value="rigger">Rigger</option>
            <option value="runner">Runner</option>
          </select>
        </div>

        <div>
          <label htmlFor="email" className="ui:block ui:text-sm ui:font-medium ui:mb-1">
            Email
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="john@example.com"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="ui:block ui:text-sm ui:font-medium ui:mb-1">
            Phone
          </label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            placeholder="+1 (555) 123-4567"
            required
          />
        </div>

        <div>
          <label htmlFor="certifications" className="ui:block ui:text-sm ui:font-medium ui:mb-1">
            Certifications
          </label>
          <Input
            type="text"
            id="certifications"
            name="certifications"
            placeholder="e.g., ETCP, OSHA"
          />
        </div>

        <div>
          <label htmlFor="hourlyRate" className="ui:block ui:text-sm ui:font-medium ui:mb-1">
            Hourly Rate
          </label>
          <Input
            type="number"
            id="hourlyRate"
            name="hourlyRate"
            placeholder="25.00"
            step="0.01"
          />
        </div>
      </FormModal>
    </>
  );
}
```

### 2. Create Shift Assignment

```tsx
"use client";
import { useState } from "react";
import { FormModal, Button, Input } from "@repo/ui";

export function CreateShiftButton({ eventId }: { eventId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (data: any) => {
    await fetch("/api/shifts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, eventId }),
    });
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Create Shift</Button>

      <FormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Create Shift"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="role" className="ui:block ui:text-sm ui:font-medium ui:mb-1">
            Role
          </label>
          <select
            id="role"
            name="role"
            required
            className="ui:w-full ui:px-3 ui:py-2 ui:border ui:border-gray-300 ui:rounded-md"
          >
            <option value="">Select role...</option>
            <option value="stage-tech">Stage Technician</option>
            <option value="sound-engineer">Sound Engineer</option>
            <option value="lighting-tech">Lighting Technician</option>
          </select>
        </div>

        <div className="ui:grid ui:grid-cols-2 ui:gap-4">
          <div>
            <label htmlFor="startTime" className="ui:block ui:text-sm ui:font-medium ui:mb-1">
              Start Time
            </label>
            <Input type="datetime-local" id="startTime" name="startTime" required />
          </div>

          <div>
            <label htmlFor="endTime" className="ui:block ui:text-sm ui:font-medium ui:mb-1">
              End Time
            </label>
            <Input type="datetime-local" id="endTime" name="endTime" required />
          </div>
        </div>

        <div>
          <label htmlFor="positions" className="ui:block ui:text-sm ui:font-medium ui:mb-1">
            Number of Positions
          </label>
          <Input
            type="number"
            id="positions"
            name="positions"
            min="1"
            defaultValue="1"
            required
          />
        </div>

        <div>
          <label htmlFor="notes" className="ui:block ui:text-sm ui:font-medium ui:mb-1">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            className="ui:w-full ui:px-3 ui:py-2 ui:border ui:border-gray-300 ui:rounded-md"
            placeholder="Shift notes or requirements..."
          />
        </div>
      </FormModal>
    </>
  );
}
```

### 3. Assign Crew to Shift

```tsx
"use client";
import { useState } from "react";
import { SelectionModal, Button } from "@repo/ui";

interface CrewMember {
  id: string;
  name: string;
  role: string;
  isAvailable: boolean;
  hourlyRate: number;
}

export function AssignCrewButton({ shift, crew }: {
  shift: { id: string; role: string };
  crew: CrewMember[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Filter crew by role and availability
  const availableCrew = crew.filter(
    (member) => member.role === shift.role && member.isAvailable
  );

  const handleSelect = async (member: CrewMember) => {
    await fetch(`/api/shifts/${shift.id}/assign`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ crewId: member.id }),
    });
  };

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        Assign Crew
      </Button>

      <SelectionModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={`Assign ${shift.role}`}
        items={availableCrew}
        onSelect={handleSelect}
        keyExtractor={(member) => member.id}
        renderItem={(member) => (
          <div className="ui:flex ui:justify-between ui:items-center">
            <div>
              <div className="ui:font-medium">{member.name}</div>
              <div className="ui:text-sm ui:text-gray-500">{member.role}</div>
            </div>
            <div className="ui:text-sm ui:text-gray-600">
              ${member.hourlyRate}/hr
            </div>
          </div>
        )}
        searchable
      />
    </>
  );
}
```

### 4. Remove Crew from Shift

```tsx
"use client";
import { useConfirmDialog, Button } from "@repo/ui";

export function RemoveCrewButton({ shift, crew }) {
  const { confirm, ConfirmDialog } = useConfirmDialog();

  const handleRemove = () => {
    confirm({
      title: "Remove Crew Member",
      message: `Are you sure you want to remove ${crew.name} from this shift?`,
      confirmText: "Remove",
      variant: "danger",
      onConfirm: async () => {
        await fetch(`/api/shifts/${shift.id}/crew/${crew.id}`, {
          method: "DELETE",
        });
      },
    });
  };

  return (
    <>
      <Button variant="ghost" onClick={handleRemove}>
        Remove
      </Button>
      <ConfirmDialog />
    </>
  );
}
```

### 5. View Crew Schedule

```tsx
"use client";
import { useState } from "react";
import { Modal, Button } from "@repo/ui";

export function ViewScheduleButton({ crewMember, shifts }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        View Schedule
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={`${crewMember.name}'s Schedule`}
        size="lg"
      >
        <div className="ui:space-y-4">
          {shifts.length === 0 ? (
            <p className="ui:text-gray-500 ui:text-center ui:py-8">
              No upcoming shifts
            </p>
          ) : (
            shifts.map((shift) => (
              <div
                key={shift.id}
                className="ui:p-4 ui:border ui:border-gray-200 ui:rounded-md"
              >
                <div className="ui:flex ui:justify-between ui:items-start">
                  <div>
                    <h4 className="ui:font-semibold">{shift.event}</h4>
                    <p className="ui:text-sm ui:text-gray-600">{shift.role}</p>
                  </div>
                  <span className="ui:text-sm ui:text-gray-500">
                    {shift.duration} hours
                  </span>
                </div>
                <div className="ui:mt-2 ui:text-sm ui:text-gray-700">
                  {shift.startTime} - {shift.endTime}
                </div>
              </div>
            ))
          )}
        </div>
      </Modal>
    </>
  );
}
```

### 6. Update Crew Availability

```tsx
"use client";
import { useState } from "react";
import { Modal, Button } from "@repo/ui";

export function UpdateAvailabilityButton({ crewId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [availability, setAvailability] = useState<{
    startDate: string;
    endDate: string;
    reason: string;
  }>({
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleSubmit = async () => {
    await fetch(`/api/crew/${crewId}/availability`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(availability),
    });
    setIsOpen(false);
  };

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        Set Unavailability
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Set Unavailability"
        footer={
          <div className="ui:flex ui:gap-3 ui:justify-end">
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save
            </Button>
          </div>
        }
      >
        <div className="ui:space-y-4">
          <div>
            <label className="ui:block ui:text-sm ui:font-medium ui:mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={availability.startDate}
              onChange={(e) =>
                setAvailability({ ...availability, startDate: e.target.value })
              }
              className="ui:w-full ui:px-3 ui:py-2 ui:border ui:border-gray-300 ui:rounded-md"
            />
          </div>

          <div>
            <label className="ui:block ui:text-sm ui:font-medium ui:mb-1">
              End Date
            </label>
            <input
              type="date"
              value={availability.endDate}
              onChange={(e) =>
                setAvailability({ ...availability, endDate: e.target.value })
              }
              className="ui:w-full ui:px-3 ui:py-2 ui:border ui:border-gray-300 ui:rounded-md"
            />
          </div>

          <div>
            <label className="ui:block ui:text-sm ui:font-medium ui:mb-1">
              Reason (Optional)
            </label>
            <input
              type="text"
              value={availability.reason}
              onChange={(e) =>
                setAvailability({ ...availability, reason: e.target.value })
              }
              className="ui:w-full ui:px-3 ui:py-2 ui:border ui:border-gray-300 ui:rounded-md"
              placeholder="e.g., Vacation, Medical leave"
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
```

## Integration Checklist

- [ ] Add crew member forms
- [ ] Create shift assignment modals
- [ ] Implement crew selection for shifts
- [ ] Add schedule viewing modals
- [ ] Set up availability management
- [ ] Add delete confirmations
- [ ] Test time zone handling
- [ ] Mobile responsiveness check

## Best Practices

1. **Filter crew by role and availability** when assigning shifts
2. **Show hourly rates** in selection modals
3. **Confirm before removing** crew from shifts
4. **Display schedules clearly** with time ranges
5. **Handle conflicts** - check for overlapping shifts
6. **Mobile-first** - crew often use mobile devices
