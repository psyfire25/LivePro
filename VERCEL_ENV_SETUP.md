# Vercel Environment Setup for LivePro

## Current ngrok API URL
```
https://d480e1287d2d.ngrok-free.app
```

## Steps to Fix 500 Errors

### 1. Update Vercel Environment Variables

For **each app** (production, talent, staffing, finance):

1. Go to Vercel Dashboard → Select the app
2. Settings → Environment Variables
3. Add or update:
   - **Name:** `NEXT_PUBLIC_API_URL`
   - **Value:** `https://d480e1287d2d.ngrok-free.app`
   - **Select all environments** (Production, Preview, Development)
4. Click "Save"
5. Go to Deployments and trigger a redeploy (or push a new commit)

### 2. When ngrok URL Changes

ngrok free tier URLs change when you restart. To get your new URL:

```bash
# Check your current ngrok URL
curl http://127.0.0.1:4040/api/tunnels | jq '.tunnels[0].public_url'
```

Then update all Vercel apps with the new URL and redeploy.

### 3. Alternative: Use ngrok Static Domain (Recommended for Production)

If you upgrade to ngrok paid tier, you can use a static domain that won't change:
- Upgrade at https://dashboard.ngrok.com
- Configure a static domain in ngrok config
- Update Vercel once and forget about it

## Testing

After deploying to Vercel, visit each app URL and verify:
- Production: `https://your-production-app.vercel.app/` (should not show error)
- Talent: `https://your-talent-app.vercel.app/`
- Staffing: `https://your-staffing-app.vercel.app/`
- Finance: `https://your-finance-app.vercel.app/`
