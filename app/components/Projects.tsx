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
          <Grid key={index} size={{ xs: 12, md: 6 }}>
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
          borderRadius: 3,
          overflow: "hidden",
          background:
            "linear-gradient(145deg, rgba(20,20,20,0.95), rgba(10,10,10,0.95))",
          border: "2px solid #2a2a2a",
          backdropFilter: "blur(8px)",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          "&:hover": {
            boxShadow: "0 12px 40px rgba(255,212,0,0.25), inset 0 0 20px rgba(255,212,0,0.1)",
            borderColor: "#FFD400",
            transform: "translateY(-8px)",
          },
          "&:hover .overlay": {
            opacity: 1,
          },
          "&:hover img": {
            transform: "scale(1.08)",
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
        <Box p={3.5}>
          <Typography 
            variant="h6" 
            fontWeight={700}
            sx={{
              fontSize: "1.1rem",
              lineHeight: 1.3,
              wordBreak: "break-word",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              color: "#fff",
              mb: 1.5,
            }}
          >
            {project.title}
          </Typography>

          <Typography
            color="#b0b0b0"
            mt={0.5}
            mb={2}
            lineHeight={1.5}
            sx={{
              fontSize: "0.95rem",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {project.description}
          </Typography>

          <Stack
            direction="row"
            spacing={0.75}
            flexWrap="wrap"
            rowGap={0.75}
            sx={{ mt: 1.5 }}
          >
            {project.tech?.map((t) => (
              <Box
                key={t}
                sx={{
                  px: 1,
                  py: 0.5,
                  borderRadius: 1.5,
                  fontSize: "0.8rem",
                  border: "1.5px solid #FFD400",
                  color: "#FFD400",
                  backgroundColor: "rgba(255, 212, 0, 0.08)",
                  fontWeight: 500,
                  wordBreak: "break-word",
                  whiteSpace: "normal",
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
