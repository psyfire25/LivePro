# Notification System - Quick Reference

## 🚨 To Fix Later: Database Migration

**The notification system is fully coded but needs the database migration to run:**

```bash
# 1. Start PostgreSQL (if not running)
brew services start postgresql
# OR
docker-compose up -d postgres

# 2. Run migration
pnpm db:migrate
# When prompted, name it: add_notification_system

# 3. Verify
pnpm --filter api prisma studio
# Check that "Notification" table exists
```

---

## 🎯 Quick Integration (5 minutes)

### 1. Add Toast Provider
```tsx
// Any app/layout.tsx
import { ToastProvider } from "@repo/ui";

<ToastProvider>
  {children}
</ToastProvider>
```

### 2. Use Toasts Anywhere
```tsx
import { useToast } from "@repo/ui";

const toast = useToast();
toast.success("Saved!");
toast.error("Failed");
```

### 3. Add Notification Bell
```tsx
// Copy: packages/ui/src/components/ui/notification-center.example.tsx
// to your app, then:

import { AdminShell } from "@repo/ui";
import { NotificationCenter } from "./NotificationCenter";

<AdminShell
  rightSlot={<NotificationCenter userId={userId} />}
>
  {children}
</AdminShell>
```

---

## 📦 What Was Created

### Backend (`apps/api/src/notifications/`)
- ✅ Full CRUD service
- ✅ 8 REST endpoints
- ✅ WebSocket gateway
- ✅ Prisma schema updated

### Frontend (`packages/ui/src/components/ui/`)
- ✅ Toast system (4 variants)
- ✅ Notification bell (with badge)
- ✅ Notification dropdown
- ✅ Notification list page
- ✅ All exported from @repo/ui

### Docs
- ✅ `NOTIFICATION_SETUP.md` - Setup guide
- ✅ `notification-center.example.tsx` - Integration example  
- ✅ `NOTIFICATIONS_README.md` - Full documentation
- ✅ Walkthrough in artifacts

---

## 🔌 API Endpoints (localhost:4000)

```
POST   /api/notifications                           Create
GET    /api/notifications/user/:userId              List (with filters)
GET    /api/notifications/user/:userId/count        Unread count
PATCH  /api/notifications/:id/read?userId=X         Mark as read
PATCH  /api/notifications/user/:userId/mark-all-read Mark all read
DELETE /api/notifications/:id?userId=X              Delete
```

---

## 💡 Common Use Cases  

**Task assigned:**
```ts
await notificationsService.create({
  userId: assignee.id,
  type: 'TASK_ASSIGNED',
  severity: 'INFO',
  title: 'New Task',
  message: `Assigned to '${task.title}'`,
  actionUrl: `/events/${eventId}/tasks/${taskId}`,
  taskId,
});
```

**Schedule changed:**
```ts
// With real-time delivery
const notification = await notificationsService.create({...});
notificationsGateway.sendNotificationToUser(userId, notification);
```

---

## 🐛 Troubleshooting

**Toast not working:**
- Ensure `<ToastProvider>` wraps your app
- Check `useToast()` is inside ToastProvider

**Bell not showing notifications:**
- Database migration not run → `pnpm db:migrate`
- API not running → `pnpm --filter api dev`
- Check browser console for errors

**WebSocket not connecting:**
- Add `socket.io-client`: `pnpm add socket.io-client`
- Check CORS in `notifications.gateway.ts` (line 13)

---

## 📝 Files to Look At

**Integration example:**
`packages/ui/src/components/ui/notification-center.example.tsx`

**Full docs:**
`packages/ui/src/components/ui/NOTIFICATIONS_README.md`

**Setup guide:**
`NOTIFICATION_SETUP.md` (project root)

---

## ⏭️ Next Steps

1. ✅ System is coded and ready
2. ⏳ Run `pnpm db:migrate` when database is available
3. ⏳ Copy example to your app
4. ⏳ Test creating notifications via API
5. ⏳ Optionally set up WebSocket for real-time

**Everything is ready except the database migration!** 🎉
