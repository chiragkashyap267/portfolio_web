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
    <Box id="skills" py={10} px={{ xs: 2, md: 4 }}>
      <Typography
        variant="h4"
        textAlign="center"
        mb={6}
        fontWeight={600}
      >
        Skills
      </Typography>

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
                sx={{
                  p: 3,
                  textAlign: "center",
                  borderRadius: 3,
                  background:
                    "linear-gradient(145deg,#0f0f0f,#111)",
                  border: "1px solid #222",
                  color: "#FFD400",
                  minHeight: 130,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  "&:hover": {
                    boxShadow:
                      "0 0 30px rgba(255,212,0,0.45)",
                  },
                }}
              >
                <Box
                  sx={{
                    fontSize: 34,
                    display: "flex",
                    gap: 1,
                  }}
                >
                  {skill.icon}
                </Box>

                <Typography
                  fontSize={14}
                  fontWeight={500}
                  textAlign="center"
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
