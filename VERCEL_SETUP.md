# Vercel Deployment Setup Guide

## Why this was needed

Vercel has a read-only filesystem, so writing to `data/projects.json` does not persist in production.

Projects now persist in Cloudinary as a JSON raw asset, so adding projects from the admin panel stays saved across restarts and redeploys.

## Required environment variables

Set these in Vercel Project Settings -> Environment Variables:

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

Optional:

- `PROJECTS_DATA_PUBLIC_ID` (default: `portfolio/projects-data`)
- `WEBSITES_DATA_PUBLIC_ID` (default: `portfolio/websites-data`)

## How it works now

- Production:
  Projects and Websites are read/written from Cloudinary JSON.
- Local:
  Projects and Websites are read/written from local JSON files.

## Adding projects

Use the admin panel normally. No manual env var edits are needed for each new project.

## Troubleshooting

- If projects are not updating:
  Verify Cloudinary variables are set correctly in Vercel and redeploy once.
- To inspect stored data:
  Check the raw asset in Cloudinary using `PROJECTS_DATA_PUBLIC_ID`.
