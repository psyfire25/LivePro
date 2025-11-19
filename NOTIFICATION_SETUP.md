# Notification System Integration Guide

## Quick Setup

### 1. Database Migration (Required First!)

**IMPORTANT**: Run this before using the notification system:

```bash
# Start your PostgreSQL database first
# Then run the migration
pnpm db:migrate
```

This will create the `Notification` table and related indexes.

### 2. Install Socket.IO Client (for real-time notifications)

```bash
# In your app directory
pnpm add socket.io-client
```

### 3. Add Toast Provider to App

Wrap your app with `ToastProvider`:

```tsx
// apps/production/src/app/layout.tsx
import { ToastProvider } from "@repo/ui";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ToastProvider position="bottom-right">
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
```

### 4. Add Notification Bell to AdminShell

Create a NotificationCenter component (see `notification-center.example.tsx`) and pass it to AdminShell:

```tsx
// apps/production/src/app/layout.tsx
import { AdminShell } from "@repo/ui";
import { NotificationCenter } from "@/components/NotificationCenter";

export default function Layout({ children }) {
  const userId = "user-123"; // Get from auth

  return (
    <AdminShell
      appName="Production"
      rightSlot={<NotificationCenter userId={userId} />}
    >
      {children}
    </AdminShell>
  );
}
```

### 5. Use Toasts Anywhere

```tsx
import { useToast } from "@repo/ui";

function MyComponent() {
  const toast = useToast();

  const handleSave = async () => {
    try {
      await saveData();
      toast.success("Saved successfully!");
    } catch (error) {
      toast.error("Failed to save", "Error");
    }
  };

  return <button onClick={handleSave}>Save</button>;
}
```

## Creating Notifications from Backend

### Example: Task Assignment

```typescript
// apps/api/src/tasks/tasks.service.ts
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationsGateway } from '../notifications/notifications.gateway';

@Injectable()
export class TasksService {
  constructor(
    private notifications: NotificationsService,
    private notificationsGateway: NotificationsGateway,
  ) {}

  async assignTask(taskId: string, userId: string) {
    const task = await this.getTask(taskId);

    // Create notification
    const notification = await this.notifications.create({
      userId,
      type: 'TASK_ASSIGNED',
      severity: 'INFO',
      title: 'New Task Assigned',
      message: `You have been assigned to '${task.title}'`,
      actionUrl: `/events/${task.eventId}/tasks/${taskId}`,
      eventId: task.eventId,
      taskId,
    });

    // Send real-time update
    this.notificationsGateway.sendNotificationToUser(userId, notification);
  }
}
```

## Database Migration Troubleshooting

If migration fails:

1. **Database not running**: Start PostgreSQL
   ```bash
   # macOS with Homebrew
   brew services start postgresql
   
   # Or using Docker
   docker-compose up -d postgres
   ```

2. **Connection issues**: Check `.env` file in `apps/api/`
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/livepro"
   ```

3. **Manual migration**: If auto-migration fails
   ```bash
   cd apps/api
   pnpm prisma migrate dev --name add_notification_system
   ```

## Next Steps

1. ✅ Run database migration
2. ✅ Add ToastProvider to your apps
3. ✅ Create NotificationCenter component
4. ✅ Test creating notifications via API
5. ✅ Set up WebSocket connection (optional, for real-time)

## Files Created

**Backend:**
- `apps/api/src/notifications/*` - Full notification module
- `apps/api/prisma/schema.prisma` - Updated with Notification model

**Frontend:**
- `packages/ui/src/components/ui/toast.tsx` - Toast component
- `packages/ui/src/components/ui/toast-context.tsx` - Toast provider
- `packages/ui/src/components/ui/notification-bell.tsx` - Bell icon
- `packages/ui/src/components/ui/notification-dropdown.tsx` - Dropdown
- `packages/ui/src/components/ui/notification-item.tsx` - Notification card
- `packages/ui/src/components/ui/notification-list.tsx` - Full list view

**Documentation:**
- `packages/ui/src/components/ui/NOTIFICATIONS_README.md` - Full docs
- `packages/ui/src/components/ui/notification-center.example.tsx` - Integration example
- This file - Quick setup guide

## Support

Check the full documentation in `NOTIFICATIONS_README.md` for advanced usage, real-time setup, and best practices.
