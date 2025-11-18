# Notification System

A comprehensive notification system with toast notifications and a persistent notification center for the LivePro monorepo.

## Features

### 🍞 Toast System
- **Variants**: Success, Error, Warning, Info
- **Auto-dismiss**: Configurable duration with progress bar
- **Pause on hover**: Prevents dismissal while hovering
- **Stacking**: Multiple toasts stack vertically
- **Animations**: Smooth slide-in and fade-out

### 🔔 Notification Center
- **Persistent storage**: Notifications saved in database
- **Real-time updates**: WebSocket integration for instant delivery
- **Bell icon**: Badge showing unread count with ring animation
- **Dropdown**: Quick access to recent notifications
- **Full list view**: Dedicated page for all notifications
- **Mark as read**: Individual and bulk operations

---

## Installation

The notification system is already integrated into the `@repo/ui` package. No additional installation required.

---

## Usage

### 1. Toast Notifications (Client-Side Only)

#### Setup

Wrap your app with `ToastProvider`:

```tsx
import { ToastProvider } from "@repo/ui";

export default function App({ children }) {
  return (
    <ToastProvider position="bottom-right" maxToasts={5}>
      {children}
    </ToastProvider>
  );
}
```

#### Using Toasts

```tsx
import { useToast } from "@repo/ui";

function MyComponent() {
  const toast = useToast();

  const handleSuccess = () => {
    toast.success("Task created successfully!");
  };

  const handleError = () => {
    toast.error("Failed to save changes", "Error", 7000); // Custom duration
  };

  const handleWarning = () => {
    toast.warning("This action cannot be undone");
  };

  const handleInfo = () => {
    toast.info("New features available", "Update");
  };

  return (
    <div>
      <button onClick={handleSuccess}>Success</button>
      <button onClick={handleError}>Error</button>
      <button onClick={handleWarning}>Warning</button>
      <button onClick={handleInfo}>Info</button>
    </div>
  );
}
```

#### Toast API

```typescript
interface ToastAPI {
  success: (message: string, title?: string, duration?: number) => void;
  error: (message: string, title?: string, duration?: number) => void;
  warning: (message: string, title?: string, duration?: number) => void;
  info: (message: string, title?: string, duration?: number) => void;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}
```

---

### 2. Notification Center (Server + Client)

#### Backend API

The notification API is available at `/api/notifications`:

**Create a notification:**
```typescript
POST /api/notifications
{
  "userId": "user-123",
  "type": "TASK_ASSIGNED",
  "severity": "INFO",
  "title": "New Task Assigned",
  "message": "You have been assigned to 'Setup stage lighting'",
  "actionUrl": "/events/evt-456/tasks/task-789",
  "eventId": "evt-456",
  "taskId": "task-789"
}
```

**Get user notifications:**
```typescript
GET /api/notifications/user/:userId?unreadOnly=true&limit=20
```

**Mark as read:**
```typescript
PATCH /api/notifications/:id/read?userId=user-123
```

**Mark all as read:**
```typescript
PATCH /api/notifications/user/:userId/mark-all-read
```

**Get unread count:**
```typescript
GET /api/notifications/user/:userId/count
```

#### Frontend Usage

**Basic notification bell:**

```tsx
import { useState, useEffect } from "react";
import { NotificationBell, NotificationDropdown } from "@repo/ui";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Fetch notifications
    fetch(`/api/notifications/user/${userId}?limit=10`)
      .then(res => res.json())
      .then(setNotifications);

    // Fetch unread count
    fetch(`/api/notifications/user/${userId}/count`)
      .then(res => res.json())
      .then(setUnreadCount);
  }, [userId]);

  const handleMarkAsRead = async (id: string) => {
    await fetch(`/api/notifications/${id}/read?userId=${userId}`, {
      method: "PATCH",
    });
    // Update local state
  };

  const handleMarkAllAsRead = async () => {
    await fetch(`/api/notifications/user/${userId}/mark-all-read`, {
      method: "PATCH",
    });
    // Update local state
  };

  return (
    <div className="relative">
      <NotificationBell
        unreadCount={unreadCount}
        onClick={() => setIsOpen(!isOpen)}
      />
      <NotificationDropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
        onNotificationClick={(notification) => {
          if (notification.actionUrl) {
            window.location.href = notification.actionUrl;
          }
        }}
      />
    </div>
  );
}
```

---

### 3. Real-Time Notifications (WebSocket)

#### Backend

The WebSocket gateway is automatically set up. It listens on the `/notifications` namespace.

**Sending notifications:**

```typescript
import { NotificationsGateway } from "./notifications/notifications.gateway";
import { NotificationsService } from "./notifications/notifications.service";

@Injectable()
export class TasksService {
  constructor(
    private notificationsGateway: NotificationsGateway,
    private notificationsService: NotificationsService,
  ) {}

  async assignTask(taskId: string, userId: string) {
    // ... assign task logic

    // Create and send notification
    const notification = await this.notificationsService.create({
      userId,
      type: "TASK_ASSIGNED",
      severity: "INFO",
      title: "New Task Assigned",
      message: `You have been assigned to '${task.title}'`,
      actionUrl: `/events/${task.eventId}/tasks/${taskId}`,
      taskId,
    });

    // Send real-time update
    this.notificationsGateway.sendNotificationToUser(userId, notification);
  }
}
```

