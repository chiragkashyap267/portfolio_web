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
  const visibleProjects = projects;

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/projects", {
          cache: "no-store",
        });

        if (!res.ok) {
          const errorMessage = await parseApiError(
            res,
            "Failed to load projects"
          );
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

      <Grid container spacing={3} justifyContent="center" sx={{ maxWidth: 1440, mx: "auto" }}>
        {loading && (
          <Typography sx={{ color: "rgba(255,255,255,0.35)", fontWeight: 300 }}>Loading projects...</Typography>
        )}

        {!loading && visibleProjects.length === 0 && (
          <Typography sx={{ color: "rgba(255,255,255,0.35)", fontWeight: 300 }}>No projects added yet.</Typography>
        )}

        {visibleProjects.map((project, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }} sx={{ display: "flex" }}>
            <ProjectCard project={project} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

/* ================= PROJECT CARD ================= */

function ProjectCard({ project }: { project: Project }) {
  const techItems = project.tech.slice(0, 4);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      style={{ height: "100%", width: "100%", maxWidth: 360, marginInline: "auto" }}
    >
      <Box
        className="glass-card"
        sx={{
          position: "relative",
          height: { xs: 440, sm: 460 },
          width: "100%",
          borderRadius: 4,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          "&:hover img": { transform: "scale(1.05)" },
          "&:hover": {
            boxShadow: "0 20px 56px rgba(255,107,0,0.18), 0 4px 16px rgba(0,0,0,0.5)",
          },
        }}
      >
        {project.image && (
          <Box
            component="img"
            src={project.image}
            alt={project.title}
            loading="lazy"
            sx={{
              width: "100%",
              height: 178,
              objectFit: "cover",
              display: "block",
              transition: "transform 0.38s cubic-bezier(0.23,1,0.32,1)",
            }}
          />
        )}

        {!project.image && (
          <Box
            sx={{
              height: 178,
              background:
                "radial-gradient(ellipse at 25% 30%, rgba(255,107,0,0.3), transparent 55%), radial-gradient(ellipse at 75% 70%, rgba(255,174,115,0.12), transparent 55%), linear-gradient(135deg, #1c1c1c, #090909)",
              display: "grid",
              placeItems: "center",
            }}
          >
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                background: "rgba(255,107,0,0.15)",
                border: "1px solid rgba(255,107,0,0.3)",
                display: "grid",
                placeItems: "center",
                fontSize: 18,
                color: "#FF6B00",
              }}
            >
              ✦
            </Box>
          </Box>
        )}

        <Box p={2} sx={{ display: "flex", flexDirection: "column", flex: 1, gap: 1 }}>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              fontSize: "0.98rem",
              lineHeight: 1.3,
              wordBreak: "break-word",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              color: "#fff",
              minHeight: "2.6em",
            }}
          >
            {project.title}
          </Typography>

          <Typography
            color="#b0b0b0"
            lineHeight={1.5}
            sx={{
              fontSize: "0.86rem",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              minHeight: "3em",
            }}
          >
            {project.description}
          </Typography>

          <Stack
            direction="row"
            spacing={0.8}
            flexWrap="wrap"
            rowGap={0.7}
            sx={{
              minHeight: 56,
              alignContent: "flex-start",
              overflow: "hidden",
            }}
          >
            {techItems.map((t, index) => (
              <Chip
                key={`${t}-${index}`}
                label={t}
                size="small"
                sx={{
                  borderRadius: 99,
                  border: "1px solid rgba(255, 107, 0, 0.3)",
                  color: "rgba(255,107,0,0.9)",
                  backgroundColor: "rgba(255, 107, 0, 0.07)",
                  maxWidth: "100%",
                  height: 23,
                  fontWeight: 600,
                  fontSize: "0.7rem",
                  letterSpacing: "0.03em",
                  "& .MuiChip-label": {
                    px: 1,
                  },
                  "&:hover": {
                    background: "rgba(255,107,0,0.15)",
                    borderColor: "rgba(255,107,0,0.5)",
                  },
                }}
              />
            ))}
          </Stack>

          <Box sx={{ mt: "auto", pt: 1, display: "flex", gap: 2 }}>
            {project.live ? (
              <MuiLink
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                underline="none"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.8,
                  color: "#fff",
                  fontSize: "0.84rem",
                  fontWeight: 600,
                  transition: "color 0.2s ease",
                  "&:hover": { color: "#FF6B00" },
                }}
              >
                <FaExternalLinkAlt />
                Live
              </MuiLink>
            ) : null}

            {project.live && (
              <Box sx={{ width: "1px", height: 18, background: "rgba(255,255,255,0.18)" }} />
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
                  color: "#fff",
                  fontSize: "0.84rem",
                  fontWeight: 600,
                  transition: "color 0.2s ease",
                  "&:hover": { color: "#FF6B00" },
                }}
              >
                <FaGithub />
                Code
              </MuiLink>
            )}
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
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
