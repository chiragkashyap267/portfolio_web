import { NextResponse } from "next/server";
import {
  getCertificates,
  normalizeCertificate,
  saveCertificates,
} from "@/app/lib/certificatesStore";

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error.trim()) return error;
  if (error && typeof error === "object") {
    const e = error as { message?: unknown; error?: { message?: unknown }; http_code?: unknown };
    if (typeof e.message === "string" && e.message.trim()) return e.message;
    if (e.error && typeof e.error.message === "string" && e.error.message.trim())
      return e.error.message;
    if (typeof e.http_code === "number") return `${fallback} (HTTP ${e.http_code})`;
  }
  return fallback;
}

/* ================= GET ================= */

export async function GET() {
  try {
    const certificates = await getCertificates();
    return NextResponse.json(certificates);
  } catch (err) {
    console.error("CERTIFICATES GET ERROR:", err);
    const errorMessage = getErrorMessage(err, "Failed to load certificates");
    return NextResponse.json(
      { error: "Failed to load certificates", detail: errorMessage },
      { status: 500 }
    );
  }
}

/* ================= POST ================= */

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const cert = normalizeCertificate(body);

    if (!cert.title || !cert.image) {
      return NextResponse.json(
        { error: "Title and image are required" },
        { status: 400 }
      );
    }

    const certificates = await getCertificates();
    certificates.push({ ...cert, createdAt: new Date().toISOString() });
    await saveCertificates(certificates);

    return NextResponse.json({ success: true, certificates });
  } catch (err) {
    console.error("CERTIFICATES POST ERROR:", err);
    const errorMessage = getErrorMessage(err, "Failed to save certificate");
    return NextResponse.json(
      { error: "Failed to save certificate", detail: errorMessage },
      { status: 500 }
    );
  }
}

/* ================= DELETE ================= */

export async function DELETE(req: Request) {
  try {
    const { index } = await req.json();
    const certificates = await getCertificates();

    if (index < 0 || index >= certificates.length) {
      return NextResponse.json({ error: "Invalid index" }, { status: 400 });
    }

    certificates.splice(index, 1);
    await saveCertificates(certificates);

    return NextResponse.json({ success: true, certificates });
  } catch (err) {
    console.error("CERTIFICATES DELETE ERROR:", err);
    const errorMessage = getErrorMessage(err, "Delete failed");
    return NextResponse.json(
      { error: "Delete failed", detail: errorMessage },
      { status: 500 }
    );
  }
}
