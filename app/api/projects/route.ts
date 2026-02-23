import { NextResponse } from "next/server";
import { getProjects, normalizeProject, saveProjects } from "@/app/lib/projectStore";

/* ================= GET ================= */
export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json(projects);
  } catch (err) {
    console.error("PROJECT GET ERROR:", err);
    const errorMessage =
      err instanceof Error ? err.message : "Failed to load projects";
    return NextResponse.json(
      process.env.NODE_ENV === "development"
        ? { error: "Failed to load projects", detail: errorMessage }
        : { error: "Failed to load projects" },
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
    const errorMessage =
      err instanceof Error ? err.message : "Failed to save project";
    return NextResponse.json(
      process.env.NODE_ENV === "development"
        ? { error: "Failed to save project", detail: errorMessage }
        : { error: "Failed to save project" },
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
    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}
