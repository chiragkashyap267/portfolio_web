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
    <Box id="projects" py={10} px={{ xs: 2, md: 4 }}>
      <Typography
        variant="h4"
        textAlign="center"
        mb={6}
        fontWeight={600}
      >
        Projects
      </Typography>

      <Grid container spacing={3} justifyContent="center" sx={{ maxWidth: 1440, mx: "auto" }}>
        {loading && (
          <Typography color="gray">
            Loading projects...
          </Typography>
        )}

        {!loading && visibleProjects.length === 0 && (
          <Typography color="gray">
            No projects added yet.
          </Typography>
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
      whileHover={{ y: -5 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 22,
      }}
      style={{ height: "100%", width: "100%", maxWidth: 360, marginInline: "auto" }}
    >
      <Box
        sx={{
          position: "relative",
          height: { xs: 420, sm: 440 },
          width: "100%",
          borderRadius: 3,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(145deg, rgba(20,20,20,0.96), rgba(8,8,8,0.97))",
          border: "1px solid rgba(255, 212, 0, 0.24)",
          transition: "all 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow:
            "0 8px 24px rgba(0, 0, 0, 0.38), inset 0 1px 0 rgba(255,255,255,0.03)",
          "&:hover": {
            boxShadow:
              "0 14px 34px rgba(0,0,0,0.48), 0 0 0 1px rgba(255,212,0,0.4), 0 0 20px rgba(255,212,0,0.16)",
            borderColor: "rgba(255, 212, 0, 0.54)",
          },
          "&:hover img": {
            transform: "scale(1.04)",
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
              height: 170,
              objectFit: "cover",
              display: "block",
              transition: "0.3s ease",
            }}
          />
        )}

        {!project.image && (
          <Box
            sx={{
              height: 170,
              background:
                "radial-gradient(circle at 20% 20%, rgba(255,212,0,0.24), transparent 55%), linear-gradient(120deg, rgba(35,35,35,1), rgba(10,10,10,1))",
            }}
          />
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
                variant="outlined"
                sx={{
                  borderColor: "rgba(255, 212, 0, 0.45)",
                  color: "#FFD400",
                  backgroundColor: "rgba(255, 212, 0, 0.08)",
                  maxWidth: "100%",
                  height: 22,
                  "& .MuiChip-label": {
                    px: 0.8,
                    fontSize: "0.72rem",
                    lineHeight: 1.2,
                    display: "block",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
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
                "&:hover": { color: "#FFD400" },
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
                "&:hover": { color: "#FFD400" },
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
