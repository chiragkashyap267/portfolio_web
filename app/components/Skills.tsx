"use client";

import { Box, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaWordpress,
  FaShopify,
  FaDocker,
  FaCloud,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiBootstrap,
  SiKubernetes,
  SiAdobephotoshop,
  SiCanva,
  SiCoreldraw,
  SiAndroid,
} from "react-icons/si";

const skills = [
  {
    name: "React JS",
    icon: <FaReact />,
  },
  {
    name: "Next JS",
    icon: <SiNextdotjs />,
  },
  {
    name: "Android (React Native)",
    icon: <SiAndroid />,
  },
  {
    name: "Bootstrap / Tailwind CSS",
    icon: (
      <>
        <SiBootstrap /> <SiTailwindcss />
      </>
    ),
  },
  {
    name: "Git / GitHub",
    icon: <FaGitAlt />,
  },
  {
    name: "Node.js",
    icon: <FaNodeJs />,
  },
  {
    name: "HTML / CSS / JavaScript",
    icon: (
      <>
        <FaHtml5 /> <FaCss3Alt /> <FaJs />
      </>
    ),
  },
  {
    name: "Cloud Basics",
    icon: <FaCloud />,
  },
  {
    name: "Docker / Kubernetes",
    icon: (
      <>
        <FaDocker /> <SiKubernetes />
      </>
    ),
  },
  {
    name: "WordPress / Shopify",
    icon: (
      <>
        <FaWordpress /> <FaShopify />
      </>
    ),
  },
  {
    name: "Photoshop / Canva",
    icon: (
      <>
        <SiAdobephotoshop /> <SiCanva />
      </>
    ),
  },
  {
    name: "CorelDraw",
    icon: <SiCoreldraw />,
  },
];

export default function Skills() {
  return (
    <Box id="skills" py={12} px={{ xs: 2, md: 4 }}>
      <Box textAlign="center" mb={8}>
        <Typography
          variant="h2"
          fontWeight={800}
          letterSpacing="-0.025em"
          mb={1.5}
          className="section-heading-gradient"
          sx={{ fontSize: { xs: "1.8rem", md: "2.8rem" } }}
        >
          Skills
        </Typography>
        <Typography
          sx={{ color: "rgba(255,255,255,0.4)", fontWeight: 300, fontSize: "0.95rem", letterSpacing: "0.04em", textTransform: "uppercase" }}
        >
          Technologies I work with
        </Typography>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {skills.map((skill) => (
          <Grid key={skill.name} size={{ xs: 6, sm: 4, md: 3 }}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 12,
              }}
            >
              <Box
                className="glass-card"
                sx={{
                  p: { xs: 2, md: 3 },
                  textAlign: "center",
                  borderRadius: 3,
                  color: "#FF6B00",
                  minHeight: { xs: 110, md: 140 },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1.5,
                  transition: "all 0.28s ease",
                  "&:hover": {
                    boxShadow: "0 0 32px rgba(255,107,0,0.22), 0 8px 24px rgba(0,0,0,0.4)",
                    borderColor: "rgba(255,107,0,0.35) !important",
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <Box
                  sx={{
                    fontSize: { xs: 34, md: 42 },
                    display: "flex",
                    gap: 1.2,
                    filter: "drop-shadow(0 0 8px rgba(255,107,0,0.4))",
                  }}
                >
                  {skill.icon}
                </Box>

                <Typography
                  sx={{
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                    color: "rgba(255,255,255,0.85)",
                    textAlign: "center",
                    lineHeight: 1.4,
                  }}
                >
                  {skill.name}
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
