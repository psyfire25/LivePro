# Modal Integration Examples for Talent App

This document provides practical examples of using the Modal component in the Talent app.

## Common Use Cases

### 1. Add New Artist

```tsx
"use client";
import { useState } from "react";
import { FormModal, Button, Input } from "@repo/ui";

export function AddArtistButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (data: any) => {
    await fetch("/api/artists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Add Artist</Button>

      <FormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add New Artist"
        onSubmit={handleSubmit}
        size="lg"
      >
        <div>
          <label htmlFor="artistName" className="ui:block ui:text-sm ui:font-medium ui:mb-1">
            Artist Name
          </label>
          <Input
            type="text"
            id="artistName"
            name="name"
            placeholder="e.g., The Rolling Stones"
            required
          />
        </div>

        <div>
          <label htmlFor="genre" className="ui:block ui:text-sm ui:font-medium ui:mb-1">
            Genre
          </label>
          <Input
            type="text"
            id="genre"
            name="genre"
            placeholder="e.g., Rock, Pop, Jazz"
          />
        </div>

        <div>
          <label htmlFor="contactEmail" className="ui:block ui:text-sm ui:font-medium ui:mb-1">
            Contact Email
          </label>
          <Input
            type="email"
            id="contactEmail"
            name="contactEmail"
            placeholder="agent@example.com"
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
          />
        </div>

        <div>
          <label htmlFor="bio" className="ui:block ui:text-sm ui:font-medium ui:mb-1">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            className="ui:w-full ui:px-3 ui:py-2 ui:border ui:border-gray-300 ui:rounded-md"
            placeholder="Artist biography..."
          />
        </div>
      </FormModal>
    </>
  );
}
```

### 2. Create Booking

```tsx
"use client";
import { useState } from "react";
import { FormModal, Button, Input } from "@repo/ui";

export function CreateBookingButton({ artistId }: { artistId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (data: any) => {
    await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, artistId }),
    });
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Create Booking</Button>

      <FormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Create Booking"
        onSubmit={handleSubmit}
        size="lg"
      >
        <div>
          <label htmlFor="eventName" className="ui:block ui:text-sm ui:font-medium ui:mb-1">
            Event
          </label>
          <select
            id="eventName"
            name="eventId"
            required
            className="ui:w-full ui:px-3 ui:py-2 ui:border ui:border-gray-300 ui:rounded-md"
          >
            <option value="">Select event...</option>
            {/* Populate from events */}
          </select>
        </div>

        <div>
          <label htmlFor="performanceDate" className="ui:block ui:text-sm ui:font-medium ui:mb-1">
            Performance Date
          </label>
          <Input type="datetime-local" id="performanceDate" name="performanceDate" required />
        </div>

        <div>
          <label htmlFor="fee" className="ui:block ui:text-sm ui:font-medium ui:mb-1">
            Performance Fee
          </label>
          <Input
            type="number"
            id="fee"
            name="fee"
            placeholder="0.00"
            step="0.01"
            required
          />
        </div>

        <div>
          <label htmlFor="deposit" className="ui:block ui:text-sm ui:font-medium ui:mb-1">
            Deposit Amount
          </label>
          <Input
            type="number"
            id="deposit"
            name="deposit"
            placeholder="0.00"
            step="0.01"
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
            placeholder="Booking notes..."
          />
        </div>
      </FormModal>
    </>
  );
}
```

### 3. Delete Booking Confirmation

```tsx
"use client";
import { useConfirmDialog, Button } from "@repo/ui";

export function BookingCard({ booking }) {
  const { confirm, ConfirmDialog } = useConfirmDialog();

  const handleDelete = () => {
    confirm({
      title: "Cancel Booking",
      message: `Are you sure you want to cancel the booking for ${booking.artistName} on ${booking.date}? This action cannot be undone.`,
      confirmText: "Cancel Booking",
      variant: "danger",
      onConfirm: async () => {
        await fetch(`/api/bookings/${booking.id}`, { method: "DELETE" });
      },
    });
  };

  return (
    <>
      <div className="booking-card">
        <h3>{booking.artistName}</h3>
        <p>{booking.date}</p>
        <Button variant="ghost" onClick={handleDelete}>
          Cancel Booking
        </Button>
      </div>
      <ConfirmDialog />
    </>
  );
}
```

