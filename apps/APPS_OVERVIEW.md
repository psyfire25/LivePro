# LivePro Apps Overview

This document provides a comprehensive overview of all applications within the LivePro monorepo, their purposes, and how they work together.

---

## 📦 Applications Summary

The LivePro platform consists of **7 specialized applications** working together to provide a complete live event management solution:

| App | Port | Purpose | Tech |
|-----|------|---------|------|
| [Web](#web-app) | 3001 | Public portal & navigation hub | Next.js 15.5 |
| [Production](#production-app) | 3010 | Event production management | Next.js 15.5 |
| [Talent](#talent-app) | 3020 | Artist & talent coordination | Next.js 15.5 |
| [Staffing](#staffing-app) | 3030 | Crew scheduling & management | Next.js 15.5 |
| [Finance](#finance-app) | 3040 | Budgets, quotes & invoices | Next.js 15.5 |
| [Docs](#docs-app) | 3000 | Documentation portal | Next.js 15.4 |
| [API](#api-backend) | 4000 | Backend service | NestJS 11.0 |

---

## 🌐 Web App

**Location**: `apps/web/`  
**Port**: 3001  
**Role**: Main entry point

### Purpose
- Landing page for the LivePro platform
- Navigation hub linking to all other apps
- User onboarding flow
- Authentication gateway

### Key Features
- Hero section with platform introduction
- Quick links to all applications
- Clerk-powered authentication
- Sign-in/sign-up flows
- Workspace onboarding

### When to Use
- First access point for new users
- Central navigation between apps
- User authentication and setup

### Documentation
See [apps/web/README.md](./web/README.md) for detailed information.

---

## 🎬 Production App

**Location**: `apps/production/`  
**Port**: 3010  
**Role**: Core production management

### Purpose
Comprehensive event production planning and execution:
- Event creation and management
- Stage configuration
- Production build and logistics
- Task assignment and tracking
- Schedule coordination

### Key Features

#### Event Management
- Create events (concerts, festivals, conferences, etc.)
- Event metadata and details
- Multi-event support per workspace
- Event dashboard

#### Production Build (Manager+ Role)
- Stage setup and configuration
- Equipment tracking
- Technical specifications
- Build schedules

#### Logistics (Manager+ Role)
- Crew coordination
- Supplier management
- Transport logistics
- Load-in/load-out planning

#### Role-Based Access
- **Viewer**: View-only access
- **Member**: Create and edit tasks
- **Manager**: Full production tools access
- **Admin**: Complete workspace control

### When to Use
- Planning a new event
- Managing event logistics
- Coordinating production teams
- Tracking production tasks

### Documentation
See [apps/production/README.md](./production/README.md) for detailed information.

---

## 🎤 Talent App

**Location**: `apps/talent/`  
**Port**: 3020  
**Role**: Artist and performer management

### Purpose
Manage all aspects of talent coordination:
- Artist database and profiles
- Booking and contract management
- Technical and hospitality riders
- Performance scheduling
- Travel and accommodation

### Key Features

#### Artist Management
- Comprehensive artist profiles
- Performance history
- Contact information (artist, agent, manager)
- Press kits and promotional materials

#### Bookings & Contracts
- Booking creation and tracking
- Contract status monitoring
- Payment terms and schedules
- Deposit tracking

#### Rider Management
- Technical riders (stage plots, equipment, sound)
- Hospitality riders (catering, green room)
- Rider templates
- Version control

#### Scheduling
- Set times and stage assignments
- Soundcheck schedules
- Load-in times
- Performance duration

#### Travel & Logistics
- Flight and transport bookings
- Hotel accommodations
- Ground transportation
- Tour itineraries

### When to Use
- Booking artists for events
- Managing artist requirements
- Coordinating talent logistics
- Tracking performance schedules

### Documentation
See [apps/talent/README.md](./talent/README.md) for detailed information.

---

## 👥 Staffing App

**Location**: `apps/staffing/`  
**Port**: 3030  
**Role**: Crew and staff coordination

### Purpose
Complete workforce management for events:
- Crew database management
- Staff scheduling
- Availability tracking
- Shift management
- Crew communication

### Key Features

#### Crew Database
- Crew profiles and contact info
- Skills and certifications
- Work history and ratings
- Emergency contacts
- Availability calendars

#### Scheduling
- Event-specific schedules
- Role and shift assignments
- Visual timeline views
- Conflict detection
- Shift templates

#### Role Management
- Define crew roles (Production Manager, Stage Tech, etc.)
- Role requirements
- Pay rates and terms
- Hierarchy structure

#### Availability
- Availability submissions
- Blackout dates
- Real-time status tracking

#### Communication
- Crew notifications
- Schedule updates
- Document sharing (call sheets)

### When to Use
- Scheduling crew for events
- Managing staff database
- Coordinating work shifts
- Tracking crew availability

### Documentation
See [apps/staffing/README.md](./staffing/README.md) for detailed information.

---

## 💰 Finance App

**Location**: `apps/finance/`  
**Port**: 3040  
**Role**: Financial management and tracking

### Purpose
Complete financial tools for events:
- Event budgeting
- Quote generation
- Invoice management
- Expense tracking
- Financial reporting

### Key Features

#### Budgeting
- Event budget creation
- Budget categories (talent, production, staffing, etc.)
- Budget vs. Actual tracking
- Multi-currency support
- Budget templates

#### Quotes & Invoices
- Professional quote generation
- Quote to invoice conversion
- Payment tracking
- Recurring invoices
- PDF export

#### Expense Tracking
- Record event expenses
- Receipt management
- Vendor tracking
- Approval workflows
- Budget reconciliation

#### Financial Reporting
- Profitability analysis
- Budget variance reports
- Cash flow projections
- Payment status summaries
- Export capabilities

#### Advanced Features
- Multi-currency support
- Tax handling
- Payment method tracking
- Role-based financial access

### When to Use
- Creating event budgets
- Generating client quotes
- Tracking expenses and payments
- Financial reporting and analysis

### Documentation
See [apps/finance/README.md](./finance/README.md) for detailed information.

---

## 📚 Docs App

**Location**: `apps/docs/`  
**Port**: 3000  
**Role**: Documentation and help

### Purpose
Comprehensive documentation portal:
- User guides for all apps
- Technical documentation
- API reference
- Best practices
- Troubleshooting

### Key Features

#### Documentation Sections
- Getting started guides
- App-specific user guides
- API reference
- Architecture documentation
- Troubleshooting and FAQ

#### Features
- Markdown/MDX support
- Code syntax highlighting
- Interactive examples
- Search functionality (planned)
- Responsive navigation

### When to Use
- Learning platform features
- Technical implementation guidance
- API documentation reference
- Troubleshooting issues

### Documentation
See [apps/docs/README.md](./docs/README.md) for detailed information.

---

## 🔧 API Backend

**Location**: `apps/api/`  
**Port**: 4000  
**Role**: Backend service for all apps

### Purpose
Centralized backend providing:
- RESTful API for all apps
- PostgreSQL database integration
- OpenAPI documentation
- Type-safe client generation
- Business logic and validation

### Key Features

#### Modules
- **Events**: Event CRUD operations
- **Stages**: Stage management
- **Schedule**: Event scheduling
- **Tasks**: Task management
- **Workspaces**: Multi-tenancy

#### Database (Prisma)
- PostgreSQL integration
- Migration management
- Database seeding
- Prisma Studio GUI

#### API Documentation
- Swagger/OpenAPI at `/docs`
- Interactive API testing
- Auto-generated schemas
- Type-safe client generation

#### Testing
- Unit tests with Jest
- E2E tests
- Test coverage reports

### When to Use
- All frontend apps communicate with this API
- Database operations
- Business logic
- Multi-tenant data isolation

### Documentation
See [apps/api/README.md](./api/README.md) for detailed information.

---

## 🔄 How Apps Work Together

### Authentication Flow

```
User → Web App → Clerk Auth → All Apps (shared session)
```

All apps use Clerk for unified authentication. Once logged in, users can navigate between apps seamlessly.

### Data Flow

```
Frontend Apps → API (Port 4000) → PostgreSQL Database
```

All apps communicate with the central API backend. No direct database access from frontends.

### Workspace Isolation

```
Organization → Workspace → Events/Data
```

All data is scoped to workspaces, ensuring multi-tenant isolation.

### Example User Journey

1. **User arrives** → Web App (3001)
2. **Signs up/in** → Clerk authentication
3. **Onboarding** → Workspace setup
4. **Creates event** → Production App (3010)
5. **Books artists** → Talent App (3020)
6. **Schedules crew** → Staffing App (3030)
7. **Manages budget** → Finance App (3040)
8. **Needs help** → Docs App (3000)

All data persists through API (4000) to PostgreSQL.

---

## 🛠 Development Quick Start

### Start All Apps

From monorepo root:

```bash
# Install dependencies
pnpm install

# Start database
docker compose up -d

# Initialize database
pnpm db:migrate
pnpm db:generate

# Start all apps
pnpm dev
```

### Individual Apps

```bash
# Web
cd apps/web && pnpm dev

# Production
cd apps/production && pnpm dev

# Talent
cd apps/talent && pnpm dev

# Staffing
cd apps/staffing && pnpm dev

# Finance
cd apps/finance && pnpm dev

# Docs
cd apps/docs && pnpm dev

# API
cd apps/api && pnpm dev
```

---

## 📦 Shared Packages

All apps leverage shared monorepo packages:

| Package | Purpose | Used By |
|---------|---------|---------|
| `@repo/ui` | Shared UI components (shadcn/ui) | All frontend apps |
| `@repo/motion` | Animation utilities | All frontend apps |
| `@repo/auth` | Authentication utilities | All apps |
| `@repo/tailwind-config` | Tailwind configuration | All frontend apps |
| `@repo/typescript-config` | TypeScript settings | All apps |
| `@repo/eslint-config` | ESLint rules | All apps |
| `@livepro/api-types` | Type-safe API client | Frontend apps |

---

## 🚀 Deployment Strategy

### Frontend Apps
- **Recommended**: Vercel
- **Alternative**: Docker, AWS Amplify, Netlify

### Backend API
- **Recommended**: Docker + Cloud provider (AWS, GCP, Azure)
- **Alternative**: Heroku, Railway, Render

### Database
- **Production**: Managed PostgreSQL (AWS RDS, Supabase, etc.)
- **Development**: Docker Compose

---

## 🔐 Security Considerations

### Authentication
- Clerk manages all user authentication
- JWT tokens for API requests
- Session management across apps

### Authorization
- Role-based access control (RBAC)
- Workspace-level permissions
- Feature-level guards

### Data Protection
- HTTPS in production
- Database encryption
- Secure environment variables
- Regular security audits

---

## 📊 Monitoring & Observability

### Planned Features
- Application performance monitoring (APM)
- Error tracking (Sentry)
- Usage analytics
- Database performance monitoring
- API request logging

---

## 🤝 Contributing

See the main [README.md](../../README.md) in the monorepo root for:
- Contribution guidelines
- Development workflow
- Code standards
- Pull request process

---

## 📄 License

See [LICENSE](../../LICENSE) in the repository root.

---

## 📞 Support

For questions or issues:
1. Check the [Docs App](http://localhost:3000)
2. Review individual app READMEs
3. Check the main monorepo README
4. Open an issue in the repository
