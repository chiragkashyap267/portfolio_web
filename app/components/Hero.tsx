"use client";

import { Box, Typography, Button, Stack, Chip } from "@mui/material";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import ScrambleText from "./ScrambleText";
import { FaReact, FaNodeJs, FaWordpress } from "react-icons/fa";
import { SiNextdotjs } from "react-icons/si";

/* ================= CSS ORBIT KEYFRAMES (injected once) ================= */
// CSS animations run on the compositor thread — zero JS RAF overhead
const ORBIT_STYLE = `
  @keyframes spin-cw  { to { transform: rotate(360deg);  } }
  @keyframes spin-ccw { to { transform: rotate(-360deg); } }
  @keyframes spin-conic { to { transform: rotate(360deg); } }
  .hero-orbit-outer  { animation: spin-cw   28s linear infinite; }
  .hero-orbit-inner  { animation: spin-ccw  18s linear infinite; }
  .hero-badge        { animation: spin-cw   18s linear infinite; }
  .hero-border-spin  { animation: spin-conic 6s linear infinite; }
`;

/* ================= TYPEWRITER ================= */

function Typewriter() {
  const skills = useMemo(
    () => [
      "React JS",
      "Next JS",
      "Node.js",
      "WordPress",
      "Shopify",
      "UI/UX Design",
    ],
    []
  );

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const i = setInterval(
      () => setIndex((p) => (p + 1) % skills.length),
      2000
    );
    return () => clearInterval(i);
  }, [skills.length]);

  return (
    <motion.span
      key={skills[index]}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      style={{
        color: "#FF6B00",
        fontWeight: 700,
        // no textShadow — causes repaint on every animation frame
      }}
    >
      {skills[index]}
    </motion.span>
  );
}

