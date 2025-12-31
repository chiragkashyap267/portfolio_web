"use client";

import { Box, Typography, Button, Stack } from "@mui/material";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import ScrambleText from "./ScrambleText";

/* ================= TYPEWRITER ================= */

function Typewriter() {
  const skills = useMemo(
    () => [
      "React JS",
      "Next JS",
      "Node.js",
      "WordPress",
      "Docker",
      "UI/UX Design",
    ],
    []
  );

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const i = setInterval(
      () => setIndex((p) => (p + 1) % skills.length),
      1800
    );
    return () => clearInterval(i);
  }, [skills.length]);

  return (
    <motion.span
      key={skills[index]}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      style={{
        color: "#FFD400",
        fontWeight: 600,
        willChange: "transform",
      }}
    >
      {skills[index]}
    </motion.span>
  );
}

/* ================= HERO ================= */

export default function Hero() {
  return (
    <Box
      id="home"
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={{ xs: 2, md: 8 }}
    >
      <Stack
        direction={{ xs: "column-reverse", md: "row" }}
        spacing={8}
        alignItems="center"
        maxWidth={1200}
        width="100%"
      >
        {/* ================= LEFT TEXT ================= */}
        <Stack spacing={3} flex={1}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.12 } },
            }}
          >
            {/* Heading */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Typography variant="h2" fontWeight={700}>
                Hi, I’m{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(90deg,#FFD400,#FFF3A0,#FFD400)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Chirag Kashyap
                </span>
              </Typography>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Typography color="gray" maxWidth={520}>
                Full Stack Developer & UI Enthusiast specializing in{" "}
                <span style={{ color: "#FFD400", fontWeight: 600 }}>
                  <ScrambleText text="Modern Web Technologies" />
                </span>{" "}
                <Typewriter />
              </Typography>
            </motion.div>

            {/* Buttons */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Stack direction="row" spacing={2} mt={2}>
                <Button
                  variant="contained"
                  onClick={() =>
                    document
                      .getElementById("projects")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  View Projects
                </Button>

                <Button
                  variant="outlined"
                  href="/resume.pdf"
                  download
                >
                  Download Resume
                </Button>
              </Stack>
            </motion.div>
          </motion.div>
        </Stack>

        {/* ================= IMAGE ================= */}
        <HeroImage />
      </Stack>
    </Box>
  );
}

/* ================= IMAGE COMPONENT ================= */

function HeroImage() {
  const isDesktop =
    typeof window !== "undefined" && window.innerWidth >= 768;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], [8, -8]);
  const rotateY = useTransform(x, [-50, 50], [-8, 8]);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!isDesktop) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{ willChange: "transform" }}
    >
      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          borderRadius: 8,
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
          willChange: "transform",
        }}
      >
        <Box
          sx={{
            width: { xs: 260, sm: 300, md: 380, lg: 440 },
            height: { xs: 260, sm: 300, md: 380, lg: 440 },
            borderRadius: 8,
            overflow: "hidden",
            background: "linear-gradient(145deg,#0f0f0f,#111)",
            border: "2px solid #FFD400",
            boxShadow:
              "0 0 50px rgba(255,212,0,0.35)",
          }}
        >
          <Image
            src="/profile.png"
            alt="Chirag Kashyap"
            width={440}
            height={440}
            priority
            sizes="(max-width: 768px) 260px, (max-width: 1200px) 380px, 440px"
            style={{ objectFit: "cover" }}
          />
        </Box>
      </motion.div>
    </motion.div>
  );
}
