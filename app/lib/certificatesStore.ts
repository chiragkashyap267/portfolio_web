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

if (cloudinaryReady) {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
        api_key: process.env.CLOUDINARY_API_KEY!,
        api_secret: process.env.CLOUDINARY_API_SECRET!,
    });
}

/* ================= SEED DATA ================= */
// This is the initial dataset. When Cloudinary has no file yet, we auto-seed
// and save. After that, all adds/deletes via admin persist to Cloudinary.
const SEED_CERTIFICATES: Certificate[] = [
    {
        title: "Frontend Web dev Intern @Prodesk IT",
        image: "https://res.cloudinary.com/ds6xwzglf/image/upload/v1767031630/portfolio/kzlrqie98n12fcodurt2.jpg",
        link: "https://www.linkedin.com/feed/update/urn:li:activity:7355992814448431104/",
        createdAt: "2025-12-29T18:07:09.436Z",
    },
    {
        title: "Digital Marketing Trivia by VIJESHA IT SERVICES LLP",
        image: "https://res.cloudinary.com/ds6xwzglf/image/upload/v1767031726/portfolio/v0cep2fn7emufar4zd2v.jpg",
        link: "https://www.linkedin.com/feed/update/urn:li:activity:7390418638333190144/",
        createdAt: "2025-12-29T18:08:51.845Z",
    },
    {
        title: "5-Day AI Agents Intensive Course with Google",
        image: "https://res.cloudinary.com/ds6xwzglf/image/upload/v1767031805/portfolio/lyrhvirnjvfhgt0vid72.png",
        link: "https://www.kaggle.com/certification/badges/chirag267/105",
        createdAt: "2025-12-29T18:10:05.814Z",
    },
];

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
        if (isProduction) return SEED_CERTIFICATES;
        fs.writeFileSync(localFilePath, JSON.stringify(SEED_CERTIFICATES, null, 2));
        return SEED_CERTIFICATES;
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
        if (!resourceUrl) return SEED_CERTIFICATES;

        const response = await fetch(`${resourceUrl}?t=${Date.now()}`, {
            cache: "no-store",
        });

        // File doesn't exist on Cloudinary yet — auto-seed it now
        if (!response.ok) {
            console.log("[certificates] Cloudinary file missing — auto-seeding...");
            await writeToCloudinary(SEED_CERTIFICATES);
            return SEED_CERTIFICATES;
        }

        const data = await response.json();
        return Array.isArray(data)
            ? data.map((item) => normalizeCertificate(item as RawCertificate))
            : [];
    } catch (err) {
        console.error("[certificates] readFromCloudinary error:", err);
        return SEED_CERTIFICATES;
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
