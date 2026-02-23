import fs from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

export type Website = {
  title: string;
  description: string;
  platform: string;
  category?: string;
  image?: string;
  url: string;
  createdAt?: string;
};

type RawWebsite = Partial<Website> & {
  [key: string]: unknown;
};

const localFilePath = path.join(process.cwd(), "data", "websites.json");
const cloudinaryPublicId =
  process.env.WEBSITES_DATA_PUBLIC_ID || "portfolio/websites-data";

const cloudinaryReady =
  !!process.env.CLOUDINARY_CLOUD_NAME &&
  !!process.env.CLOUDINARY_API_KEY &&
  !!process.env.CLOUDINARY_API_SECRET;
const isProduction = process.env.NODE_ENV === "production";
const useCloudinaryStore = isProduction && cloudinaryReady;

if (useCloudinaryStore) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
  });
}

function normalizeWebsite(raw: RawWebsite): Website {
  return {
    title: String(raw?.title || "").trim(),
    description: String(raw?.description || "").trim(),
    platform: String(raw?.platform || "").trim(),
    category: raw?.category ? String(raw.category).trim() : undefined,
    image: raw?.image ? String(raw.image).trim() : undefined,
    url: String(raw?.url || "").trim(),
    createdAt: raw?.createdAt ? String(raw.createdAt) : undefined,
  };
}

function readLocalFile(): Website[] {
  if (!fs.existsSync(localFilePath)) {
    fs.writeFileSync(localFilePath, JSON.stringify([], null, 2));
  }

  const raw = fs.readFileSync(localFilePath, "utf-8");
  const data = raw ? JSON.parse(raw) : [];
  return Array.isArray(data)
    ? data.map((item) => normalizeWebsite(item as RawWebsite))
    : [];
}

function writeLocalFile(data: Website[]) {
  fs.writeFileSync(localFilePath, JSON.stringify(data, null, 2));
}

async function getCloudinaryResourceUrl(): Promise<string | null> {
  const idsToTry = [cloudinaryPublicId, `${cloudinaryPublicId}.json`];

  for (const id of idsToTry) {
    try {
      const resource = await cloudinary.api.resource(id, {
        resource_type: "raw",
      });
      return resource.secure_url;
    } catch (error: unknown) {
      const cloudError = error as { http_code?: number };
      if (cloudError?.http_code !== 404) {
        throw error;
      }
    }
  }

  return null;
}

async function readFromCloudinary(): Promise<Website[]> {
  try {
    const resourceUrl = await getCloudinaryResourceUrl();
    if (!resourceUrl) return [];

    const response = await fetch(resourceUrl, { cache: "no-store" });
    if (!response.ok) return [];

    const data = await response.json();
    return Array.isArray(data)
      ? data.map((item) => normalizeWebsite(item as RawWebsite))
      : [];
  } catch (error: unknown) {
    const cloudError = error as { http_code?: number };
    if (cloudError?.http_code === 404) return [];
    throw error;
  }
}

async function writeToCloudinary(data: Website[]): Promise<void> {
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

export async function getWebsites(): Promise<Website[]> {
  if (isProduction && !cloudinaryReady) {
    throw new Error(
      "Cloudinary environment variables are required in production for website persistence."
    );
  }

  if (useCloudinaryStore) {
    return readFromCloudinary();
  }

  return readLocalFile();
}

export async function saveWebsites(data: Website[]): Promise<void> {
  const normalized = data.map((item) => normalizeWebsite(item));

  if (isProduction && !cloudinaryReady) {
    throw new Error(
      "Cloudinary environment variables are required in production for website persistence."
    );
  }

  if (useCloudinaryStore) {
    await writeToCloudinary(normalized);
    return;
  }

  writeLocalFile(normalized);
}

export { normalizeWebsite };
