"use client";

import {
  Box,
  Chip,
  Grid,
  Link as MuiLink,
  Stack,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useEffect, useMemo, useState } from "react";
import MagneticCard from "./MagneticCard";

type Website = {
  title: string;
  description: string;
  platform: string;
  category?: string;
  image?: string;
  url: string;
};

export default function Websites() {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/websites", { cache: "no-store" });
        if (!res.ok) {
          const errorMessage = await parseApiError(
            res,
            "Failed to load websites"
          );
          throw new Error(errorMessage);
        }

        const data = await res.json();
        const normalized = Array.isArray(data) ? data.map(normalizeWebsite) : [];
        setWebsites(normalized);
      } catch (err) {
        console.error("Websites fetch error:", err);
        setWebsites([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const visibleWebsites = useMemo(() => websites, [websites]);

  return (
    <Box id="websites" py={12} px={{ xs: 2, md: 4 }}>
      <Box textAlign="center" mb={8}>
        {/* Badge */}
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            px: 2.5,
            py: 0.9,
            borderRadius: 99,
            background: "rgba(0,200,150,0.1)",
            border: "1px solid rgba(0,200,150,0.28)",
            mb: 2.5,
          }}
        >
          <Box sx={{ width: 7, height: 7, borderRadius: "50%", background: "#00C896", boxShadow: "0 0 8px #00C896" }} />
          <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: "#00C896", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            20+ Live Professional Websites Built &amp; Launched
          </Typography>
        </Box>

        <Typography
          variant="h2"
          fontWeight={800}
          letterSpacing="-0.025em"
          mb={1.5}
          className="section-heading-gradient"
          sx={{ fontSize: { xs: "1.8rem", md: "2.8rem" } }}
        >
          Live Websites
        </Typography>

        <Typography
          sx={{
            color: "rgba(255,255,255,0.4)",
            fontWeight: 300,
            maxWidth: 680,
            mx: "auto",
            fontSize: "1rem",
            lineHeight: 1.7,
          }}
        >
          Professional WordPress sites &amp; Shopify e-commerce stores —
          designed, built, and launched in production.
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {loading && <Typography color="gray">Loading websites...</Typography>}

        {!loading && visibleWebsites.length === 0 && (
          <Typography color="gray">No website links added yet.</Typography>
        )}

        {visibleWebsites.map((website, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 4 }} sx={{ display: "flex" }}>
            <MagneticCard>
              <WebsiteCard website={website} index={index} />
            </MagneticCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

function WebsiteCard({ website, index }: { website: Website; index: number }) {
  const platformStyles = getPlatformStyle(website.platform);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
      whileHover={{ y: -8 }}
      style={{ width: "100%", height: "100%" }}
    >
      <Box
        className="glass-card"
        sx={{
          width: "100%",
          minHeight: { xs: 460, md: 480 },
          borderRadius: 4,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.32s cubic-bezier(0.23,1,0.32,1)",
          "&:hover .website-image": { transform: "scale(1.06)" },
          "&:hover": {
            boxShadow: "0 24px 64px rgba(0,200,150,0.2), 0 4px 16px rgba(0,0,0,0.5)",
          },
        }}
      >
        {website.image ? (
          <Box sx={{ position: "relative", height: 230, overflow: "hidden" }}>
            <Box
              className="website-image"
              component="img"
              src={website.image}
              alt={website.title}
              loading="lazy"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                transition: "transform 0.38s cubic-bezier(0.23,1,0.32,1)",
              }}
            />
            {/* Overlay gradient */}
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 80,
                background: "linear-gradient(to top, rgba(6,6,6,0.85), transparent)",
              }}
            />
          </Box>
        ) : (
          <Box
            sx={{
              height: 230,
              background:
                "radial-gradient(ellipse at 25% 30%, rgba(0,200,150,0.3), transparent 55%), radial-gradient(ellipse at 75% 70%, rgba(0,229,176,0.12), transparent 55%), linear-gradient(135deg, #1c1c1c, #090909)",
              display: "grid",
              placeItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.01em", color: "rgba(255,255,255,0.7)" }}>
              {website.platform || "Live Site"}
            </Typography>
          </Box>
        )}

        <Box p={3} sx={{ display: "flex", flexDirection: "column", flex: 1, gap: 1.2 }}>
          <Stack direction="row" spacing={1} flexWrap="wrap" rowGap={1}>
            <Chip
              label={website.platform}
              size="small"
              sx={{
                background: platformStyles.bg,
                color: platformStyles.color,
                border: platformStyles.border,
                fontWeight: 700,
              }}
            />
            {website.category ? (
              <Chip
                label={website.category}
                size="small"
                variant="outlined"
                sx={{
                  borderColor: "rgba(255,255,255,0.24)",
                  color: "rgba(255,255,255,0.82)",
                }}
              />
            ) : null}
          </Stack>

          <Typography
            variant="h6"
            sx={{
              color: "#fff",
              fontWeight: 700,
              lineHeight: 1.25,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              minHeight: "2.5em",
            }}
          >
            {website.title}
          </Typography>

          <Typography
            sx={{
              color: "#b9b9b9",
              fontSize: "0.94rem",
              lineHeight: 1.5,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              minHeight: "4.3em",
            }}
          >
            {website.description || "Production website with clean UX, responsive layout, and conversion-focused flow."}
          </Typography>

          <Box sx={{ mt: "auto", pt: 1.4 }}>
            <MuiLink
              href={ensureHttps(website.url)}
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.9,
                px: 2.1,
                py: 1.15,
                borderRadius: 99,
                color: "#fff",
                background: "linear-gradient(135deg, #00C896, #00E5B0)",
                fontWeight: 700,
                letterSpacing: 0.2,
                boxShadow: "0 8px 20px rgba(0, 200, 150, 0.28)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "translateY(-1px)",
                  boxShadow: "0 11px 24px rgba(0, 200, 150, 0.42)",
                },
              }}
            >
              Visit Live Website <FaExternalLinkAlt />
            </MuiLink>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}