### 4. View Artist Rider

```tsx
"use client";
import { useState } from "react";
import { Modal, Button } from "@repo/ui";

export function ViewRiderButton({ rider }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        View Rider
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Technical Rider"
        size="lg"
      >
        <div className="ui:space-y-6">
          <section>
            <h3 className="ui:font-semibold ui:text-lg ui:mb-2">Stage Requirements</h3>
            <div className="ui:space-y-2">
              <p><strong>Stage Size:</strong> {rider.stageSize}</p>
              <p><strong>Power Requirements:</strong> {rider.power}</p>
            </div>
          </section>

          <section>
            <h3 className="ui:font-semibold ui:text-lg ui:mb-2">Sound Equipment</h3>
            <ul className="ui:list-disc ui:list-inside ui:space-y-1">
              {rider.soundEquipment?.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="ui:font-semibold ui:text-lg ui:mb-2">Hospitality</h3>
            <ul className="ui:list-disc ui:list-inside ui:space-y-1">
              {rider.hospitality?.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
      </Modal>
    </>
  );
}
```

### 5. Select Artist for Event

```tsx
"use client";
import { useState } from "react";
import { SelectionModal, Button } from "@repo/ui";

interface Artist {
  id: string;
  name: string;
  genre: string;
}

export function SelectArtistButton({ eventId, artists }: {
  eventId: string;
  artists: Artist[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = async (artist: Artist) => {
    // Navigate to booking creation or create booking directly
    await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId, artistId: artist.id }),
    });
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Add Artist to Event</Button>

      <SelectionModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Select Artist"
        items={artists}
        onSelect={handleSelect}
        keyExtractor={(artist) => artist.id}
        renderItem={(artist) => (
          <div>
            <div className="ui:font-medium">{artist.name}</div>
            <div className="ui:text-sm ui:text-gray-500">{artist.genre}</div>
          </div>
        )}
        searchable
        size="lg"
      />
    </>
  );
}
```

### 6. Update Contract Status

```tsx
"use client";
import { useState } from "react";
import { Modal, Button } from "@repo/ui";

export function UpdateContractStatusButton({ booking }) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(booking.contractStatus);

  const handleUpdate = async () => {
    await fetch(`/api/bookings/${booking.id}/contract`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setIsOpen(false);
  };

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        Update Contract
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Update Contract Status"
        footer={
          <div className="ui:flex ui:gap-3 ui:justify-end">
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleUpdate}>
              Update
            </Button>
          </div>
        }
      >
        <div className="ui:space-y-4">
          <div>
            <label className="ui:block ui:text-sm ui:font-medium ui:mb-2">
              Contract Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="ui:w-full ui:px-3 ui:py-2 ui:border ui:border-gray-300 ui:rounded-md"
            >
              <option value="pending">Pending</option>
              <option value="sent">Sent</option>
              <option value="signed">Signed</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </Modal>
    </>
  );
}
```

## Integration Checklist

- [ ] Add artist management modals
- [ ] Create booking forms with FormModal
- [ ] Add rider viewing modals
- [ ] Implement contract status updates
- [ ] Use SelectionModal for artist selection
- [ ] Add delete confirmations for bookings
- [ ] Test all modals on mobile devices

## Best Practices

1. **Use FormModal for all booking and artist forms**
2. **Always confirm before canceling bookings**
3. **Display riders in read-only modals**
4. **Use SelectionModal for choosing artists**
5. **Handle payment tracking in modals**
