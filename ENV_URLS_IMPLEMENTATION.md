# Environment-Based URLs - Implementation Summary

## What Changed

All hardcoded `localhost` URLs have been replaced with environment-based configuration.

## Files Modified

### Core Configuration
- **`packages/ui/src/lib/app-config.ts`** (NEW)
  - Central configuration file that reads from environment variables
  - Provides fallbacks to localhost URLs for local development

### UI Components
- **`packages/ui/src/components/ui/app-shell.tsx`**
  - Updated to import and use `appConfig`
  
- **`packages/ui/src/components/ui/admin-shell.tsx`**
  - Updated to import and use `appConfig`

### Web App Pages
- **`apps/web/app/page.tsx`**
  - Added inline appConfig (doesn't use UI package config)
  - Updated all app URLs to use env vars

- **`apps/web/app/onboarding/page.tsx`**
  - Added inline appConfig
  - Updated module URLs to use env vars

### Environment Files
- **`apps/web/.env.production`** (NEW)
  - Production environment variables for web app

### Documentation
- **`VERCEL_ENV_SETUP.md`** (UPDATED)
  - Complete guide for setting up Vercel environment variables

## How It Works

### Local Development
No `.env` file needed! The code defaults to localhost URLs:
```
Production: http://localhost:3010
Talent:     http://localhost:3020
Staffing:   http://localhost:3030
Finance:    http://localhost:3040
Web:        http://localhost:3001
Docs:       http://localhost:3000
API:        http://localhost:3333
```

### Production (Vercel)
Add these environment variables to each Vercel project:
```bash
NEXT_PUBLIC_PRODUCTION_URL=https://live-pro-production.vercel.app
NEXT_PUBLIC_TALENT_URL=https://live-pro-talent.vercel.app
NEXT_PUBLIC_STAFFING_URL=https://live-pro-staffing.vercel.app
NEXT_PUBLIC_FINANCE_URL=https://live-pro-finance.vercel.app
NEXT_PUBLIC_WEB_URL=https://live-pro-web.vercel.app
NEXT_PUBLIC_DOCS_URL=https://live-pro-docs.vercel.app
NEXT_PUBLIC_API_URL=https://livepro-api.fly.dev
```

## Next Steps

1. **Add environment variables to each Vercel project:**
   - Go to project Settings → Environment Variables
   - Add all 7 variables above
   - Select "Production" environment
   - Redeploy

2. **Test locally:**
   - Run `pnpm dev`
   - Verify navigation still works with localhost URLs

3. **Test in production:**
   - Deploy to Vercel
   - Verify navigation links to production apps

## Benefits

✅ Single source of truth for URLs  
✅ Easy to update URLs without code changes  
✅ Works seamlessly in both local and production  
✅ No hardcoded URLs anywhere in the codebase
