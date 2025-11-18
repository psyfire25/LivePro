# Web App — LivePro Public Portal

The **Web** app is the main public-facing portal for the LivePro platform. It serves as the entry point for users and provides navigation to all specialized applications within the LivePro ecosystem.

---

## 📋 Overview

This Next.js application acts as:
- **Landing page** for the LivePro platform
- **Navigation hub** linking to Production, Staffing, Talent, Finance, and API documentation
- **Onboarding flow** for new users
- **Authentication gateway** using Clerk

---

## 🚀 Tech Stack

- **Framework**: Next.js 15.5.2 with App Router
- **Build Tool**: Turbopack (Next.js native bundler)
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS v4
- **UI Components**: Shared `@repo/ui` library (shadcn/ui based)
- **Animations**: `@repo/motion` shared animation library
- **Authentication**: Clerk (`@clerk/nextjs`)
- **Port**: 3001

---

## 🏗 Project Structure

```
apps/web/
├── app/
│   ├── layout.tsx          # Root layout with Clerk provider
│   ├── page.tsx             # Homepage with navigation to other apps
│   ├── globals.css          # Global styles
│   ├── onboarding/          # User onboarding flow
│   ├── sign-in/             # Sign-in page
│   └── sign-up/             # Sign-up page
├── public/                  # Static assets
└── package.json
```

---

## 🔧 Development

### Prerequisites

Ensure you're in the monorepo root with dependencies installed:

```bash
pnpm install
```

### Start Development Server

From the **monorepo root**:

```bash
pnpm dev
```

Or run only the web app:

```bash
cd apps/web
pnpm dev
```

The app will be available at:
```
http://localhost:3001
```

### Environment Variables

Create a `.env.local` file in `apps/web/` with:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Clerk Routes
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
```

---

## 🎯 Features

### 1. **Landing Page**
- Hero section introducing LivePro
- Quick links to all applications:
  - Production (`localhost:3010`)
  - Staffing (`localhost:3030`)
  - Talent (`localhost:3020`)
  - Finance (`localhost:3040`)
  - API Docs (`localhost:4000/docs`)

### 2. **Authentication**
- Clerk-powered sign-in/sign-up
- Workspace-based access control
- Session management

### 3. **Onboarding**
- New user onboarding flow
- Workspace setup guidance

### 4. **Responsive Design**
- Mobile-first approach
- Shared design system from `@repo/ui`
- Smooth animations via `@repo/motion`

---

## 📦 Shared Dependencies

This app uses monorepo-shared packages:

| Package | Purpose |
|---------|---------|
| `@repo/ui` | Shared Tailwind v4 + shadcn/ui components |
| `@repo/motion` | Animation helpers (Reveal, transitions) |
| `@repo/auth` | Shared authentication utilities |
| `@repo/tailwind-config` | Shared Tailwind configuration |
| `@repo/typescript-config` | Shared TypeScript settings |
| `@repo/eslint-config` | Shared ESLint rules |

---

## 🧪 Available Scripts

```bash
# Start development server (port 3001)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint

# Type-check without emitting
pnpm check-types
```

---

## 🔗 Integration Points

### Links to Other Apps

The web app provides navigation to:
- **Production** app (event management)
- **Staffing** app (crew scheduling)
- **Talent** app (artist management)
- **Finance** app (budgeting & invoicing)
- **API Documentation** (Swagger UI)

### Shared Authentication

All apps share Clerk authentication state through the `@repo/auth` package, ensuring seamless navigation between applications.

---

## 🎨 Customization

### Modifying the Homepage

Edit `app/page.tsx` to update:
- Hero content
- Navigation links
- Feature cards
- Call-to-action buttons

### Styling

- Global styles: `app/globals.css`
- Tailwind config: Inherited from `@repo/tailwind-config`
- Component styles: Use shared components from `@repo/ui`

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Authentication](https://clerk.com/docs)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Turborepo Documentation](https://turbo.build/repo)

---

## 🚢 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Configure build settings:
   - **Build Command**: `cd ../.. && pnpm build --filter=web`
   - **Output Directory**: `.next`
   - **Install Command**: `pnpm install`
3. Set environment variables (Clerk keys)
4. Deploy

### Docker

A Docker configuration is available at the root:

```bash
docker build -f dockerfile.web -t livepro-web .
docker run -p 3001:3001 livepro-web
```

---

## 🤝 Contributing

This app is part of the LivePro monorepo. See the [main README](../../README.md) for contribution guidelines.

---

## 📄 License

See [LICENSE](../../LICENSE) in the repository root.
