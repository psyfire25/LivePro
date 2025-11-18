# Finance App — Budgeting & Financial Management

The **Finance** app is a specialized Next.js application for managing budgets, quotes, invoices, and financial tracking for live events.

---

## 📋 Overview

This application provides tools for:
- **Event Budgeting** - Create and manage event budgets
- **Quote Generation** - Create professional quotes and estimates
- **Invoice Management** - Track invoices and payments
- **Expense Tracking** - Monitor costs and spending
- **Vendor Payments** - Manage vendor invoices and payment schedules
- **Financial Reporting** - Generate financial reports and analytics

---

## 🚀 Tech Stack

- **Framework**: Next.js 15.5.2 with App Router
- **Build Tool**: Turbopack
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **UI Components**: Shared `@repo/ui` library
- **Animations**: `@repo/motion` shared animation library
- **Authentication**: Clerk (`@clerk/nextjs`)
- **Port**: 3040

---

## 🏗 Project Structure

```
apps/finance/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with auth
│   │   ├── page.tsx             # Dashboard
│   │   ├── globals.css          # Global styles
│   │   ├── budgets/             # Budget management
│   │   ├── quotes/              # Quote generation
│   │   ├── invoices/            # Invoice tracking
│   │   ├── expenses/            # Expense tracking
│   │   └── reports/             # Financial reporting
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

Or run only the finance app:

```bash
cd apps/finance
pnpm dev
```

Access at:
```
http://localhost:3040
```

### Environment Variables

Create `.env.local` in `apps/finance/`:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# API Backend
NEXT_PUBLIC_API_URL=http://localhost:4000
```

---

## 🎯 Features

### 1. **Event Budgeting**
- Create comprehensive event budgets
- Budget categories:
  - Talent & Artist Fees
  - Production & Equipment
  - Staffing & Crew
  - Venue & Logistics
  - Marketing & Promotion
  - Insurance & Permits
  - Contingency
- Budget vs. Actual tracking
- Multi-currency support
- Budget templates for recurring event types

### 2. **Quote Generation**
- Professional quote creation
- Line-item details with descriptions
- Terms and conditions
- Quote versions and revisions
- Acceptance workflow
- Convert quotes to invoices
- PDF export

### 3. **Invoice Management**
- Create and send invoices
- Track invoice status:
  - Draft
  - Sent
  - Paid
  - Overdue
  - Cancelled
- Payment tracking and reconciliation
- Recurring invoices
- Payment reminders
- Multi-payment support

### 4. **Expense Tracking**
- Record event expenses
- Receipt attachment and storage
- Expense categorization
- Vendor/supplier tracking
- Approval workflows
- Expense reports
- Budget reconciliation

### 5. **Vendor Payments**
- Vendor invoice tracking
- Payment schedules and terms
- Payment status monitoring
- Vendor contact management
- Payment history

### 6. **Financial Reporting**
- Event profitability analysis
- Budget variance reports
- Cash flow projections
- Expense breakdown by category
- Payment status summaries
- Historical financial data
- Export to CSV/Excel

### 7. **Role-Based Access**
- **View-only**: For crew and general users
- **Finance Staff**: Create and manage financial documents
- **Manager**: Approve budgets and payments
- **Admin**: Full financial access and reporting

---

## 📦 Shared Dependencies

| Package | Purpose |
|---------|---------|
| `@repo/ui` | Shared UI components (forms, tables, modals) |
| `@repo/motion` | Animations and transitions |
| `@repo/auth` | Authentication and role-based permissions |

---

## 🧪 Available Scripts

```bash
pnpm dev          # Development server (port 3040)
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Lint code
```

---

## 💰 Financial Features

### Currency Management
- Multi-currency support
- Exchange rate tracking
- Currency conversion
- Default currency per workspace

### Tax Handling
- Configurable tax rates
- Tax-inclusive/exclusive pricing
- Tax reports
- Multiple tax jurisdictions

### Payment Methods
- Track payment methods (bank transfer, card, check, cash)
- Payment reconciliation
- Payment gateway integration (planned)

---

## 🔗 Integration Points

### With Other Apps
- **Production** - Event budgets linked to production events
- **Staffing** - Crew payroll and expenses
- **Talent** - Artist fees and payments
- **API** - Financial data persistence

### External Integrations (Planned)
- Accounting software (QuickBooks, Xero)
- Payment gateways (Stripe, PayPal)
- Banking APIs for reconciliation
- Receipt scanning and OCR

---

## 📊 Reporting & Analytics

### Dashboard Metrics
- Total revenue
- Total expenses
- Profit margin
- Outstanding invoices
- Upcoming payments
- Budget health indicators

### Custom Reports
- Date range filtering
- Event-specific reports
- Vendor/supplier reports
- Client reports
- Tax reports

---

## 🚢 Deployment

### Vercel

```bash
# Build command
cd ../.. && pnpm build --filter=finance
```

Set environment variables:
- Clerk keys
- API URL

### Security Considerations

⚠️ **Financial Data Protection**:
- Ensure HTTPS in production
- Implement audit logging
- Regular backups
- Access control and permissions
- PCI compliance for payment handling

---

## 🤝 Contributing

Part of the LivePro monorepo. See [main README](../../README.md).

### Adding Financial Features

1. Database schema updates via Prisma
2. API endpoints in backend
3. Type-safe client generation
4. UI components using `@repo/ui`
5. Role-based access control

---

## 📄 License

See [LICENSE](../../LICENSE).
