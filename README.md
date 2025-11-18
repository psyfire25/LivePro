# LivePro — Live Event Management Platform

LivePro is a modern, scalable event-management system built as a Turborepo monorepo.  
It contains multiple specialized Next.js applications, a NestJS API backend, shared UI libraries, reusable utilities, and a PostgreSQL database—designed to run together as a cohesive platform for managing the full lifecycle of live events.

---

## 📦 Monorepo Architecture

LivePro uses **Turborepo** with **pnpm workspaces** to manage multiple applications and shared packages:

```
/apps
  /web          → public-facing app
  /production   → event production tools
  /staffing     → staffing & crew scheduling
  /talent       → artist & talent management
  /finance      → budgeting, quotes, invoices
  /docs         → documentation site
  /api          → NestJS backend

/packages
  /ui           → shared Tailwind + shadcn UI components
  /config       → TypeScript, ESLint, Tailwind configs
  /api-types    → OpenAPI-generated client types
  /motion       → shared motion/animation helpers
  /auth         → shared auth utilities and middleware
```

Each app runs independently during development using Turborepo task pipelines and shared caching.

---

## 🚀 Tech Stack

### Frontend
- Next.js 15 (Turbopack)
- TypeScript 5.9
- Tailwind CSS v4
- shadcn/ui shared component system  
- Clerk authentication  
- OpenAPI-typed API client

### Backend
- NestJS (modular architecture)
- Prisma ORM
- PostgreSQL
- OpenAPI/Swagger schema generation

### Infrastructure
- Docker Compose (PostgreSQL)
- pnpm + Turborepo
- ESLint + Prettier
- Jest for backend tests

---

## 🔧 Development

Install dependencies:

```sh
pnpm install
```

Start the full stack:

```sh
pnpm dev
```

Default application ports:

- Web: **3001**
- Docs: **3000**
- Production: **3010**
- Talent: **3020**
- Staffing: **3030**
- Finance: **3040**
- API (NestJS): **3333**

---

## 🗄 Database

LivePro uses **PostgreSQL** with Prisma.

Start the database using Docker:

```sh
docker compose up -d
```

Apply migrations:

```sh
pnpm prisma:migrate
```

Generate Prisma client:

```sh
pnpm prisma:generate
```

---

## 🔐 Authentication

All frontend apps integrate **Clerk** for:

- User authentication
- Role-based access control
- Workspace scoping
- Shared middleware for public/private routes

---

## 📚 Documentation

- API documentation is available via Swagger:

```
http://localhost:3333/api
```

- Additional documentation lives in `/apps/docs`.

---

## 🧪 Testing

Backend tests (Jest):

```sh
pnpm api:test
```

Integration and E2E tests are planned for frontend applications.

---

## 📁 Environment Variables

Each app requires its own `.env` file.  
A template is provided: **`.env.example`**

Copy it:

```sh
cp .env.example .env
```

Common variables include:

- Database URL
- Clerk keys
- API URLs

---

## 🧱 Shared Packages

### UI Library (`packages/ui`)
Shared design system based on Tailwind v4 and shadcn/ui.

### API Types (`packages/api-types`)
Generated TypeScript bindings from the NestJS OpenAPI schema.

### Utils & Config
Shared helpers and configuration packages for ESLint, Prettier, Tailwind, and TypeScript.

---

## 📦 Deployment (Planned)

Upcoming work includes:

- Full Docker Compose stack (API + frontend + PostgreSQL)
- GitHub Actions CI/CD
- Production Docker images
- Database backup strategy

---

## 🛠 Roadmap & Improvements

### High Priority
- Align Next.js versions across all apps  
- Remove unused files (e.g., `production.zip`)  
- Add shared API client library  
- Improve environment variable handling  

### Medium Priority
- Add Husky + lint-staged  
- Expand OpenAPI documentation  
- Add integration tests for frontends  
- Add full-stack Docker setup  

### Low Priority
- Centralize shared validation schemas  
- Add Storybook for UI documentation  
- Add analytics and monitoring  

---

## 📘 Summary

LivePro is a well-structured, modern monorepo designed for the full workflow of live event production.  
With multiple specialized apps, a typed API, a shared UI system, and scalable architecture, it forms a strong foundation for a professional-grade events platform.

Documentation, testing, version alignment, and deployment will elevate it to production quality.