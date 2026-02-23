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
        if (!res.ok) throw new Error("Failed to load websites");

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
    <Box id="websites" py={10} px={{ xs: 2, md: 4 }}>
      <Typography variant="h4" textAlign="center" mb={1.2} fontWeight={700}>
        Live Websites
      </Typography>

      <Typography
        textAlign="center"
        color="#aaa"
        mb={6}
        sx={{ maxWidth: 760, mx: "auto" }}
      >
        WordPress and Shopify stores I designed, built, and launched in production.
      </Typography>

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
        sx={{
          width: "100%",
          minHeight: { xs: 450, md: 470 },
          borderRadius: 4,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          border: "1px solid rgba(255,212,0,0.28)",
          background:
            "linear-gradient(165deg, rgba(15,15,15,0.97), rgba(8,8,8,0.98))",
          boxShadow:
            "0 12px 34px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04)",
          transition: "all 0.35s ease",
          "&:hover": {
            borderColor: "rgba(255,212,0,0.58)",
            boxShadow:
              "0 20px 42px rgba(0,0,0,0.55), 0 0 28px rgba(255,212,0,0.18)",
          },
          "&:hover .website-image": {
            transform: "scale(1.06)",
          },
        }}
      >
        {website.image ? (
          <Box
            className="website-image"
            component="img"
            src={website.image}
            alt={website.title}
            loading="lazy"
            sx={{
              width: "100%",
              height: 220,
              objectFit: "cover",
              transition: "transform 0.35s ease",
            }}
          />
        ) : (
          <Box
            sx={{
              height: 220,
              background:
                "radial-gradient(circle at 20% 20%, rgba(255,212,0,0.25), transparent 55%), linear-gradient(120deg, #1f1f1f, #090909)",
              display: "grid",
              placeItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: 700, letterSpacing: 0.5, color: "#f8f8f8" }}>
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
              href={website.url}
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
                color: "#111",
                background: "linear-gradient(135deg, #FFD400, #FFE468)",
                fontWeight: 700,
                letterSpacing: 0.2,
                boxShadow: "0 8px 20px rgba(255, 212, 0, 0.28)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "translateY(-1px)",
                  boxShadow: "0 11px 24px rgba(255, 212, 0, 0.36)",
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
    bg: "rgba(255, 212, 0, 0.16)",
    color: "#FFD400",
    border: "1px solid rgba(255, 212, 0, 0.45)",
  };
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
