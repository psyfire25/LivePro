# API — LivePro Backend Service

The **API** app is the NestJS-powered backend service that provides a RESTful API for all LivePro applications. It handles data persistence, business logic, and exposes OpenAPI-documented endpoints.

---

## 📋 Overview

This NestJS application provides:
- **RESTful API** for all LivePro functionality
- **PostgreSQL database** integration via Prisma ORM
- **OpenAPI/Swagger documentation** at `/docs`
- **Modular architecture** with feature-based modules
- **Type-safe client generation** for frontend apps

---

## 🚀 Tech Stack

- **Framework**: NestJS 11.0.1
- **Language**: TypeScript 5.7
- **Database**: PostgreSQL via Prisma 6.15.0
- **API Documentation**: Swagger/OpenAPI
- **Testing**: Jest 30.0.0
- **Port**: 4000

---

## 🏗 Project Structure

```
apps/api/
├── src/
│   ├── main.ts                 # Application entry point
│   ├── app.module.ts           # Root module
│   ├── app.controller.ts       # Root controller
│   ├── app.service.ts          # Root service
│   ├── events/                 # Events module
│   │   ├── events.module.ts
│   │   ├── events.controller.ts
│   │   ├── events.service.ts
│   │   └── dto/                # Data transfer objects
│   ├── stages/                 # Stages module
│   ├── schedule/               # Schedule module
│   ├── tasks/                  # Tasks module
│   └── workspaces/             # Workspaces module
├── prisma/
│   ├── schema.prisma           # Database schema
│   ├── migrations/             # Database migrations
│   └── seed.ts                 # Database seed script
├── test/                       # E2E tests
└── package.json
```

---

## 🔧 Development

### Prerequisites

1. **PostgreSQL database** running (via Docker or local)
2. Dependencies installed from monorepo root:

```bash
pnpm install
```

### Start Database (Docker)

From the **monorepo root**:

```bash
docker compose up -d
```

This starts PostgreSQL on port `5432`.

### Database Setup

Generate Prisma client:

```bash
pnpm db:generate
```

Run migrations:

```bash
pnpm db:migrate
```

Seed database (optional):

```bash
pnpm -F api run db:seed
```

### Start Development Server

From the **monorepo root**:

```bash
pnpm dev
```

Or run only the API:

```bash
cd apps/api
pnpm dev
```

The API will be available at:
```
http://localhost:4000
```

Swagger documentation:
```
http://localhost:4000/docs
```

### Environment Variables

Create a `.env` file in `apps/api/` with:

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/livepro?schema=public"

# API
PORT=4000
NODE_ENV=development

# CORS (for local development)
CORS_ORIGIN=http://localhost:3001,http://localhost:3010,http://localhost:3020,http://localhost:3030,http://localhost:3040
```

---

## 🎯 Features

### API Modules

#### 1. **Events Module**
Manages live events (concerts, festivals, conferences):
- Create, read, update, delete events
- Event types: CONCERT, FESTIVAL, CLUB_NIGHT, CONFERENCE, PRIVATE
- Event metadata: name, location, start/end times

#### 2. **Stages Module**
Manages stages within events:
- Multiple stages per event
- Stage configuration and technical specs

#### 3. **Schedule Module**
Event scheduling and timeline management:
- Performance schedules
- Time slot allocation
- Schedule conflicts detection

#### 4. **Tasks Module**
Production task management:
- Task assignment and tracking
- Task dependencies
- Status management

#### 5. **Workspaces Module**
Multi-tenancy workspace management:
- Isolated workspaces for organizations
- Workspace-level permissions
- Team member management

---

## 📦 Database (Prisma)

### Schema Management

View database in Prisma Studio:

```bash
pnpm db:studio
```

Creates a GUI at `http://localhost:5555`

### Migrations

Create a new migration:

```bash
pnpm db:migrate
```

Push schema changes (development only):

```bash
pnpm db:push
```

Reset database (⚠️ destructive):

```bash
pnpm db:reset
```

