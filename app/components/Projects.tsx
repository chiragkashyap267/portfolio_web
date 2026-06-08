"use client";

import {
  Box,
  Typography,
  Grid,
  Chip,
  Link as MuiLink,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { useEffect, useState } from "react";

/* ================= TYPES ================= */

type Project = {
  title: string;
  description: string;
  tech: string[];
  image?: string;
  live?: string;
  github?: string;
};

/* ================= COMPONENT ================= */

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/projects", { cache: "no-store" });
        if (!res.ok) {
          const errorMessage = await parseApiError(res, "Failed to load projects");
          throw new Error(errorMessage);
        }
        const data = await res.json();
        const normalized = Array.isArray(data) ? data.map(normalizeProject) : [];
        setProjects(normalized);
      } catch (err) {
        console.error("Projects fetch error:", err);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // First 3 are flagship, rest are standard
  const flagship = projects.slice(0, 3);
  const rest = projects.slice(3);

  return (
    <Box id="projects" py={12} px={{ xs: 2, md: 4 }}>
      {/* Section heading */}
      <Box textAlign="center" mb={8}>
        <Typography
          variant="h2"
          fontWeight={800}
          letterSpacing="-0.025em"
          mb={1.5}
          className="section-heading-gradient"
          sx={{ fontSize: { xs: "1.8rem", md: "2.8rem" } }}
        >
          Projects
        </Typography>
        <Typography
          sx={{ color: "rgba(255,255,255,0.4)", fontWeight: 300, fontSize: "0.95rem", letterSpacing: "0.04em", textTransform: "uppercase" }}
        >
          Handcrafted with passion &amp; precision
        </Typography>
      </Box>

      {loading && (
        <Typography sx={{ color: "rgba(255,255,255,0.35)", fontWeight: 300, textAlign: "center" }}>
          Loading projects...
        </Typography>
      )}

      {!loading && projects.length === 0 && (
        <Typography sx={{ color: "rgba(255,255,255,0.35)", fontWeight: 300, textAlign: "center" }}>
          No projects added yet.
        </Typography>
      )}

      {/* ── Flagship row ── */}
      {flagship.length > 0 && (
        <>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 4, maxWidth: 1440, mx: "auto" }}>
            <Box sx={{ width: 5, height: 5, borderRadius: "50%", background: "#00C896", boxShadow: "0 0 8px #00C896" }} />
            <Typography sx={{ fontSize: "0.72rem", fontWeight: 700, color: "#00C896", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Featured Projects
            </Typography>
          </Box>

          <Grid container spacing={3} justifyContent="center" sx={{ maxWidth: 1440, mx: "auto", mb: 6 }}>
            {flagship.map((project, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, lg: 4 }} sx={{ display: "flex" }}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -8 }}
                  style={{ height: "100%", width: "100%" }}
                >
                  <ProjectCard project={project} featured />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {/* ── Rest of projects ── */}
      {rest.length > 0 && (
        <>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 4, maxWidth: 1440, mx: "auto" }}>
            <Box sx={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(0,200,150,0.5)" }} />
            <Typography sx={{ fontSize: "0.72rem", fontWeight: 700, color: "rgba(0,200,150,0.6)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              More Projects
            </Typography>
          </Box>

          <Grid container spacing={3} justifyContent="center" sx={{ maxWidth: 1440, mx: "auto" }}>
            {rest.map((project, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }} sx={{ display: "flex" }}>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.45, delay: index * 0.07, ease: "easeOut" }}
                  whileHover={{ y: -6 }}
                  style={{ height: "100%", width: "100%", maxWidth: 360, marginInline: "auto" }}
                >
                  <ProjectCard project={project} featured={false} />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
}

/* ================= PROJECT CARD ================= */

function ProjectCard({ project, featured }: { project: Project; featured: boolean }) {
  const techItems = project.tech.slice(0, featured ? 5 : 4);

  return (
    <Box
      className={featured ? "project-card-featured" : "glass-card"}
      sx={{
        position: "relative",
        height: "100%",
        minHeight: featured ? { xs: 460, md: 480 } : { xs: 420, sm: 440 },
        width: "100%",
        borderRadius: 4,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        "&:hover img": { transform: "scale(1.06)" },
      }}
    >
      {/* Featured badge */}
      {featured && (
        <Box
          sx={{
            position: "absolute",
            top: 14,
            right: 14,
            zIndex: 5,
            px: 1.2,
            py: 0.35,
            borderRadius: 99,
            background: "rgba(0,200,150,0.15)",
            border: "1px solid rgba(0,200,150,0.35)",
            backdropFilter: "blur(8px)",
          }}
        >
          <Typography sx={{ fontSize: "0.6rem", fontWeight: 800, color: "#00C896", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            ✦ Featured
          </Typography>
        </Box>
      )}

      {/* Image */}
      {project.image ? (
        <Box sx={{ position: "relative", height: featured ? 220 : 178, overflow: "hidden", flexShrink: 0 }}>
          <Box
            component="img"
            src={project.image}
            alt={project.title}
            loading="lazy"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transition: "transform 0.42s cubic-bezier(0.23,1,0.32,1)",
            }}
          />
          {/* Gradient overlay */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 60,
              background: "linear-gradient(to top, rgba(4,10,8,0.9), transparent)",
            }}
          />
        </Box>
      ) : (
        <Box
          sx={{
            height: featured ? 220 : 178,
            flexShrink: 0,
            background: "radial-gradient(ellipse at 30% 40%, rgba(0,200,150,0.28), transparent 60%), linear-gradient(135deg, #0a1a14, #060f0a)",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "rgba(0,200,150,0.12)",
              border: "1px solid rgba(0,200,150,0.25)",
              display: "grid",
              placeItems: "center",
              fontSize: 22,
              color: "#00C896",
            }}
          >
            ✦
          </Box>
        </Box>
      )}

      {/* Content */}
      <Box p={featured ? 3 : 2} sx={{ display: "flex", flexDirection: "column", flex: 1, gap: 1.2 }}>
        <Typography
          variant={featured ? "h6" : "subtitle1"}
          fontWeight={700}
          sx={{
            fontSize: featured ? "1.05rem" : "0.97rem",
            lineHeight: 1.25,
            wordBreak: "break-word",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            color: "#fff",
            minHeight: "2.5em",
          }}
        >
          {project.title}
        </Typography>

        <Typography
          sx={{
            color: "#a0a0a0",
            fontSize: featured ? "0.88rem" : "0.84rem",
            lineHeight: 1.55,
            display: "-webkit-box",
            WebkitLineClamp: featured ? 3 : 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: featured ? "4.2em" : "3em",
          }}
        >
          {project.description}
        </Typography>

        {/* Tech chips */}
        <Stack direction="row" flexWrap="wrap" gap={0.7} sx={{ minHeight: 50, alignContent: "flex-start", overflow: "hidden" }}>
          {techItems.map((t, i) => (
            <Chip
              key={`${t}-${i}`}
              label={t}
              size="small"
              sx={{
                borderRadius: 99,
                border: "1px solid rgba(0,200,150,0.28)",
                color: "rgba(0,200,150,0.9)",
                backgroundColor: "rgba(0,200,150,0.07)",
                height: 22,
                fontWeight: 600,
                fontSize: "0.68rem",
                letterSpacing: "0.03em",
                "& .MuiChip-label": { px: 1 },
                "&:hover": { background: "rgba(0,200,150,0.14)", borderColor: "rgba(0,200,150,0.45)" },
              }}
            />
          ))}
        </Stack>

        {/* Links */}
        <Box sx={{ mt: "auto", pt: 1, display: "flex", gap: 2, alignItems: "center" }}>
          {project.live && (
            <MuiLink
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.8,
                px: featured ? 2 : 1.5,
                py: featured ? 0.9 : 0.7,
                borderRadius: 99,
                background: "linear-gradient(135deg, #00C896, #00E5B0)",
                color: "#040a08",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: 0.3,
                boxShadow: "0 6px 18px rgba(0,200,150,0.28)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "translateY(-1px)",
                  boxShadow: "0 10px 24px rgba(0,200,150,0.42)",
                },
              }}
            >
              <FaExternalLinkAlt size={11} />
              Live
            </MuiLink>
          )}

          {project.github && (
            <MuiLink
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.8,
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.82rem",
                fontWeight: 600,
                transition: "color 0.2s ease",
                "&:hover": { color: "#00C896" },
              }}
            >
              <FaGithub size={15} />
              Code
            </MuiLink>
          )}
        </Box>
      </Box>
    </Box>
  );
}

function normalizeTech(tech: unknown): string[] {
  if (!tech) return [];
  if (Array.isArray(tech)) {
    return tech
      .flatMap((item) => String(item).split(/[,\n|]/).map((part) => part.trim()))
      .filter(Boolean)
      .slice(0, 12);
  }
  return String(tech).split(/[,\n|]/).map((item) => item.trim()).filter(Boolean).slice(0, 12);
}

type RawProject = Partial<Project> & { [key: string]: unknown };

function normalizeProject(project: RawProject): Project {
  return {
    title: String(project?.title || "").trim(),
    description: String(project?.description || "").trim(),
    tech: normalizeTech(project?.tech),
    image: project?.image ? String(project.image).trim() : undefined,
    live: project?.live ? String(project.live).trim() : undefined,
    github: project?.github ? String(project.github).trim() : undefined,
  };
}

async function parseApiError(res: Response, fallback: string) {
  try {
    const payload = await res.json();
    if (typeof payload?.detail === "string" && payload.detail.trim()) return payload.detail;
    if (typeof payload?.error === "string" && payload.error.trim()) return payload.error;
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
