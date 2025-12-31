import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

/* ================= FILE PATH ================= */

const filePath = path.join(
  process.cwd(),
  "data",
  "certificates.json"
);

/* ================= HELPERS ================= */

function readData() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

function writeData(data: any) {
  fs.writeFileSync(
    filePath,
    JSON.stringify(data, null, 2)
  );
}

/* ================= GET ================= */
/* Fetch all certificates */

export async function GET() {
  try {
    const certificates = readData();
    return NextResponse.json(certificates);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read certificates" },
      { status: 500 }
    );
  }
}

/* ================= POST ================= */
/* Add new certificate */

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.title || !body.image) {
      return NextResponse.json(
        { error: "Title and image are required" },
        { status: 400 }
      );
    }

    const certificates = readData();

    certificates.push({
      title: body.title,
      image: body.image,
      link: body.link || "",
      createdAt: new Date().toISOString(),
    });

    writeData(certificates);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add certificate" },
      { status: 500 }
    );
  }
}

/* ================= DELETE ================= */
/* Delete certificate by index */

export async function DELETE(req: Request) {
  try {
    const { index } = await req.json();
    const certificates = readData();

    if (index < 0 || index >= certificates.length) {
      return NextResponse.json(
        { error: "Invalid index" },
        { status: 400 }
      );
    }

    certificates.splice(index, 1);
    writeData(certificates);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete certificate" },
      { status: 500 }
    );
  }
}