/* ================= STAT PILL ================= */

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flex: { xs: 1, sm: "initial" }, // allow to share space on mobile
        gap: { xs: 0.1, md: 0.2 },
        px: { xs: 0.5, sm: 1.5, md: 3 },
        py: { xs: 0.8, md: 1.5 },
        borderRadius: { xs: 2.5, md: 3 },
        background: "rgba(255,107,0,0.07)",
        border: "1px solid rgba(255,107,0,0.15)",
        backdropFilter: "blur(8px)",
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: "0.85rem", sm: "1.1rem", md: "1.6rem" },
          fontWeight: 800,
          letterSpacing: "-0.02em",
          lineHeight: 1,
          whiteSpace: "nowrap",
          background: "linear-gradient(135deg, #FF6B00, #FFAE73)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {value}
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: "0.5rem", sm: "0.62rem", md: "0.72rem" },
          fontWeight: 500,
          color: "rgba(255,255,255,0.55)",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          textAlign: "center",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </Typography>
    </Box>
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
      sx={{ pt: { xs: 10, md: 0 }, pl: { xs: 2, md: 6 }, pr: { xs: 2, md: 10 } }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 8, md: 6 }}
        alignItems="center"
        maxWidth={1200}
        width="100%"
        sx={{ py: { xs: 10, md: 4 } }}
      >
        {/* ================= LEFT TEXT ================= */}
        <Stack spacing={3.5} flex={1}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {/* Badge pill */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              style={{ marginBottom: 20 }}
            >
              <Chip
                label="Full Stack Developer & Web Specialist"
                size="small"
                sx={{
                  background: "rgba(255,107,0,0.1)",
                  border: "1px solid rgba(255,107,0,0.3)",
                  color: "#FF6B00",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  letterSpacing: "0.04em",
                  px: 0.5,
                  height: 28,
                  "& .MuiChip-label": { px: 1.5 },
                }}
              />
            </motion.div>

            {/* Heading */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Typography
                variant="h1"
                fontWeight={800}
                fontSize={{ xs: 40, sm: 62, md: 76, lg: 86 }}
                letterSpacing="-0.03em"
                lineHeight={1.05}
              >
                Hi, I&apos;m{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(90deg, #FF6B00 0%, #FFAE73 50%, #FF6B00 100%)",
                    backgroundSize: "200% auto",
                    backgroundClip: "text",
                    display: "inline-block",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  <ScrambleText text="Chirag Kashyap" />
                </span>
              </Typography>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              style={{ marginTop: 20 }}
            >
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.55)",
                  maxWidth: 560,
                  fontSize: { xs: "1rem", md: "1.15rem" },
                  fontWeight: 300,
                  lineHeight: 1.75,
                }}
              >
                I design and build premium web experiences — from{" "}
                <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>
                  custom React / Next.js apps
                </span>{" "}
                to{" "}
                <span style={{ color: "#FF6B00", fontWeight: 600 }}>
                  <Typewriter />
                </span>.
              </Typography>
            </motion.div>

            {/* Buttons */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                mt={4}
                sx={{
                  "& > button": {
                    width: { xs: "100%", sm: "auto" }
                  }
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={() =>
                    document
                      .getElementById("projects")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  sx={{
                    py: 1.6,
                    px: 4,
                    fontSize: "0.95rem",
                    fontWeight: 800,
                    letterSpacing: "0.02em",
                    background: "linear-gradient(135deg, #FF6B00 0%, #FF8C00 50%, #FFAE73 100%)",
                    backgroundSize: "200% auto",
                    color: "#0d0d0d",
                    borderRadius: 99,
                    boxShadow: "0 8px 28px rgba(255,107,0,0.35)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundPosition: "right center",
                      boxShadow: "0 12px 40px rgba(255,107,0,0.5)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  View Projects
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  href="/resume.pdf"
                  download
                  sx={{
                    py: 1.6,
                    px: 4,
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    letterSpacing: "0.02em",
                    borderColor: "rgba(255,107,0,0.45)",
                    color: "#FF6B00",
                    borderRadius: 99,
                    backdropFilter: "blur(8px)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: "rgba(255,107,0,0.1)",
                      borderColor: "#FF6B00",
                      boxShadow: "0 0 24px rgba(255,107,0,0.2)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  Download Resume
                </Button>
              </Stack>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexWrap: { xs: "nowrap", md: "wrap" },
                  gap: { xs: 1, sm: 1.5, md: 2 },
                  mt: 5,
                  width: "100%",
                  justifyContent: { xs: "space-between", md: "flex-start" },
                }}
              >
                <StatPill value="20+" label="Live Websites" />
                <StatPill value="WP & Shopify" label="E-Commerce Expert" />
                <StatPill value="3+ Yrs" label="Experience" />
              </Box>
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

const TECH_BADGES = [
  { label: "React", icon: <FaReact color="#FF6B00" />, angle: 45 },
  { label: "Next.js", icon: <SiNextdotjs color="#FF6B00" />, angle: 135 },
  { label: "Node.js", icon: <FaNodeJs color="#FF6B00" />, angle: 225 },
  { label: "WordPress", icon: <FaWordpress color="#FF6B00" />, angle: 315 },
];

function HeroImage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDesktop = mounted && window.innerWidth >= 768;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-60, 60], [10, -10]);
  const rotateY = useTransform(x, [-60, 60], [-10, 10]);

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

  /* size tokens */
  const SIZE = { xs: 230, sm: 290, md: 330, lg: 390 };
  const ORBIT_1 = { xs: 290, sm: 360, md: 410, lg: 470 };
  const ORBIT_2 = { xs: 340, sm: 420, md: 480, lg: 540 };

  return (
    <Box sx={{
      position: "relative",
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: { xs: ORBIT_2.xs, sm: ORBIT_2.sm, md: ORBIT_2.md, lg: ORBIT_2.lg },
      height: { xs: ORBIT_2.xs, sm: ORBIT_2.sm, md: ORBIT_2.md, lg: ORBIT_2.lg },
    }}>

      {/* Inject CSS keyframes once */}
      <style dangerouslySetInnerHTML={{ __html: ORBIT_STYLE }} />

      {/* ── Deep ambient glow beneath everything ── */}
      <Box sx={{
        position: "absolute",
        inset: 0, margin: "auto",
        width: { xs: ORBIT_2.xs, sm: ORBIT_2.sm, md: ORBIT_2.md, lg: ORBIT_2.lg },
        height: { xs: ORBIT_2.xs, sm: ORBIT_2.sm, md: ORBIT_2.md, lg: ORBIT_2.lg },
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,107,0,0.18) 0%, rgba(255,107,0,0.05) 45%, transparent 70%)",
        filter: "blur(24px)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* ── Outer slow orbit ring (CSS animation — compositor threaded) ── */}
      <Box
        className="hero-orbit-outer"
        sx={{
          position: "absolute",
          inset: 0, margin: "auto",
          width: { xs: ORBIT_2.xs, sm: ORBIT_2.sm, md: ORBIT_2.md, lg: ORBIT_2.lg },
          height: { xs: ORBIT_2.xs, sm: ORBIT_2.sm, md: ORBIT_2.md, lg: ORBIT_2.lg },
          borderRadius: "50%",
          border: "1px dashed rgba(255,107,0,0.12)",
          zIndex: 1,
        }}
      />

      {/* ── Inner faster orbit ring with tech badges (CSS animation) ── */}
      <Box
        className="hero-orbit-inner"
        sx={{
          position: "absolute",
          inset: 0, margin: "auto",
          width: { xs: ORBIT_1.xs, sm: ORBIT_1.sm, md: ORBIT_1.md, lg: ORBIT_1.lg },
          height: { xs: ORBIT_1.xs, sm: ORBIT_1.sm, md: ORBIT_1.md, lg: ORBIT_1.lg },
          borderRadius: "50%",
          zIndex: 2,
        }}
      >
        {TECH_BADGES.map(({ label, icon, angle }) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <Box
              key={label}
              sx={{
                position: "absolute",
                left: `calc(50% + ${50 * Math.cos(rad)}%)`,
                top: `calc(50% + ${50 * Math.sin(rad)}%)`,
                display: "flex",
                transform: "translate(-50%, -50%)", // Safe here since NO animation class is on this wrapper
                pointerEvents: "none",
              }}
            >
              <Box
                className="hero-badge"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0.5,
                  background: "rgba(10,10,10,0.88)",
                  border: "1px solid rgba(255,107,0,0.28)",
                  borderRadius: 99,
                  padding: "2px 8px",
                  fontSize: { xs: 10, md: 11 },
                  fontWeight: 700,
                  color: "#fff",
                  whiteSpace: "nowrap",
                  pointerEvents: "auto",
                }}
              >
                <span style={{ fontSize: 13 }}>{icon}</span>
                {label}
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* ── Spinning conic border (CSS animation) ── */}
      <Box
        className="hero-border-spin"
        sx={{
          position: "absolute",
          inset: 0, margin: "auto",
          width: { xs: SIZE.xs + 6, sm: SIZE.sm + 6, md: SIZE.md + 6, lg: SIZE.lg + 6 },
          height: { xs: SIZE.xs + 6, sm: SIZE.sm + 6, md: SIZE.md + 6, lg: SIZE.lg + 6 },
          borderRadius: 34,
          background: "conic-gradient(from 0deg, #FF6B00, #FFAE73, transparent, transparent, #FF6B00)",
          zIndex: 3,
          filter: "blur(1px)",
        }}
      />

      {/* ── Static backdrop for the spinning border ── */}
      <Box sx={{
        position: "absolute",
        inset: 0, margin: "auto",
        width: { xs: SIZE.xs + 4, sm: SIZE.sm + 4, md: SIZE.md + 4, lg: SIZE.lg + 4 },
        height: { xs: SIZE.xs + 4, sm: SIZE.sm + 4, md: SIZE.md + 4, lg: SIZE.lg + 4 },
        borderRadius: "34px",
        background: "#080808",
        zIndex: 4,
      }} />

      {/* ── Main image card with 3-D tilt on hover (no float animation) ── */}
      <motion.div
        style={{ willChange: "transform", zIndex: 5, position: "relative" }}
      >
        <motion.div
          onMouseMove={handleMove}
          onMouseLeave={reset}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d", borderRadius: 32, willChange: "transform" }}
        >
          {/* Inner glow on the card */}
          <Box sx={{
            position: "absolute", inset: 0, borderRadius: "28px", zIndex: 1, pointerEvents: "none",
            background: "linear-gradient(135deg, rgba(255,107,0,0.12) 0%, transparent 60%, rgba(255,107,0,0.05) 100%)",
          }} />

          <Box
            sx={{
              width: { xs: SIZE.xs, sm: SIZE.sm, md: SIZE.md, lg: SIZE.lg },
              height: { xs: SIZE.xs, sm: SIZE.sm, md: SIZE.md, lg: SIZE.lg },
              borderRadius: "28px",
              overflow: "hidden",
              boxShadow: "0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,107,0,0.18), inset 0 1px 0 rgba(255,255,255,0.08)",
              position: "relative",
            }}
          >
            <Image
              src="/profile.png"
              alt="Chirag Kashyap"
              width={420}
              height={420}
              priority
              sizes="(max-width: 768px) 260px, (max-width: 1200px) 370px, 420px"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
            {/* Subtle vignette overlay */}
            <Box sx={{
              position: "absolute", inset: 0, borderRadius: "28px", pointerEvents: "none",
              background: "radial-gradient(ellipse at 50% 0%, transparent 50%, rgba(0,0,0,0.35) 100%)",
            }} />
          </Box>
        </motion.div>
      </motion.div>

      {/* ── Availability pill ── */}
      <Box sx={{
        position: "absolute",
        bottom: { xs: -12, md: -14 },
        left: { xs: "0%", md: "5%" },
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        gap: 1,
        background: "rgba(10,10,10,0.92)",
        border: "1px solid rgba(255,107,0,0.3)",
        borderRadius: 99,
        px: { xs: 1.5, md: 2 },
        py: { xs: 0.5, md: 0.7 },
        backdropFilter: "blur(10px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
      }}>
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e" }}
        />
        <Typography sx={{ fontSize: { xs: "0.65rem", md: "0.72rem" }, fontWeight: 600, color: "rgba(255,255,255,0.85)", letterSpacing: "0.04em" }}>
          Available for work
        </Typography>
      </Box>

      {/* ── Experience badge ── */}
      <Box sx={{
        position: "absolute",
        top: { xs: -12, md: -14 },
        right: { xs: "0%", md: "5%" },
        zIndex: 10,
        background: "linear-gradient(135deg, rgba(255,107,0,0.9), rgba(255,80,0,0.8))",
        borderRadius: 99,
        px: { xs: 1.5, md: 2 },
        py: { xs: 0.5, md: 0.7 },
        boxShadow: "0 8px 28px rgba(255,107,0,0.4)",
      }}>
        <Typography sx={{ fontSize: { xs: "0.65rem", md: "0.72rem" }, fontWeight: 800, color: "#fff", letterSpacing: "0.05em" }}>
          3+ Yrs Experience
        </Typography>
      </Box>

    </Box>
  );
}

