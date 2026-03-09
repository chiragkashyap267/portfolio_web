import fs from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

/* ================= TYPES ================= */

type Certificate = {
    title: string;
    image: string;
    link?: string;
    createdAt?: string;
};

type RawCertificate = Partial<Certificate> & { [key: string]: unknown };

/* ================= CONFIG ================= */

const localFilePath = path.join(process.cwd(), "data", "certificates.json");
const cloudinaryPublicId =
    process.env.CERTIFICATES_DATA_PUBLIC_ID || "portfolio/certificates-data";

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

/* ================= NORMALIZE ================= */

export function normalizeCertificate(raw: RawCertificate): Certificate {
    return {
        title: String(raw?.title || "").trim(),
        image: String(raw?.image || "").trim(),
        link: raw?.link ? String(raw.link).trim() : undefined,
        createdAt: raw?.createdAt ? String(raw.createdAt) : undefined,
    };
}

/* ================= LOCAL FILE ================= */

function readLocalFile(): Certificate[] {
    if (!fs.existsSync(localFilePath)) {
        if (isProduction) return [];
        fs.writeFileSync(localFilePath, JSON.stringify([], null, 2));
    }
    try {
        const raw = fs.readFileSync(localFilePath, "utf-8");
        const data = raw ? JSON.parse(raw) : [];
        return Array.isArray(data) ? data.map(normalizeCertificate) : [];
    } catch {
        return [];
    }
}

function writeLocalFile(data: Certificate[]) {
    fs.writeFileSync(localFilePath, JSON.stringify(data, null, 2));
}

/* ================= CLOUDINARY ================= */

async function getCloudinaryResourceUrl(): Promise<string | null> {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    if (!cloudName) return null;
    const encodedId = cloudinaryPublicId
        .split("/")
        .map((part) => encodeURIComponent(part))
        .join("/");
    return `https://res.cloudinary.com/${cloudName}/raw/upload/${encodedId}.json`;
}

async function readFromCloudinary(): Promise<Certificate[]> {
    try {
        const resourceUrl = await getCloudinaryResourceUrl();
        if (!resourceUrl) return [];

        const response = await fetch(`${resourceUrl}?t=${Date.now()}`, {
            cache: "no-store",
        });
        if (!response.ok) return [];

        const data = await response.json();
        return Array.isArray(data)
            ? data.map((item) => normalizeCertificate(item as RawCertificate))
            : [];
    } catch (error: unknown) {
        throw error;
    }
}

async function writeToCloudinary(data: Certificate[]): Promise<void> {
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

/* ================= PUBLIC API ================= */

export async function getCertificates(): Promise<Certificate[]> {
    if (useCloudinaryStore) return readFromCloudinary();
    return readLocalFile();
}

export async function saveCertificates(data: Certificate[]): Promise<void> {
    const normalized = data.map(normalizeCertificate);

    if (isProduction && !cloudinaryReady) {
        throw new Error(
            "Cloudinary environment variables are required in production to save certificates."
        );
    }

    if (useCloudinaryStore) {
        await writeToCloudinary(normalized);
        return;
    }

    writeLocalFile(normalized);
}
