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
import MagneticCard from "./MagneticCard";

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

        if (!res.ok) throw new Error("Failed to load projects");

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

      <Grid container spacing={4} justifyContent="center">
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
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 4 }} sx={{ display: "flex" }}>
            <MagneticCard>
              <ProjectCard project={project} />
            </MagneticCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

/* ================= PROJECT CARD ================= */

function ProjectCard({ project }: { project: Project }) {
  const techItems = project.tech.slice(0, 6);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 18,
      }}
      style={{ height: "100%", width: "100%" }}
    >
      <Box
        sx={{
          position: "relative",
          height: "100%",
          width: "100%",
          minHeight: { xs: 460, sm: 500 },
          borderRadius: 4,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(145deg, rgba(20,20,20,0.96), rgba(8,8,8,0.97))",
          border: "1px solid rgba(255, 212, 0, 0.24)",
          backdropFilter: "blur(10px)",
          transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow:
            "0 10px 30px rgba(0, 0, 0, 0.42), inset 0 1px 0 rgba(255,255,255,0.03)",
          "&:hover": {
            boxShadow:
              "0 18px 42px rgba(0,0,0,0.52), 0 0 0 1px rgba(255,212,0,0.48), 0 0 30px rgba(255,212,0,0.2)",
            borderColor: "rgba(255, 212, 0, 0.54)",
          },
          "&:hover img": {
            transform: "scale(1.08)",
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
              height: 210,
              objectFit: "cover",
              display: "block",
              transition: "0.35s ease",
            }}
          />
        )}

        {!project.image && (
          <Box
            sx={{
              height: 210,
              background:
                "radial-gradient(circle at 20% 20%, rgba(255,212,0,0.24), transparent 55%), linear-gradient(120deg, rgba(35,35,35,1), rgba(10,10,10,1))",
            }}
          />
        )}

        <Box p={3} sx={{ display: "flex", flexDirection: "column", flex: 1, gap: 1.5 }}>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              fontSize: "1.08rem",
              lineHeight: 1.3,
              wordBreak: "break-word",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              color: "#fff",
            }}
          >
            {project.title}
          </Typography>

          <Typography
            color="#b0b0b0"
            lineHeight={1.5}
            sx={{
              fontSize: "0.93rem",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              minHeight: "4.2em",
            }}
          >
            {project.description}
          </Typography>

          <Stack
            direction="row"
            spacing={0.8}
            flexWrap="wrap"
            rowGap={0.8}
            sx={{
              minHeight: 70,
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
                  "& .MuiChip-label": {
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
                fontSize: "0.9rem",
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
                fontSize: "0.9rem",
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
