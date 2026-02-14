# Vercel Deployment Setup Guide

## Issue: Projects Upload Not Working on Vercel

**Problem:** Vercel has a read-only filesystem, so you cannot write to `data/projects.json` after deployment.

**Solution:** Use the `PROJECTS_DATA` environment variable to persist project data.

---

## Setup Steps

### 1. Prepare Your Current Projects Data

Run this command in your terminal to get the JSON content:

```bash
# On Windows PowerShell
Get-Content "data/projects.json" | Write-Output
```

This will output your current projects data.

### 2. Add Environment Variable to Vercel

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings → Environment Variables**
4. Click **Add New** and create:
   - **Name:** `PROJECTS_DATA`
   - **Value:** Paste your entire projects JSON content (from step 1)
   - **Environments:** Select `Production`, `Preview`, and `Development`

Example format:
```
[{"title":"Project 1","description":"...","tech":["React","Node"],"image":"...","github":"...","live":"..."}]
```

### 3. Deploy to Vercel

Push your updated code:
```bash
git add .
git commit -m "Fix: projects upload for Vercel deployment"
git push origin main
```

Your Vercel deployment will automatically rebuild and use the new code.

---

## How It Works Now

### Local Development (works as before)
- Projects are saved to `data/projects.json`
- Changes persist automatically
- No additional setup needed

### Vercel Production (new approach)
- Projects load from `PROJECTS_DATA` environment variable at build time
- New projects are cached in memory during the session
- To persist new projects, you must manually update the `PROJECTS_DATA` environment variable

---

## Adding New Projects on Vercel

### Option 1: Manual Update (Recommended for now)

1. Add projects locally and test
2. Copy the updated `data/projects.json` content
3. Update `PROJECTS_DATA` in Vercel environment variables
4. Redeploy

### Option 2: Use Database (Future Enhancement)

Consider migrating to:
- **Firebase Firestore** (real-time database)
- **MongoDB Atlas** (cloud database)
- **Supabase** (PostgreSQL alternative)

This would allow adding projects directly without rebuilding.

---

## Troubleshooting

**Q: Changes not appearing on Vercel?**
A: Make sure you updated the `PROJECTS_DATA` environment variable and redeployed.

**Q: How do I see what's currently saved?**
A: Check the Vercel environment variables in your dashboard.

**Q: Can I use a different solution?**
A: Yes! Consider the database options above for better long-term management.

---

## What Was Changed

1. **API Route** (`app/api/projects/route.ts`):
   - Detects if running on production (Vercel)
   - Uses `PROJECTS_DATA` env var on production
   - Uses filesystem on local development

2. **Project Cards** (`app/components/Projects.tsx`):
   - Improved styling with better hover effects
   - Added text wrapping for long titles
   - Boxy design with stronger borders
   - Better responsive layout (md: 6 instead of md: 5)
