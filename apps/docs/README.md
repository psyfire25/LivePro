# Docs App — LivePro Documentation Portal

The **Docs** app is a Next.js application that serves as the comprehensive documentation portal for the LivePro platform, providing guides, API documentation, and user help.

---

## 📋 Overview

This application provides:
- **User Guides** - Step-by-step instructions for all LivePro features
- **Technical Documentation** - Architecture, setup, and development guides
- **API Reference** - Complete API documentation and examples
- **Best Practices** - Recommended workflows and tips
- **Troubleshooting** - Common issues and solutions
- **Release Notes** - Version history and changelogs

---

## 🚀 Tech Stack

- **Framework**: Next.js 15.4.2 with App Router
- **Build Tool**: Turbopack
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS v4
- **UI Components**: Shared `@repo/ui` library
- **Animations**: `@repo/motion` shared animation library
- **Authentication**: Clerk (`@clerk/nextjs`) - Optional for private docs
- **Port**: 3000 (or 3050 depending on configuration)

---

## 🏗 Project Structure

```
apps/docs/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                 # Documentation homepage
│   ├── globals.css              # Global styles
│   ├── getting-started/         # Getting started guides
│   ├── user-guide/              # User documentation
│   │   ├── production/          # Production app guides
│   │   ├── staffing/            # Staffing app guides
│   │   ├── talent/              # Talent app guides
│   │   └── finance/             # Finance app guides
│   ├── api-reference/           # API documentation
│   ├── architecture/            # Technical architecture docs
│   └── troubleshooting/         # Help and troubleshooting
├── components/
│   ├── DocsNav.tsx              # Documentation navigation
│   ├── CodeBlock.tsx            # Code example component
│   └── Callout.tsx              # Warning/info callouts
└── package.json
```

---

## 🔧 Development

### Prerequisites

Dependencies installed from monorepo root:

```bash
pnpm install
```

### Start Development Server

From the **monorepo root**:

```bash
pnpm dev
```

Or run only the docs app:

```bash
cd apps/docs
pnpm dev
```

**Note**: The port configuration may vary. Check `package.json` for the actual port (default: 3000 or 3050).

Access at:
```
http://localhost:3000
```

### Environment Variables

Create `.env.local` in `apps/docs/` (if authentication is needed):

```env
# Clerk Authentication (Optional)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

---

## 🎯 Documentation Sections

### 1. **Getting Started**
- Installation and setup
- Quick start guide
- First event creation
- Basic workflows

### 2. **User Guides**

#### Production App
- Event management
- Stage configuration
- Production build
- Task management
- Logistics coordination

#### Staffing App
- Crew database management
- Scheduling workflows
- Shift management
- Availability tracking

#### Talent App
- Artist profiles
- Booking management
- Rider management
- Travel coordination

#### Finance App
- Budget creation
- Quote generation
- Invoice management
- Expense tracking
- Financial reporting

### 3. **API Reference**
- Authentication
- Endpoints documentation
- Request/response examples
- Error handling
- Rate limiting

### 4. **Architecture**
- Monorepo structure
- Tech stack overview
- Database schema
- Authentication flow
- Deployment guide

### 5. **Troubleshooting**
- Common issues
- FAQ
- Support resources
- Known limitations

---

## 📦 Shared Dependencies

| Package | Purpose |
|---------|---------|
| `@repo/ui` | Shared UI components for consistent styling |
| `@repo/motion` | Animations for smooth page transitions |
| `@repo/auth` | Authentication (if docs require login) |
| `@repo/tailwind-config` | Shared design system |

---

## 🧪 Available Scripts

```bash
pnpm dev          # Development server
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Lint code
pnpm check-types  # TypeScript type checking
```

---

## ✍️ Writing Documentation

### Markdown Support

Documentation pages use MDX (Markdown + React components):

```mdx
# Page Title

## Section

Regular markdown content here.

<Callout type="warning">
  Important note or warning
</Callout>

```typescript
// Code examples with syntax highlighting
const example = "hello world";
```

### Components

Use specialized documentation components:

#### Code Blocks
```tsx
<CodeBlock language="typescript" title="example.ts">
{`const code = "here";`}
</CodeBlock>
```

#### Callouts
```tsx
<Callout type="info">
  Informational message
</Callout>

<Callout type="warning">
  Warning message
</Callout>

<Callout type="error">
  Error or critical information
</Callout>
```

#### Navigation
- Use the `DocsNav` component for sidebar navigation
- Update navigation links in `components/DocsNav.tsx`

---

## 🎨 Styling

### Documentation Theme
- Clean, readable typography
- Proper heading hierarchy
- Code syntax highlighting
- Responsive tables
- Mobile-friendly navigation

### Customization
- Global styles: `app/globals.css`
- Tailwind config: Inherited from `@repo/tailwind-config`
- Component overrides: Create custom components in `components/`

---

## 🔍 Search

### Planned Features
- Full-text search across all documentation
- Quick navigation
- Keyboard shortcuts
- Search highlights

### Implementation Options
- Algolia DocSearch
- Fuse.js (client-side)
- Custom search API

---

## 🔗 Integration Points

### Links to Other Apps
- Production app examples
- Staffing workflows
- Talent management guides
- Finance tutorials
- API Swagger UI (`http://localhost:4000/docs`)

### External Resources
- Official Next.js docs
- Clerk documentation
- Prisma guides
- Tailwind CSS docs

---

## 🚢 Deployment

### Vercel

1. Connect repository
2. Configure build settings:
   - **Build Command**: `cd ../.. && pnpm build --filter=docs`
   - **Output Directory**: `.next`
   - **Install Command**: `pnpm install`
3. Deploy

### Static Site Generation

For maximum performance, consider static export:

```bash
pnpm build
```

This generates a static site suitable for hosting on:
- Vercel
- Netlify
- GitHub Pages
- S3 + CloudFront

---

## 📝 Documentation Standards

### Best Practices

1. **Clear Headings**: Use descriptive, hierarchical headings
2. **Code Examples**: Provide working code snippets
3. **Screenshots**: Include visual aids where helpful
4. **Step-by-Step**: Break complex tasks into numbered steps
5. **Cross-References**: Link related documentation
6. **Keep Updated**: Update docs with code changes

### Structure Guidelines

```markdown
# Feature Name

## Overview
Brief description of the feature

## Prerequisites
What's needed before starting

## Step-by-Step Guide
1. First step
2. Second step
...

## Examples
Code or usage examples

## Troubleshooting
Common issues and solutions

## Related
Links to related documentation
```

---

## 🤝 Contributing

Part of the LivePro monorepo. See [main README](../../README.md).

### Adding Documentation

1. Create new MDX file in appropriate directory
2. Update navigation in `DocsNav.tsx`
3. Follow documentation standards
4. Test locally
5. Submit PR

---

## 📄 License

See [LICENSE](../../LICENSE).
