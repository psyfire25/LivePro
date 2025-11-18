# Staffing App — Crew & Staff Management

The **Staffing** app is a specialized Next.js application for managing crew scheduling, staff assignments, and workforce coordination for live events.

---

## 📋 Overview

This application provides tools for:
- **Crew Scheduling** - Schedule staff across multiple events and shifts
- **Staff Database** - Maintain crew profiles and contact information
- **Role Assignment** - Assign specific roles and responsibilities
- **Availability Tracking** - Track crew availability and conflicts
- **Shift Management** - Create and manage work shifts
- **Crew Communication** - Coordinate with team members

---

## 🚀 Tech Stack

- **Framework**: Next.js 15.5.2 with App Router
- **Build Tool**: Turbopack
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **UI Components**: Shared `@repo/ui` library
- **Animations**: `@repo/motion` shared animation library
- **Authentication**: Clerk (`@clerk/nextjs`)
- **Port**: 3030

---

## 🏗 Project Structure

```
apps/staffing/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with auth
│   │   ├── page.tsx             # Dashboard
│   │   ├── globals.css          # Global styles
│   │   ├── crew/                # Crew management pages
│   │   ├── schedule/            # Scheduling pages
│   │   └── shifts/              # Shift management
│   ├── lib/                     # Utilities
│   └── components/              # App-specific components
└── package.json
```

---

## 🔧 Development

### Prerequisites

1. **API backend** running on port `4000`
2. **PostgreSQL database** running
3. Dependencies installed:

```bash
pnpm install
```

### Start Development Server

From the **monorepo root**:

```bash
pnpm dev
```

Or run only the staffing app:

```bash
cd apps/staffing
pnpm dev
```

Access at:
```
http://localhost:3030
```

### Environment Variables

Create `.env.local` in `apps/staffing/`:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# API Backend
NEXT_PUBLIC_API_URL=http://localhost:4000
```

---

## 🎯 Features

### 1. **Crew Database**
- Maintain comprehensive crew profiles
- Contact information and emergency contacts
- Skills and certifications
- Work history and ratings
- Availability calendars

### 2. **Scheduling**
- Create event-specific crew schedules
- Assign crew to specific roles and shifts
- Visual timeline/calendar view
- Conflict detection and resolution
- Shift templates for recurring events

### 3. **Role Management**
- Define crew roles (Production Manager, Stage Tech, Sound Engineer, etc.)
- Role-specific requirements and qualifications
- Hierarchy and reporting structure
- Pay rates and terms

### 4. **Availability Tracking**
- Crew availability submissions
- Blackout dates
- Partial availability windows
- Real-time availability status

### 5. **Communication**
- Crew notifications and updates
- Schedule changes and alerts
- Document sharing (call sheets, production schedules)
- Contact directory

---

## 📦 Shared Dependencies

| Package | Purpose |
|---------|---------|
| `@repo/ui` | Shared UI components |
| `@repo/motion` | Animations |
| `@repo/auth` | Authentication and role checking |

---

## 🧪 Available Scripts

```bash
pnpm dev          # Development server (port 3030)
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Lint code
```

---

## 🔗 Integration Points

### With Other Apps
- **Production** - View event details and production requirements
- **Finance** - Crew payroll and invoicing
- **API** - Crew and scheduling data persistence

---

## 🚢 Deployment

### Vercel

```bash
# Build command
cd ../.. && pnpm build --filter=staffing
```

Set environment variables:
- Clerk keys
- API URL

---

## 🤝 Contributing

Part of the LivePro monorepo. See [main README](../../README.md).

---

## 📄 License

See [LICENSE](../../LICENSE).
