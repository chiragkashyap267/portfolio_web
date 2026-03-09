import { NextResponse } from "next/server";
import { getProjects, normalizeProject, saveProjects } from "@/app/lib/projectStore";

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
    const projects = await getProjects();
    return NextResponse.json(projects);
  } catch (err) {
    console.error("PROJECT GET ERROR:", err);
    const errorMessage = getErrorMessage(err, "Failed to load projects");
    return NextResponse.json(
      { error: "Failed to load projects", detail: errorMessage },
      { status: 500 }
    );
  }
}

/* ================= PATCH — reorder ================= */
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    if (!Array.isArray(body?.items)) {
      return NextResponse.json({ error: "items array required" }, { status: 400 });
    }
    const reordered = body.items.map(normalizeProject);
    await saveProjects(reordered);
    return NextResponse.json({ success: true, projects: reordered });
  } catch (err) {
    console.error("PROJECT PATCH ERROR:", err);
    const errorMessage = getErrorMessage(err, "Failed to reorder projects");
    return NextResponse.json(
      { error: "Failed to reorder projects", detail: errorMessage },
      { status: 500 }
    );
  }
}

/* ================= POST ================= */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const project = normalizeProject(body);

    if (!project.title || !project.image) {
      return NextResponse.json(
        { error: "Invalid payload" },
        { status: 400 }
      );
    }

    const projects = await getProjects();
    projects.push({
      ...project,
      createdAt: new Date().toISOString(),
    });
    await saveProjects(projects);

    return NextResponse.json({ success: true, projects });
  } catch (err) {
    console.error("PROJECT POST ERROR:", err);
    const errorMessage = getErrorMessage(err, "Failed to save project");
    return NextResponse.json(
      { error: "Failed to save project", detail: errorMessage },
      { status: 500 }
    );
  }
}

/* ================= DELETE ================= */
export async function DELETE(req: Request) {
  try {
    const { index } = await req.json();
    const projects = await getProjects();

    if (index < 0 || index >= projects.length) {
      return NextResponse.json(
        { error: "Invalid index" },
        { status: 400 }
      );
    }

    projects.splice(index, 1);
    await saveProjects(projects);

    return NextResponse.json({ success: true, projects });
  } catch (err) {
    console.error("PROJECT DELETE ERROR:", err);
    const errorMessage = getErrorMessage(err, "Delete failed");
    return NextResponse.json(
      { error: "Delete failed", detail: errorMessage },
      { status: 500 }
    );
  }
}
