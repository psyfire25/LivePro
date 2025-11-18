# Production App — Event Production Management

The **Production** app is a specialized Next.js application for managing live event production, including event planning, stage configuration, scheduling, and task management.

---

## 📋 Overview

This application provides comprehensive tools for:
- **Event Management** - Create and manage live events (concerts, festivals, conferences)
- **Stage Configuration** - Set up multiple stages with technical specifications
- **Production Build** - Equipment, tech specs, and stage builds
- **Logistics** - Crew coordination, suppliers, and transport
- **Task Management** - Production task assignment and tracking
- **Schedule Management** - Event timelines and performance schedules

---

## 🚀 Tech Stack

- **Framework**: Next.js 15.5.2 with App Router
- **Build Tool**: Turbopack
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **UI Components**: Shared `@repo/ui` library (shadcn/ui based)
- **Animations**: `@repo/motion` shared animation library
- **Authentication**: Clerk (`@clerk/nextjs`)
- **API Client**: Type-safe client from `@livepro/api-types`
- **Port**: 3010

---

## 🏗 Project Structure

```
apps/production/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with auth
│   │   ├── page.tsx             # Dashboard/homepage
│   │   ├── globals.css          # Global styles
│   │   ├── events/              # Event management pages
│   │   ├── sections/            # Production sections
│   │   │   ├── build/           # Production build tools
│   │   │   └── logistics/       # Logistics management
│   │   └── guide/               # User guides
│   ├── lib/
│   │   ├── api/                 # API client utilities
│   │   └── auth/                # Auth utilities (role checking)
│   └── components/              # App-specific components
├── public/                      # Static assets
└── package.json
```

---

## 🔧 Development

### Prerequisites

1. **API backend** must be running on port `4000`
2. **PostgreSQL database** must be running
3. Dependencies installed from monorepo root:

```bash
pnpm install
```

### Start Development Server

From the **monorepo root**:

```bash
pnpm dev
```

Or run only the production app:

```bash
cd apps/production
pnpm dev
```

The app will be available at:
```
http://localhost:3010
```

### Environment Variables

Create a `.env.local` file in `apps/production/` with:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# API Backend
NEXT_PUBLIC_API_URL=http://localhost:4000

# Clerk Routes
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

---

## 🎯 Features

### 1. **Event Management**

Create and manage events with:
- Event types: CONCERT, FESTIVAL, CLUB_NIGHT, CONFERENCE, PRIVATE
- Event metadata: name, location, dates, times
- Multi-event support within workspaces
- Event dashboard with quick actions

**First-Time Experience**: When accessing Production for the first time, you'll see a streamlined event creation flow.

### 2. **Production Build** (Manager+ Role)

Manage the physical production setup:
- **Stages**: Configure multiple stages with names and technical specs
- **Equipment**: Track gear, audio, lighting, video equipment
- **Tech Specs**: Document technical requirements
- **Build Schedule**: Timeline for load-in and setup

### 3. **Logistics** (Manager+ Role)

Coordinate production logistics:
- **Crew Management**: Staff assignments and scheduling
- **Suppliers**: Vendor contacts and contracts
- **Transport**: Vehicle and equipment transport coordination
- **Load-in/Load-out**: Timeline and resource planning

### 4. **Role-Based Access Control**

Pages and features are gated by user role:
- **Viewer**: Can view events and schedules
- **Member**: Can create and edit tasks
- **Manager**: Full access to production build and logistics
- **Admin**: Complete workspace management

Implemented via `@repo/auth` utilities:

```typescript
import { useWorkspaceRole, hasMinRole } from '@/lib/auth/role';

const { role } = useWorkspaceRole();
const canManage = hasMinRole(role, 'MANAGER');
```

### 5. **Task Management**

Production task tracking:
- Create and assign tasks
- Track task status and progress
- Task dependencies and deadlines
- Team collaboration

---

## 📦 Shared Dependencies

This app uses monorepo-shared packages:

| Package | Purpose |
|---------|---------|
| `@repo/ui` | Shared Tailwind v4 + shadcn/ui components (Button, Input, etc.) |
| `@repo/motion` | Animation helpers and transitions |
| `@repo/auth` | Authentication utilities and role checking |
| `@livepro/api-types` | Type-safe API client generated from OpenAPI schema |

---

## 🧪 Available Scripts

```bash
# Start development server (port 3010)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

---

## 🔌 API Integration

### Type-Safe API Client

The app uses auto-generated TypeScript types from the backend OpenAPI schema:

```typescript
import { listEvents, createEvent } from '@/lib/api/client';

// Fully typed requests and responses
const events = await listEvents();
await createEvent({
  name: "Summer Festival",
  type: "FESTIVAL",
  startAt: new Date(),
  endAt: new Date(),
  location: "Main Park"
});
```

### Regenerating API Types

When the backend API changes:

```bash
# From monorepo root, with API running
pnpm gen:openapi
```

---

## 🎨 Customization

### Theming

The app inherits from the shared design system:
- **CSS Variables**: Defined in `globals.css`
- **Tailwind Config**: From `@repo/tailwind-config`
- **Component Theming**: Use `@repo/ui` components for consistency

### Adding New Pages

1. Create a new route in `src/app/`
2. Use shared components from `@repo/ui`
3. Add role-based guards if needed:

```typescript
import { hasMinRole } from '@/lib/auth/role';

if (!hasMinRole(role, 'MANAGER')) {
  redirect('/');
}
```

---

## 🚢 Deployment

### Vercel (Recommended)

1. Connect repository to Vercel
2. Configure build settings:
   - **Build Command**: `cd ../.. && pnpm build --filter=production`
   - **Output Directory**: `.next`
   - **Install Command**: `pnpm install`
3. Set environment variables (Clerk keys, API URL)
4. Deploy

### Docker

```bash
# From monorepo root
docker build -f dockerfile.production -t livepro-production .
docker run -p 3010:3010 livepro-production
```

---

## 🔗 Related Apps

The Production app integrates with:
- **API** (`localhost:4000`) - Backend data and business logic
- **Web** (`localhost:3001`) - Main portal and navigation
- **Staffing** (`localhost:3030`) - Crew scheduling
- **Talent** (`localhost:3020`) - Artist management
- **Finance** (`localhost:3040`) - Budgeting and invoicing

---

## 🎓 User Guides

In-app guides are available at:
```
http://localhost:3010/guide
```

Guides cover:
- Creating your first event
- Setting up stages
- Managing production tasks
- Coordinating logistics

---

## 🤝 Contributing

This app is part of the LivePro monorepo. See the [main README](../../README.md) for contribution guidelines.

### Development Workflow

1. Make changes to components or pages
2. Use shared `@repo/ui` components when possible
3. Ensure role-based access is properly implemented
4. Test with different user roles
5. Update API types if backend changes

---

## 📄 License

See [LICENSE](../../LICENSE) in the repository root.
