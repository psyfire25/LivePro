# LivePro Apps Quick Reference

Quick reference guide for all LivePro applications.

---

## 🚀 Quick Start

```bash
# From monorepo root

# 1. Install dependencies
pnpm install

# 2. Start database
docker compose up -d

# 3. Initialize database
pnpm db:migrate
pnpm db:generate

# 4. Start all apps
pnpm dev
```

---

## 🌐 Application Ports

| App | Port | URL | Status |
|-----|------|-----|--------|
| **Web** | 3001 | http://localhost:3001 | Main portal |
| **Docs** | 3000 | http://localhost:3000 | Documentation |
| **Production** | 3010 | http://localhost:3010 | Event management |
| **Talent** | 3020 | http://localhost:3020 | Artist management |
| **Staffing** | 3030 | http://localhost:3030 | Crew scheduling |
| **Finance** | 3040 | http://localhost:3040 | Financial tools |
| **API** | 4000 | http://localhost:4000 | Backend API |
| **API Docs** | 4000 | http://localhost:4000/docs | Swagger UI |
| **Prisma Studio** | 5555 | http://localhost:5555 | Database GUI |

---

## 📦 Monorepo Commands

### Development

```bash
# Start all apps
pnpm dev

# Start specific app
pnpm dev --filter=web
pnpm dev --filter=production
pnpm dev --filter=api

# Build all apps
pnpm build

# Build specific app
pnpm build --filter=production
```

### Database

```bash
# Generate Prisma client
pnpm db:generate

# Run migrations
pnpm db:migrate

# Open Prisma Studio
pnpm db:studio

# Push schema (dev only)
pnpm db:push

# Reset database (⚠️ destructive)
pnpm db:reset
```

### Code Quality

```bash
# Lint all apps
pnpm lint

# Type-check
pnpm check-types

# Format code
pnpm format
```

### API Types

```bash
# Generate OpenAPI types (API must be running)
pnpm gen:openapi

# Build API types package
pnpm build:api-types
```

---

## 📂 Directory Structure

```
LivePro/
├── apps/
│   ├── api/              # NestJS backend (port 4000)
│   ├── web/              # Main portal (port 3001)
│   ├── production/       # Production app (port 3010)
│   ├── talent/           # Talent app (port 3020)
│   ├── staffing/         # Staffing app (port 3030)
│   ├── finance/          # Finance app (port 3040)
│   └── docs/             # Documentation (port 3000)
├── packages/
│   ├── ui/               # Shared UI components
│   ├── motion/           # Animation utilities
│   ├── auth/             # Auth utilities
│   ├── api-types/        # Generated API types
│   ├── tailwind-config/  # Tailwind config
│   ├── typescript-config/# TypeScript config
│   └── eslint-config/    # ESLint config
├── docker-compose.yml    # PostgreSQL setup
├── turbo.json            # Turborepo config
└── package.json          # Root package
```

---

## 🔧 Environment Variables

### All Frontend Apps

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# API Backend
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### API Backend

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/livepro?schema=public"

# Server
PORT=4000
NODE_ENV=development
```

---

## 🎯 Common Tasks

### Create a New Event

1. Navigate to **Production** app: http://localhost:3010
2. Click "Create Event"
3. Fill in event details
4. Submit

### Book an Artist

1. Navigate to **Talent** app: http://localhost:3020
2. Go to "Artists" → "Add Artist"
3. Create artist profile
4. Create booking for event

### Schedule Crew

1. Navigate to **Staffing** app: http://localhost:3030
2. Add crew members to database
3. Create schedule for event
4. Assign crew to shifts

### Create Budget

1. Navigate to **Finance** app: http://localhost:3040
2. Select event
3. Create new budget
4. Add budget line items
5. Track expenses against budget

---

## 🔑 User Roles

| Role | Permissions | Apps |
|------|-------------|------|
| **Viewer** | View-only access | All |
| **Member** | Create/edit own tasks | All |
| **Manager** | Access production tools, logistics | Production, Staffing, Finance |
| **Admin** | Full workspace control | All |

---

## 🛠 Troubleshooting

### Port Already in Use

```bash
# Find process using port
lsof -ti:3010

# Kill process
kill -9 $(lsof -ti:3010)
```

### Database Connection Issues

```bash
# Check if database is running
docker ps

# Start database
docker compose up -d

# Check connection
psql postgresql://postgres:postgres@localhost:5432/livepro
```

### Prisma Client Not Generated

```bash
# Regenerate Prisma client
pnpm db:generate

# Or from API app
cd apps/api
pnpm db:generate
```

### API Types Out of Sync

```bash
# Ensure API is running
pnpm -F api dev

# Generate types
pnpm gen:openapi
```

### Build Errors

```bash
# Clean node_modules and reinstall
rm -rf node_modules
pnpm install

# Clear turborepo cache
rm -rf .turbo
pnpm build
```

---

## 📚 Documentation Links

- **Main README**: [/README.md](../README.md)
- **Apps Overview**: [/apps/APPS_OVERVIEW.md](./APPS_OVERVIEW.md)
- **Web App**: [/apps/web/README.md](./web/README.md)
- **API Backend**: [/apps/api/README.md](./api/README.md)
- **Production**: [/apps/production/README.md](./production/README.md)
- **Talent**: [/apps/talent/README.md](./talent/README.md)
- **Staffing**: [/apps/staffing/README.md](./staffing/README.md)
- **Finance**: [/apps/finance/README.md](./finance/README.md)
- **Docs**: [/apps/docs/README.md](./docs/README.md)

---

## 💡 Pro Tips

### 1. Use Turborepo Filtering

```bash
# Run only specific apps
pnpm dev --filter=production --filter=api

# Build only changed apps
pnpm build
```

### 2. Prisma Studio for Database Inspection

```bash
pnpm db:studio
# Opens GUI at http://localhost:5555
```

### 3. API Documentation

```bash
# Interactive API docs
http://localhost:4000/docs
```

### 4. Shared Component Library

Import from `@repo/ui`:

```typescript
import { Button, Input, Card } from "@repo/ui";
```

### 5. Type-Safe API Calls

```typescript
import { listEvents, createEvent } from "@/lib/api/client";

// Fully typed!
const events = await listEvents();
```

---

## 🚀 Deployment Checklist

### Frontend Apps (Vercel)

- [ ] Connect repository
- [ ] Set build command: `cd ../.. && pnpm build --filter=<app-name>`
- [ ] Set output directory: `.next`
- [ ] Add environment variables (Clerk keys, API URL)
- [ ] Deploy

### Backend API (Docker)

- [ ] Build Docker image: `docker build -f dockerfile.api -t livepro-api .`
- [ ] Set production environment variables
- [ ] Configure database connection
- [ ] Deploy to cloud provider
- [ ] Set up HTTPS/SSL

### Database

- [ ] Use managed PostgreSQL (AWS RDS, Supabase, etc.)
- [ ] Run migrations: `pnpm db:migrate`
- [ ] Set up backups
- [ ] Configure connection pooling

---

## 📞 Getting Help

1. **Check Docs**: http://localhost:3000
2. **API Reference**: http://localhost:4000/docs
3. **Read READMEs**: Each app has detailed documentation
4. **Main README**: Root monorepo documentation

---

## 🔄 Version Information

- **Next.js**: 15.5.2 (most apps), 15.4.2 (docs)
- **NestJS**: 11.0.1
- **TypeScript**: 5.9.2
- **Tailwind CSS**: v4
- **Prisma**: 6.15.0
- **Node**: >= 18
- **pnpm**: 8.15.6

---

**Happy coding! 🎉**
