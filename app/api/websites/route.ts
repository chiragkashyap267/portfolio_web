import { NextResponse } from "next/server";
import {
  getWebsites,
  normalizeWebsite,
  saveWebsites,
} from "@/app/lib/websitesStore";

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (typeof error === "string" && error.trim()) {
    return error;
  }

  if (error && typeof error === "object") {
    const errObj = error as {
      message?: unknown;
      error?: { message?: unknown };
      http_code?: unknown;
    };

    if (typeof errObj.message === "string" && errObj.message.trim()) {
      return errObj.message;
    }

    if (
      errObj.error &&
      typeof errObj.error.message === "string" &&
      errObj.error.message.trim()
    ) {
      return errObj.error.message;
    }

    if (typeof errObj.http_code === "number") {
      return `${fallback} (HTTP ${errObj.http_code})`;
    }
  }

  return fallback;
}

/* ================= GET ================= */
export async function GET() {
  try {
    const websites = await getWebsites();
    return NextResponse.json(websites);
  } catch (err) {
    console.error("WEBSITES GET ERROR:", err);
    const errorMessage = getErrorMessage(err, "Failed to load websites");
    return NextResponse.json(
      { error: "Failed to load websites", detail: errorMessage },
      { status: 500 }
    );
  }
}

/* ================= POST ================= */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const website = normalizeWebsite(body);

    if (!website.title || !website.platform || !website.url) {
      return NextResponse.json(
        { error: "Title, platform and URL are required" },
        { status: 400 }
      );
    }

    const websites = await getWebsites();
    websites.push({
      ...website,
      createdAt: new Date().toISOString(),
    });
    await saveWebsites(websites);

    return NextResponse.json({ success: true, websites });
  } catch (err) {
    console.error("WEBSITES POST ERROR:", err);
    const errorMessage = getErrorMessage(err, "Failed to save website");
    return NextResponse.json(
      { error: "Failed to save website", detail: errorMessage },
      { status: 500 }
    );
  }
}

/* ================= DELETE ================= */
export async function DELETE(req: Request) {
  try {
    const { index } = await req.json();
    const websites = await getWebsites();

    if (index < 0 || index >= websites.length) {
      return NextResponse.json(
        { error: "Invalid index" },
        { status: 400 }
      );
    }

    websites.splice(index, 1);
    await saveWebsites(websites);

    return NextResponse.json({ success: true, websites });
  } catch (err) {
    console.error("WEBSITES DELETE ERROR:", err);
    const errorMessage = getErrorMessage(err, "Failed to delete website");
    return NextResponse.json(
      { error: "Failed to delete website", detail: errorMessage },
      { status: 500 }
    );
  }
}
