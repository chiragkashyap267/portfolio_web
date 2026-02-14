import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Use environment variable for deployed version, fallback to file for local development
const isProduction = process.env.NODE_ENV === "production";
const filePath = path.join(
  process.cwd(),
  "data",
  "projects.json"
);

// In-memory cache for production
let cachedProjects: any[] | null = null;

function readData() {
  // For production/Vercel, use environment variable and in-memory cache
  if (isProduction) {
    if (!cachedProjects) {
      const envData = process.env.PROJECTS_DATA;
      try {
        cachedProjects = envData ? JSON.parse(envData) : [];
      } catch {
        cachedProjects = [];
      }
    }
    return cachedProjects;
  }

  // For local development, use filesystem
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
  const raw = fs.readFileSync(filePath, "utf-8");
  return raw ? JSON.parse(raw) : [];
}

function writeData(data: any) {
  // For production/Vercel, update in-memory cache
  if (isProduction) {
    cachedProjects = data;
    console.log("Projects updated in memory. Note: Changes persist only during current session.");
    console.log("To persist changes, update PROJECTS_DATA environment variable with:", JSON.stringify(data));
    return;
  }

  // For local development, write to filesystem
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

/* ================= GET ================= */
export async function GET() {
  try {
    const projects = readData();
    return NextResponse.json(projects);
  } catch (err) {
    console.error("PROJECT GET ERROR:", err);
    return NextResponse.json([], { status: 200 });
  }
}

/* ================= POST ================= */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("PROJECT POST BODY:", body);

    if (!body.title || !body.image) {
      return NextResponse.json(
        { error: "Invalid payload" },
        { status: 400 }
      );
    }

    const projects = readData();
    projects.push(body);
    writeData(projects);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("PROJECT POST ERROR:", err);
    return NextResponse.json(
      { error: "Failed to save project" },
      { status: 500 }
    );
  }
}

/* ================= DELETE ================= */
export async function DELETE(req: Request) {
  try {
    const { index } = await req.json();
    const projects = readData();

    if (index < 0 || index >= projects.length) {
      return NextResponse.json(
        { error: "Invalid index" },
        { status: 400 }
      );
    }

    projects.splice(index, 1);
    writeData(projects);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("PROJECT DELETE ERROR:", err);
    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}