#### Frontend

**Connect to WebSocket:**

```typescript
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export function useNotificationSocket(userId: string) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const newSocket = io("http://localhost:4000/notifications", {
      query: { userId },
    });

    newSocket.on("notification", (notification: Notification) => {
      // Add to notifications list
      setNotifications((prev) => [notification, ...prev]);

      // Show toast
      toast.info(notification.message, notification.title);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [userId]);

  return { socket, notifications };
}
```

---

## Notification Types

Available notification types (defined in Prisma schema):

- `SCHEDULE_CHANGE` - Schedule has been updated
- `TASK_ASSIGNED` - User assigned to a task
- `TASK_COMPLETED` - Task marked as complete
- `TASK_STATUS_CHANGE` - Task status changed
- `CREW_ASSIGNMENT` - Crew member assigned to event
- `EVENT_CREATED` - New event created
- `EVENT_UPDATED` - Event details updated
- `DEADLINE_APPROACHING` - Deadline coming up
- `SYSTEM_ALERT` - System-wide notification

## Severity Levels

- `INFO` - Informational (blue)
- `SUCCESS` - Success message (green)
- `WARNING` - Warning (yellow)
- `ERROR` - Error message (red)

---

## Best Practices

### When to Use Toasts
- ✅ Form submission feedback ("Saved successfully")
- ✅ Quick status updates ("File uploaded")
- ✅ Non-critical errors ("Network timeout, retrying...")
- ❌ Critical errors requiring action (use error page or modal)
- ❌ Important information user needs to remember (use notification center)

### When to Use Notification Center
- ✅ Team collaboration updates ("John assigned you a task")
- ✅ Time-sensitive alerts ("Event starts in 1 hour")
- ✅ Multi-step workflows ("Invoice approved by manager")
- ✅ Information users may need to reference later

### Creating Good Notifications
1. **Be specific**: "Schedule changed for Summer Concert" not "Schedule updated"
2. **Include context**: Link to the relevant resource with `actionUrl`
3. **Use appropriate severity**: Don't overuse ERROR or SUCCESS
4. **Keep it concise**: Titles should be <50 chars, messages <150 chars
5. **Make it actionable**: Include what the user should do next

---

## Examples

### Creating Event Notifications

```typescript
// When event is created
await notificationsService.create({
  userId: projectManager.id,
  type: "EVENT_CREATED",
  severity: "SUCCESS",
  title: "Event Created",
  message: `${event.name} has been created`,
  actionUrl: `/events/${event.id}`,
  eventId: event.id,
});
```

### Schedule Change Notifications

```typescript
// Notify all crew members when schedule changes
const crewMembers = await getEventCrewMembers(eventId);

for (const member of crewMembers) {
  await notificationsService.create({
    userId: member.userId,
    type: "SCHEDULE_CHANGE",
    severity: "WARNING",
    title: "Schedule Updated",
    message: `Call time changed to ${newCallTime}`,
    actionUrl: `/events/${eventId}/schedule`,
    eventId,
    metadata: {
      oldTime: oldCallTime,
      newTime: newCallTime,
    },
  });
}
```

### Deadline Reminders

```typescript
// Cron job that checks for approaching deadlines
const upcomingTasks = await getTasksDueSoon();

for (const task of upcomingTasks) {
  await notificationsService.create({
    userId: task.assigneeId,
    type: "DEADLINE_APPROACHING",
    severity: "WARNING",
    title: "Deadline Approaching",
    message: `'${task.title}' is due in ${hoursUntilDue} hours`,
    actionUrl: `/events/${task.eventId}/tasks/${task.id}`,
    taskId: task.id,
    eventId: task.eventId,
  });
}
```

---

## Styling

All components use a `ui:` prefix for Tailwind classes to avoid conflicts. The notification system automatically adapts to your existing design system colors.

Custom styling can be applied via className props:

```tsx
<NotificationBell
  className="custom-bell-styles"
  unreadCount={5}
/>
```

---

## API Reference

### Components

- **`<ToastProvider />`** - Context provider for toasts
- **`<Toast />`** - Individual toast component
- **`<ToastContainer />`** - Container for managing toast stack
- **`<NotificationBell />`** - Bell icon with badge
- **`<NotificationDropdown />`** - Dropdown with recent notifications
- **`<NotificationItem />`** - Individual notification card

### Hooks

- **`useToast()`** - Access toast API from any component

### Types

See TypeScript definitions in component files for complete type information.

---

## Troubleshooting

**Toasts not appearing:**
- Ensure `ToastProvider` wraps your app
- Check browser console for errors
- Verify `useToast()` is called within ToastProvider

**WebSocket not connecting:**
- Verify API server is running
- Check CORS configuration in `notifications.gateway.ts`
- Ensure userId is passed in connection query

**Notifications not persisting:**
- Run database migrations: `pnpm db:migrate`
- Verify Prisma client is generated: `pnpm db:generate `
- Check database connection string

---

## Future Enhancements

Potential features for future iterations:

- User notification preferences (email, push, in-app)
- Notification grouping/threading
- Rich notifications with images/buttons
- Push notifications (browser API)
- Email digest system
- Notification search and filtering
- Notification templates
- Analytics/tracking

---

## Support

For issues or questions, please check the main README or contact the development team.
