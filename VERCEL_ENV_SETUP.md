# Vercel Environment Variables Setup Guide

## Overview
Each app needs environment variables configured in Vercel to point to the correct production URLs.

## Required Environment Variables
Add these to **each** Vercel project's environment variables:

```bash
NEXT_PUBLIC_PRODUCTION_URL=https://live-pro-production.vercel.app
NEXT_PUBLIC_TALENT_URL=https://live-pro-talent.vercel.app
NEXT_PUBLIC_STAFFING_URL=https://live-pro-staffing.vercel.app
NEXT_PUBLIC_FINANCE_URL=https://live-pro-finance.vercel.app
NEXT_PUBLIC_WEB_URL=https://live-pro-web.vercel.app
NEXT_PUBLIC_DOCS_URL=https://live-pro-docs.vercel.app
NEXT_PUBLIC_API_URL=https://livepro-api.fly.dev
```

## How to Add to Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable above for the **Production** environment
4. Redeploy your app

## Local Development

For local development, these variables default to `localhost` URLs:
- Production: `http://localhost:3010`
- Talent: `http://localhost:3020`
- Staffing: `http://localhost:3030`
- Finance: `http://localhost:3040`
- Web: `http://localhost:3001`
- Docs: `http://localhost:3000`
- API: `http://localhost:3333`

No local `.env` file is needed unless you want to override these defaults.

## Files Created
- `packages/ui/src/lib/app-config.ts` - Central config that reads from env vars
- `apps/web/.env.production` - Production env files (gitignored, for reference only)
- This guide for setup instructions
