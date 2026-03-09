import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

/* -----------------------------------------------------------------
   One-time seeder: uploads initial JSON data to Cloudinary so that
   the Vercel deployment can read from it.

   USAGE:  POST https://your-vercel-url/api/seed
            with header  Authorization: Bearer <SEED_SECRET>

   Set SEED_SECRET in your Vercel env vars to any random string
   to protect this endpoint (optional but recommended).
----------------------------------------------------------------- */

const CERTIFICATES = [
    {
        title: "Frontend Web dev Intern @Prodesk IT",
        image:
            "https://res.cloudinary.com/ds6xwzglf/image/upload/v1767031630/portfolio/kzlrqie98n12fcodurt2.jpg",
        link: "https://www.linkedin.com/feed/update/urn:li:activity:7355992814448431104/",
        createdAt: "2025-12-29T18:07:09.436Z",
    },
    {
        title: "Digital Marketing Trivia by VIJESHA IT SERVICES LLP",
        image:
            "https://res.cloudinary.com/ds6xwzglf/image/upload/v1767031726/portfolio/v0cep2fn7emufar4zd2v.jpg",
        link: "https://www.linkedin.com/feed/update/urn:li:activity:7390418638333190144/",
        createdAt: "2025-12-29T18:08:51.845Z",
    },
    {
        title: "5-Day AI Agents Intensive Course with Google",
        image:
            "https://res.cloudinary.com/ds6xwzglf/image/upload/v1767031805/portfolio/lyrhvirnjvfhgt0vid72.png",
        link: "https://www.kaggle.com/certification/badges/chirag267/105",
        createdAt: "2025-12-29T18:10:05.814Z",
    },
];

async function uploadToCloudinary(data: unknown[], publicId: string) {
    const payload = Buffer.from(JSON.stringify(data, null, 2)).toString("base64");
    const jsonDataUri = `data:application/json;base64,${payload}`;

    await cloudinary.uploader.upload(jsonDataUri, {
        resource_type: "raw",
        public_id: publicId,
        overwrite: true,
        invalidate: true,
        format: "json",
    });
}

export async function POST(req: Request) {
    /* ── Optional: protect with a secret ── */
    const seedSecret = process.env.SEED_SECRET;
    if (seedSecret) {
        const auth = req.headers.get("authorization") ?? "";
        const token = auth.replace(/^Bearer\s+/i, "").trim();
        if (token !== seedSecret) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
    }

    /* ── Verify Cloudinary is configured ── */
    const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
        process.env;

    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
        return NextResponse.json(
            { error: "Cloudinary env vars not configured" },
            { status: 500 }
        );
    }

    cloudinary.config({
        cloud_name: CLOUDINARY_CLOUD_NAME,
        api_key: CLOUDINARY_API_KEY,
        api_secret: CLOUDINARY_API_SECRET,
    });

    const results: Record<string, string> = {};

    /* ── Seed certificates ── */
    try {
        const certPublicId =
            process.env.CERTIFICATES_DATA_PUBLIC_ID || "portfolio/certificates-data";
        await uploadToCloudinary(CERTIFICATES, certPublicId);
        results.certificates = `✅ Uploaded ${CERTIFICATES.length} certificate(s) to Cloudinary (${certPublicId})`;
    } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        results.certificates = `❌ Failed: ${msg}`;
    }

    return NextResponse.json({ success: true, results });
}
