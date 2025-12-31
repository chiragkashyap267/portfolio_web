"use client";

import {
  Box,
  Typography,
  Grid,
  Button,
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

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/projects", {
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to load projects");

        const data = await res.json();
        setProjects(Array.isArray(data) ? data : []);
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

        {!loading && projects.length === 0 && (
          <Typography color="gray">
            No projects added yet.
          </Typography>
        )}

        {projects.map((project, index) => (
          <Grid key={index} size={{ xs: 12, md: 5 }}>
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
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 16,
      }}
      style={{ height: "100%" }}
    >
      <Box
        sx={{
          position: "relative",
          height: "100%",
          borderRadius: 4,
          overflow: "hidden",
          background:
            "linear-gradient(145deg, rgba(20,20,20,0.9), rgba(10,10,10,0.9))",
          border: "1px solid #222",
          backdropFilter: "blur(8px)",
          transition: "0.4s ease",
          "&:hover": {
            boxShadow:
              "0 0 40px rgba(255,212,0,0.45)",
            borderColor: "#FFD400",
          },
          "&:hover .overlay": {
            opacity: 1,
          },
          "&:hover img": {
            transform: "scale(1.05)",
          },
        }}
      >
        {/* IMAGE */}
        {project.image && (
          <Box
            component="img"
            src={project.image}
            alt={project.title}
            loading="lazy"
            sx={{
              width: "100%",
              height: 220,
              objectFit: "cover",
              display: "block",
              transition: "0.4s ease",
            }}
          />
        )}

        {/* CONTENT */}
        <Box p={4}>
          <Typography variant="h6" fontWeight={600}>
            {project.title}
          </Typography>

          <Typography
            color="gray"
            mt={1}
            mb={2}
            lineHeight={1.6}
          >
            {project.description}
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            rowGap={1}
          >
            {project.tech?.map((t) => (
              <Box
                key={t}
                sx={{
                  px: 1.2,
                  py: 0.4,
                  borderRadius: 2,
                  fontSize: 12,
                  border: "1px solid #333",
                  color: "#FFD400",
                }}
              >
                {t}
              </Box>
            ))}
          </Stack>
        </Box>

        {/* OVERLAY */}
        <Box
          className="overlay"
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            background:
              "linear-gradient(145deg, rgba(0,0,0,0.6), rgba(0,0,0,0.85))",
            opacity: 0,
            transition: "0.35s ease",
          }}
        >
          {project.live && (
            <Button
              variant="contained"
              href={project.live}
              target="_blank"
              startIcon={<FaExternalLinkAlt />}
            >
              Live
            </Button>
          )}

          {project.github && (
            <Button
              variant="outlined"
              href={project.github}
              target="_blank"
              startIcon={<FaGithub />}
            >
              Code
            </Button>
          )}
        </Box>
      </Box>
    </motion.div>
  );
}
