import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(
  process.cwd(),
  "data",
  "projects.json"
);

function readData() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
  const raw = fs.readFileSync(filePath, "utf-8");
  return raw ? JSON.parse(raw) : [];
}

function writeData(data: any) {
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
