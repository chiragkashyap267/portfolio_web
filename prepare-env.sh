#!/bin/bash
# Script to prepare projects data for Vercel environment variable

# Read projects.json and output in environment variable format
if [ -f "data/projects.json" ]; then
  echo "Copy the content below to PROJECTS_DATA in Vercel Environment Variables:"
  echo "=================================================="
  cat data/projects.json | tr '\n' ' ' | sed 's/  */ /g'
  echo ""
  echo "=================================================="
  echo "Done! Paste this in your Vercel dashboard."
else
  echo "Error: data/projects.json not found"
fi
