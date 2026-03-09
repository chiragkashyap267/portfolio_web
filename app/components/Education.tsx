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
        sx={{ fontSize: { xs: "1.8rem", md: "2.125rem" } }}
      >
        Education
      </Typography>

      <Stack spacing={6} maxWidth={900} mx="auto" sx={{ pl: { xs: 2, md: 0 } }}>
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
      className="glass-card"
      sx={{
        position: "relative",
        p: { xs: 2.5, md: 4 },
        borderRadius: 4,
      }}
    >
      {/* YELLOW TIMELINE MARKER */}
      <Box
        sx={{
          position: "absolute",
          left: { xs: -12, md: -14 },
          top: { xs: 24, md: 32 },
          width: 6,
          height: { xs: 32, md: 40 },
          borderRadius: 2,
          background: "#FF6B00",
          boxShadow: "0 0 10px rgba(255,107,0,0.5)",
        }}
      />

      <Typography fontWeight={600} fontSize={20}>
        {edu.degree}
      </Typography>

      <Typography
        color="#FF6B00"
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
