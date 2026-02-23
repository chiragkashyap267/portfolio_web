import { NextResponse } from "next/server";
import {
  getWebsites,
  normalizeWebsite,
  saveWebsites,
} from "@/app/lib/websitesStore";

/* ================= GET ================= */
export async function GET() {
  try {
    const websites = await getWebsites();
    return NextResponse.json(websites);
  } catch (err) {
    console.error("WEBSITES GET ERROR:", err);
    const errorMessage =
      err instanceof Error ? err.message : "Failed to load websites";
    return NextResponse.json(
      process.env.NODE_ENV === "development"
        ? { error: "Failed to load websites", detail: errorMessage }
        : { error: "Failed to load websites" },
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
    const errorMessage =
      err instanceof Error ? err.message : "Failed to save website";
    return NextResponse.json(
      process.env.NODE_ENV === "development"
        ? { error: "Failed to save website", detail: errorMessage }
        : { error: "Failed to save website" },
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
    return NextResponse.json(
      { error: "Failed to delete website" },
      { status: 500 }
    );
  }
}
