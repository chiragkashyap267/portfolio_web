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
    role: "WordPress Developer Intern",
    company: "Byte Depth IT Solutions Pvt. Ltd. – Gurugram (Hybrid)",
    duration: "1 Jan 2026 – 31 Mar 2026",
    points: [
      "Designed and developed custom WordPress websites tailored to client requirements using themes, plugins, and page builders.",
      "Delivered responsive, SEO-friendly websites with optimized performance and clean UI/UX design.",
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
    <Box id="experience" py={12} px={{ xs: 2, md: 4 }}>
      <Box textAlign="center" mb={8}>
        <Typography
          variant="h2"
          fontWeight={800}
          letterSpacing="-0.025em"
          mb={1.5}
          className="section-heading-gradient"
          sx={{ fontSize: { xs: "1.8rem", md: "2.8rem" } }}
        >
          Experience
        </Typography>
        <Typography
          sx={{ color: "rgba(255,255,255,0.4)", fontWeight: 300, fontSize: "0.95rem", letterSpacing: "0.04em", textTransform: "uppercase" }}
        >
          Where I&apos;ve built real-world impact
        </Typography>
      </Box>

      <Stack spacing={6} maxWidth={900} mx="auto" sx={{ pl: { xs: 2, md: 0 } }}>
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
      className="glass-card"
      sx={{
        position: "relative",
        p: { xs: 2.5, md: 4 },
        borderRadius: 4,
      }}
    >
      {/* YELLOW TIMELINE INDICATOR */}
      <Box
        sx={{
          position: "absolute",
          left: { xs: -12, md: -14 },
          top: { xs: 24, md: 32 },
          width: 6,
          height: { xs: 32, md: 40 },
          borderRadius: 2,
          background: "#00C896",
          boxShadow: "0 0 10px rgba(0,200,150,0.5)",
        }}
      />

      <Typography fontWeight={600} fontSize={20}>
        {exp.role}
      </Typography>

      <Typography
        color="#00C896"
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
