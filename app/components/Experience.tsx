"use client";

import { Box, Typography, Stack } from "@mui/material";
import { motion } from "framer-motion";

/* ================= EXPERIENCE DATA ================= */

const experiences = [
  {
    role: "Web Developer & Graphics Designer",
    company: "Elem Consumer Tech Pvt. Ltd. – Roorkee",
    duration: "Jan 2023 – July 2024",
    points: [
      "Developed and maintained responsive websites to support brand and marketing goals.",
      "Designed web creatives and optimized UI for better user engagement and faster load times.",
      "Collaborated with cross-functional teams to align website functionality with business and campaign needs.",
    ],
  },
  {
    role: "Frontend Web Developer Intern",
    company: "Prodesk IT – Noida",
    duration: "1 July 2025 – 31 July 2025",
    points: [
      "Assisted in developing responsive front-end components for client-based web projects.",
      "Translated design mockups into clean, functional HTML/CSS layouts.",
      "Collaborated with the development team to improve UI consistency and user experience.",
    ],
  },
  {
    role: "Freelance Web Developer",
    company: "Fiverr & Freelancer",
    duration: "Ongoing",
    points: [
      "Designed and developed custom WordPress websites tailored to client requirements using themes, plugins, and page builders.",
      "Delivered responsive, SEO-friendly websites with optimized performance and clean UI/UX design.",
    ],
  },
];

/* ================= COMPONENT ================= */

export default function Experience() {
  return (
    <Box id="experience" py={10} px={{ xs: 2, md: 4 }}>
      <Typography
        variant="h4"
        textAlign="center"
        mb={8}
        fontWeight={600}
      >
        Experience
      </Typography>

      <Stack spacing={6} maxWidth={900} mx="auto">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
            }}
          >
            <ExperienceCard exp={exp} />
          </motion.div>
        ))}
      </Stack>
    </Box>
  );
}

/* ================= EXPERIENCE CARD ================= */

function ExperienceCard({
  exp,
}: {
  exp: (typeof experiences)[0];
}) {
  return (
    <Box
      sx={{
        position: "relative",
        p: 4,
        borderRadius: 4,
        background:
          "linear-gradient(145deg, #0f0f0f, #111)",
        border: "1px solid #222",
        transition: "0.3s ease",
        "&:hover": {
          borderColor: "#FFD400",
          boxShadow:
            "0 0 40px rgba(255,212,0,0.45)",
        },
      }}
    >
      {/* YELLOW TIMELINE INDICATOR */}
      <Box
        sx={{
          position: "absolute",
          left: -14,
          top: 32,
          width: 6,
          height: 40,
          borderRadius: 2,
          background: "#FFD400",
        }}
      />

      <Typography fontWeight={600} fontSize={20}>
        {exp.role}
      </Typography>

      <Typography
        color="#FFD400"
        fontWeight={500}
        mt={0.5}
      >
        {exp.company}
      </Typography>

      <Typography
        color="gray"
        fontSize={14}
        mt={0.5}
        mb={2}
      >
        {exp.duration}
      </Typography>

      <Stack spacing={1}>
        {exp.points.map((point, i) => (
          <Typography
            key={i}
            color="gray"
            lineHeight={1.7}
            fontSize={15}
          >
            • {point}
          </Typography>
        ))}
      </Stack>
    </Box>
  );
}