### Key Models

- `Workspace` - Multi-tenant organizations
- `Event` - Live events
- `Stage` - Event stages
- `Schedule` - Event schedules
- `Task` - Production tasks
- `User` - (managed via Clerk externally)

---

## 🧪 Testing

### Unit Tests

```bash
pnpm test
```

### Watch Mode

```bash
pnpm test:watch
```

### Coverage Report

```bash
pnpm test:cov
```

### E2E Tests

```bash
pnpm test:e2e
```

### Debug Tests

```bash
pnpm test:debug
```

---

## 📚 API Documentation

### OpenAPI/Swagger

Access interactive API documentation:

```
http://localhost:4000/docs
```

Features:
- Complete endpoint documentation
- Request/response schemas
- Try-it-out functionality
- Auto-generated from NestJS decorators

### Generate TypeScript Client

The OpenAPI schema is used to generate type-safe clients for frontend apps.

From the **monorepo root**:

```bash
# 1. Ensure API is running
pnpm -F api dev

# 2. Generate OpenAPI schema and TypeScript types
pnpm gen:openapi
```

This creates `packages/api-types/schema.json` and generates TypeScript types used by frontend apps.

---

## 🧪 Available Scripts

```bash
# Development
pnpm dev                  # Start with watch mode
pnpm build                # Build for production
pnpm start                # Start production build
pnpm start:debug          # Start with debugger

# Database
pnpm db:generate          # Generate Prisma client
pnpm db:migrate           # Run migrations
pnpm db:push              # Push schema (dev only)
pnpm db:studio            # Open Prisma Studio
pnpm db:reset             # Reset database
pnpm db:seed              # Seed database

# Testing
pnpm test                 # Run unit tests
pnpm test:watch           # Run tests in watch mode
pnpm test:cov             # Generate coverage report
pnpm test:e2e             # Run E2E tests
pnpm test:debug           # Debug tests

# Code Quality
pnpm lint                 # Lint code
pnpm format               # Format code with Prettier
```

---

## 🔒 Authentication & Authorization

### Current Implementation

- CORS enabled for local development origins
- Ready for Clerk webhook integration
- Workspace-based multi-tenancy

### Future Enhancements

- Clerk JWT validation middleware
- Role-based access control (RBAC)
- Workspace permission guards
- API rate limiting

---

## 🏗 Architecture

### Modular Design

NestJS modules follow a feature-based structure:
- Each module is self-contained
- Controllers handle HTTP routing
- Services contain business logic
- DTOs validate request/response data
- Repositories abstract database access

### Dependency Injection

NestJS provides:
- Automatic dependency injection
- Singleton service instances
- Module encapsulation
- Testable components

---

## 🚢 Deployment

### Docker

Build and run with Docker:

```bash
# From monorepo root
docker build -f dockerfile.api -t livepro-api .
docker run -p 4000:4000 livepro-api
```

### Environment Variables (Production)

```env
DATABASE_URL=postgresql://user:password@host:5432/livepro
PORT=4000
NODE_ENV=production
```

### Health Check

The API provides a health check endpoint:

```
GET http://localhost:4000/health
```

---

## 🔍 Monitoring & Debugging

### Logging

NestJS built-in logger is available. Logs include:
- Request/response cycles
- Error stack traces
- Database queries (via Prisma)

### Debug Mode

Start with debugging enabled:

```bash
pnpm start:debug
```

Attach debugger on port `9229`.

---

## 🤝 Contributing

This API is part of the LivePro monorepo. See the [main README](../../README.md) for contribution guidelines.

### Adding a New Module

1. Generate module scaffold:
   ```bash
   nest generate module feature-name
   nest generate controller feature-name
   nest generate service feature-name
   ```

2. Add to `app.module.ts` imports

3. Create DTOs for validation

4. Update Prisma schema if needed

5. Generate OpenAPI types:
   ```bash
   pnpm gen:openapi
   ```

---

## 📄 License

See [LICENSE](../../LICENSE) in the repository root.
