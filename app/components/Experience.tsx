"use client";

import { Box, Typography, Stack, Chip } from "@mui/material";
import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";

/* ================= EXPERIENCE DATA ================= */

const experiences = [
  {
    role: "Web Developer & Content Analyst Intern",
    company: "Growthpandit Pvt. Ltd.",
    type: "Remote",
    duration: "Jan 2026 – Present",
    current: true,
    tags: ["Next.js", "React.js", "SEO", "Regex", "WordPress", "Shopify"],
    points: [
      "Analyzed URL architectures and content structures for 4+ web applications (React.js / Next.js); identified relevance gaps and implemented structured URL optimizations — reducing project delivery time by 30%.",
      "Evaluated and optimized web content quality for 20+ WordPress and Shopify websites against established web quality standards, consistently achieving 90+ Google PageSpeed scores.",
      "Conducted SEO-aligned keyword research, metadata evaluation, and URL structure analysis; documented actionable content improvement findings that measurably boosted organic search traffic.",
      "Utilized Regular Expressions in JavaScript-based scripts to identify, filter, and curate low-value URL patterns and content elements, improving overall web data quality across client projects.",
    ],
  },
  {
    role: "Frontend Developer Intern",
    company: "Prodesk IT",
    type: "Remote",
    duration: "Jun 2025 – Jul 2025",
    current: false,
    tags: ["HTML5", "CSS3", "JavaScript", "Regex", "Git"],
    points: [
      "Built 3 responsive, standards-compliant landing pages using HTML5 and CSS3; evaluated content structure, cross-browser compatibility, and adherence to web quality guidelines.",
      "Applied Regular Expressions for dynamic content filtering and pattern-based text processing within JavaScript-driven UI components, improving content accuracy and consistency.",
      "Maintained detailed documentation of project workflows, analysis decisions, and code logic; collaborated with the team through Git version control following industry-standard workflows.",
    ],
  },
  {
    role: "Web Developer Intern",
    company: "Elem Consumer Tech Pvt. Ltd.",
    type: "On-site · Roorkee",
    duration: "Jan 2023 – Jul 2024",
    current: false,
    tags: ["Shopify", "React.js", "HTML/CSS", "SEO", "Analytics"],
    points: [
      "Managed and maintained the company's Shopify website — evaluated URL structures and content relevance, curated site assets, and aligned all content with SEO best practices.",
      "Analysed user engagement and conversion data, identifying content and UX optimization opportunities; executed targeted improvements that lifted conversion rates by 20%.",
      "Built responsive HTML/CSS and React.js UIs meeting 90+ PageSpeed quality benchmarks; ensured consistent cross-device compatibility and documented decisions for ongoing knowledge management.",
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

      {/* Timeline */}
      <Box sx={{ position: "relative", maxWidth: 900, mx: "auto" }}>
        {/* Vertical line */}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "2px",
            background: "linear-gradient(180deg, #00C896 0%, rgba(0,200,150,0.2) 60%, transparent 100%)",
            ml: 0,
          }}
        />

        <Stack spacing={5} sx={{ pl: { xs: 2, md: 4 } }}>
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <ExperienceCard exp={exp} />
            </motion.div>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

/* ================= EXPERIENCE CARD ================= */

function ExperienceCard({ exp }: { exp: (typeof experiences)[0] }) {
  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: 4,
        overflow: "hidden",
        background: "linear-gradient(145deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.015) 60%, rgba(0,200,150,0.025) 100%)",
        backdropFilter: "blur(20px) saturate(150%)",
        WebkitBackdropFilter: "blur(20px) saturate(150%)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderTop: "1px solid rgba(0,200,150,0.14)",
        transition: "box-shadow 0.3s ease, border-color 0.3s ease",
        "&:hover": {
          boxShadow: "0 20px 60px rgba(0,200,150,0.12), 0 4px 16px rgba(0,0,0,0.5)",
          borderColor: "rgba(0,200,150,0.22)",
        },
      }}
    >
      {/* Top accent bar */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: exp.current
            ? "linear-gradient(90deg, #00C896, #00E5B0, transparent)"
            : "linear-gradient(90deg, rgba(0,200,150,0.4), transparent)",
        }}
      />

      {/* Timeline dot */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          position: "absolute",
          left: { md: -20 },
          top: { md: 32 },
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: exp.current ? "#00C896" : "rgba(0,200,150,0.45)",
          boxShadow: exp.current ? "0 0 0 3px rgba(0,200,150,0.2), 0 0 14px rgba(0,200,150,0.5)" : "none",
          border: "2px solid rgba(0,200,150,0.6)",
          zIndex: 2,
        }}
      />

      <Box p={{ xs: 2.5, md: 4 }}>
        {/* Header row */}
        <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 1, mb: 1.5 }}>
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 0.5 }}>
              <Typography fontWeight={700} fontSize={{ xs: 17, md: 19 }} color="#fff" lineHeight={1.2}>
                {exp.role}
              </Typography>
              {exp.current && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, px: 1.2, py: 0.3, borderRadius: 99, background: "rgba(0,200,150,0.12)", border: "1px solid rgba(0,200,150,0.3)" }}>
                  <Box sx={{ width: 6, height: 6, borderRadius: "50%", background: "#00C896", animation: "pulse-dot 2s infinite" }} />
                  <Typography sx={{ fontSize: "0.65rem", fontWeight: 700, color: "#00C896", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    Current
                  </Typography>
                </Box>
              )}
            </Box>
            <Typography color="#00C896" fontWeight={600} fontSize={14}>
              {exp.company}
            </Typography>
            <Typography color="rgba(255,255,255,0.38)" fontSize={12} mt={0.3} sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
              <FiExternalLink size={11} />
              {exp.type} · {exp.duration}
            </Typography>
          </Box>
        </Box>

        {/* Tags */}
        <Stack direction="row" flexWrap="wrap" gap={0.8} mb={2.5}>
          {exp.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{
                height: 22,
                fontSize: "0.68rem",
                fontWeight: 600,
                letterSpacing: "0.03em",
                color: "rgba(0,200,150,0.9)",
                background: "rgba(0,200,150,0.08)",
                border: "1px solid rgba(0,200,150,0.22)",
                "& .MuiChip-label": { px: 1 },
              }}
            />
          ))}
        </Stack>

        {/* Bullet points */}
        <Stack spacing={1.2}>
          {exp.points.map((point, i) => (
            <Box key={i} sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
              <Box sx={{ flexShrink: 0, width: 5, height: 5, borderRadius: "50%", background: "#00C896", mt: "7px", opacity: 0.7 }} />
              <Typography color="rgba(255,255,255,0.65)" lineHeight={1.7} fontSize={14}>
                {point}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
