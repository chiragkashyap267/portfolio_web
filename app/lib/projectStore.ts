import fs from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

type Project = {
  title: string;
  description: string;
  tech: string[];
  image?: string;
  github?: string;
  live?: string;
  createdAt?: string;
};

type RawProject = Partial<Project> & {
  [key: string]: unknown;
};

const localFilePath = path.join(process.cwd(), "data", "projects.json");
const cloudinaryPublicId =
  process.env.PROJECTS_DATA_PUBLIC_ID || "portfolio/projects-data";

const cloudinaryReady =
  !!process.env.CLOUDINARY_CLOUD_NAME &&
  !!process.env.CLOUDINARY_API_KEY &&
  !!process.env.CLOUDINARY_API_SECRET;
const isProduction = process.env.NODE_ENV === "production";
const useCloudinaryStore =
  isProduction && cloudinaryReady;

if (useCloudinaryStore) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
  });
}

function normalizeTech(tech: unknown): string[] {
  if (!tech) return [];

  if (Array.isArray(tech)) {
    return tech
      .flatMap((item) =>
        String(item)
          .split(/[,\n|]/)
          .map((part) => part.trim())
      )
      .filter(Boolean)
      .slice(0, 12);
  }

  return String(tech)
    .split(/[,\n|]/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 12);
}

function normalizeProject(raw: RawProject): Project {
  return {
    title: String(raw?.title || "").trim(),
    description: String(raw?.description || "").trim(),
    tech: normalizeTech(raw?.tech),
    image: raw?.image ? String(raw.image).trim() : undefined,
    github: raw?.github ? String(raw.github).trim() : undefined,
    live: raw?.live ? String(raw.live).trim() : undefined,
    createdAt: raw?.createdAt ? String(raw.createdAt) : undefined,
  };
}

function readLocalFile(): Project[] {
  if (!fs.existsSync(localFilePath)) {
    if (isProduction) {
      return [];
    }
    fs.writeFileSync(localFilePath, JSON.stringify([], null, 2));
  }

  try {
    const raw = fs.readFileSync(localFilePath, "utf-8");
    const data = raw ? JSON.parse(raw) : [];
    return Array.isArray(data) ? data.map(normalizeProject) : [];
  } catch {
    return [];
  }
}

function writeLocalFile(data: Project[]) {
  fs.writeFileSync(localFilePath, JSON.stringify(data, null, 2));
}

async function getCloudinaryResourceUrl(): Promise<string | null> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  if (!cloudName) return null;

  const encodedId = cloudinaryPublicId
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");

  return `https://res.cloudinary.com/${cloudName}/raw/upload/${encodedId}.json`;
}

async function readFromCloudinary(): Promise<Project[]> {
  try {
    const resourceUrl = await getCloudinaryResourceUrl();
    if (!resourceUrl) {
      return [];
    }

    const response = await fetch(`${resourceUrl}?t=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) {
      if (response.status === 404) {
        return [];
      }
      return [];
    }

    const data = await response.json();
    return Array.isArray(data)
      ? data.map((item) => normalizeProject(item as RawProject))
      : [];
  } catch (error: unknown) {
    throw error;
  }
}

async function writeToCloudinary(data: Project[]): Promise<void> {
  const payload = Buffer.from(JSON.stringify(data, null, 2)).toString("base64");
  const jsonDataUri = `data:application/json;base64,${payload}`;

  await cloudinary.uploader.upload(jsonDataUri, {
    resource_type: "raw",
    public_id: cloudinaryPublicId,
    overwrite: true,
    invalidate: true,
    format: "json",
  });
}

export async function getProjects(): Promise<Project[]> {
  if (useCloudinaryStore) {
    return readFromCloudinary();
  }

  return readLocalFile();
}

export async function saveProjects(data: Project[]): Promise<void> {
  const normalized = data.map((item) => normalizeProject(item));

  if (isProduction && !cloudinaryReady) {
    throw new Error(
      "Cloudinary environment variables are required in Vercel production to add/update projects. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET."
    );
  }

  if (useCloudinaryStore) {
    await writeToCloudinary(normalized);
    return;
  }

  writeLocalFile(normalized);
}

export { normalizeProject };
