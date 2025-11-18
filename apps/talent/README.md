# Talent App — Artist & Talent Management

The **Talent** app is a specialized Next.js application for managing artists, performers, and talent coordination for live events.

---

## 📋 Overview

This application provides tools for:
- **Artist Database** - Manage artist profiles and details
- **Booking & Contracts** - Track bookings, riders, and agreements
- **Performance Scheduling** - Coordinate performance times and stage assignments
- **Rider Management** - Technical and hospitality riders
- **Travel & Accommodation** - Coordinate logistics for talent
- **Communication** - Direct talent communication and updates

---

## 🚀 Tech Stack

- **Framework**: Next.js 15.5.2 with App Router
- **Build Tool**: Turbopack
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **UI Components**: Shared `@repo/ui` library
- **Animations**: `@repo/motion` shared animation library
- **Authentication**: Clerk (`@clerk/nextjs`)
- **Port**: 3020

---

## 🏗 Project Structure

```
apps/talent/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with auth
│   │   ├── page.tsx             # Dashboard
│   │   ├── globals.css          # Global styles
│   │   ├── artists/             # Artist management
│   │   ├── bookings/            # Booking management
│   │   └── riders/              # Rider management
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

Or run only the talent app:

```bash
cd apps/talent
pnpm dev
```

Access at:
```
http://localhost:3020
```

### Environment Variables

Create `.env.local` in `apps/talent/`:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# API Backend
NEXT_PUBLIC_API_URL=http://localhost:4000
```

---

## 🎯 Features

### 1. **Artist Profiles**
- Comprehensive artist information
- Genre and style tags
- Social media links
- Press kit and promotional materials
- Performance history
- Ratings and reviews

### 2. **Booking Management**
- Create and track bookings
- Contract status tracking
- Performance fees and terms
- Deposit and payment schedules
- Booking confirmations
- Cancellation policies

### 3. **Rider Management**
- **Technical Riders**: Stage plots, equipment needs, sound requirements
- **Hospitality Riders**: Backstage requirements, catering, green room setup
- Template riders for recurring artists
- Rider approval workflow
- Version control and updates

### 4. **Performance Scheduling**
- Set times and stage assignments
- Soundcheck schedules
- Load-in and setup times
- Performance duration
- Changeover times between acts

### 5. **Travel & Logistics**
- Flight and transport bookings
- Hotel accommodations
- Ground transportation
- Tour itineraries
- Arrival/departure tracking

### 6. **Communication Hub**
- Artist contact management
- Agent and manager information
- Production updates and notifications
- Document sharing
- Change notifications

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
pnpm dev          # Development server (port 3020)
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Lint code
```

---

## 🔗 Integration Points

### With Other Apps
- **Production** - Performance schedules and stage assignments
- **Finance** - Artist payments and contracts
- **Staffing** - Artist liaison and hospitality crew
- **API** - Artist and booking data persistence

---

## 🚢 Deployment

### Vercel

```bash
# Build command
cd ../.. && pnpm build --filter=talent
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
