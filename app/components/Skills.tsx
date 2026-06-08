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
  FaSearch,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiBootstrap,
  SiAdobephotoshop,
  SiCanva,
  SiCoreldraw,
  SiFirebase,
} from "react-icons/si";
import { MdAnalytics } from "react-icons/md";

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
    name: "HTML / CSS / JavaScript",
    icon: (
      <>
        <FaHtml5 /> <FaCss3Alt /> <FaJs />
      </>
    ),
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
    name: "Node.js",
    icon: <FaNodeJs />,
  },
  {
    name: "Firebase",
    icon: <SiFirebase />,
  },
  {
    name: "Git / GitHub",
    icon: <FaGitAlt />,
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
    name: "SEO & Analytics",
    icon: (
      <>
        <FaSearch /> <MdAnalytics />
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
        {skills.map((skill, idx) => (
          <Grid key={skill.name} size={{ xs: 6, sm: 4, md: 3 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05, ease: "easeOut" }}
              whileHover={{ y: -6 }}
            >
              <Box
                className="skill-card"
                sx={{
                  p: { xs: 2, md: 3 },
                  textAlign: "center",
                  borderRadius: 3,
                  color: "#00C896",
                  minHeight: { xs: 110, md: 140 },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1.5,
                  position: "relative",
                  overflow: "hidden",
                  background: "linear-gradient(145deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.015) 60%, rgba(0,200,150,0.025) 100%)",
                  backdropFilter: "blur(16px) saturate(140%)",
                  WebkitBackdropFilter: "blur(16px) saturate(140%)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderTop: "1px solid rgba(0,200,150,0.1)",
                  transition: "all 0.28s ease",
                  "&:hover": {
                    boxShadow: "0 0 32px rgba(0,200,150,0.18), 0 8px 24px rgba(0,0,0,0.4)",
                    borderColor: "rgba(0,200,150,0.3)",
                    "& .skill-icon": {
                      filter: "drop-shadow(0 0 12px rgba(0,200,150,0.7))",
                      transform: "scale(1.12)",
                    },
                  },
                  // shimmer
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "60%",
                    height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(0,200,150,0.04), transparent)",
                    transition: "left 0.55s ease",
                  },
                  "&:hover::after": {
                    left: "140%",
                  },
                }}
              >
                <Box
                  className="skill-icon"
                  sx={{
                    fontSize: { xs: 34, md: 42 },
                    display: "flex",
                    gap: 1.2,
                    filter: "drop-shadow(0 0 8px rgba(0,200,150,0.35))",
                    transition: "filter 0.28s ease, transform 0.28s ease",
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