function getPlatformStyle(platformRaw: string) {
  const platform = platformRaw.toLowerCase();

  if (platform.includes("wordpress")) {
    return {
      bg: "rgba(33, 117, 155, 0.18)",
      color: "#77D1FF",
      border: "1px solid rgba(119, 209, 255, 0.45)",
    };
  }

  if (platform.includes("shopify")) {
    return {
      bg: "rgba(149, 191, 71, 0.18)",
      color: "#C6F77D",
      border: "1px solid rgba(198, 247, 125, 0.45)",
    };
  }

  return {
    bg: "rgba(0, 200, 150, 0.16)",
    color: "#00C896",
    border: "1px solid rgba(0, 200, 150, 0.45)",
  };
}

function ensureHttps(url: string): string {
  if (!url) return url;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `https://${url}`;
}

type RawWebsite = Partial<Website> & { [key: string]: unknown };

function normalizeWebsite(raw: RawWebsite): Website {
  return {
    title: String(raw?.title || "").trim(),
    description: String(raw?.description || "").trim(),
    platform: String(raw?.platform || "").trim(),
    category: raw?.category ? String(raw.category).trim() : undefined,
    image: raw?.image ? String(raw.image).trim() : undefined,
    url: String(raw?.url || "").trim(),
  };
}

async function parseApiError(res: Response, fallback: string) {
  try {
    const payload = await res.json();
    if (typeof payload?.detail === "string" && payload.detail.trim()) {
      return payload.detail;
    }
    if (typeof payload?.error === "string" && payload.error.trim()) {
      return payload.error;
    }
  } catch {
    try {
      const text = await res.text();
      if (text.trim()) return text;
    } catch {
      return fallback;
    }
  }

  return fallback;
}
