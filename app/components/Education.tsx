"use client";

import { Box, Typography, Stack } from "@mui/material";
import { motion } from "framer-motion";

/* ================= EDUCATION DATA ================= */

const education = [
  {
    degree: "Master of Computer Applications (MCA)",
    institute:
      "Govind Ballabh Pant Institute of Engineering & Technology, Pauri Garhwal",
    duration: "2024 – 2026",
    score: "CGPA: 8.1",
  },
  {
    degree: "Bachelor of Science (Computer Science)",
    institute: "KL DAV PG College, Roorkee",
    duration: "2021 – 2024",
    score: "CGPA: 6.6",
  },
  {
    degree: "Intermediate",
    institute: "KL DAV Inter College, Roorkee",
    duration: "",
    score: "87.4%",
  },
  {
    degree: "High School",
    institute: "KL DAV Inter College, Roorkee",
    duration: "",
    score: "84.3%",
  },
];

/* ================= COMPONENT ================= */

export default function Education() {
  return (
    <Box id="education" py={10} px={{ xs: 2, md: 4 }}>
      <Typography
        variant="h4"
        textAlign="center"
        mb={8}
        fontWeight={600}
      >
        Education
      </Typography>

      <Stack spacing={6} maxWidth={900} mx="auto">
        {education.map((edu, index) => (
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
            <EducationCard edu={edu} />
          </motion.div>
        ))}
      </Stack>
    </Box>
  );
}

/* ================= EDUCATION CARD ================= */

function EducationCard({
  edu,
}: {
  edu: (typeof education)[0];
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
      {/* YELLOW TIMELINE MARKER */}
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
        {edu.degree}
      </Typography>

      <Typography
        color="#FFD400"
        fontWeight={500}
        mt={0.5}
      >
        {edu.institute}
      </Typography>

      {(edu.duration || edu.score) && (
        <Typography
          color="gray"
          fontSize={14}
          mt={0.5}
        >
          {edu.duration && `${edu.duration} • `}
          {edu.score}
        </Typography>
      )}
    </Box>
  );
}
