"use client";

import {
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { useState, useEffect } from "react";

/* ================= NAV LINKS ================= */

const navLinks = [
  { label: "Home", id: "home" },
  { label: "Skills", id: "skills" },
  { label: "Experience", id: "experience" },
  { label: "Education", id: "education" },
  { label: "Projects", id: "projects" },
  { label: "Websites", id: "websites" },
  { label: "Certificates", id: "certificates" },
  { label: "Contact", id: "contact" },
];

/* Announcement bar height offset */
const BAR_H = 36;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  /* Detect scroll for nav shadow intensity */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Active section highlight */
  useEffect(() => {
    const sections = navLinks.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  function scrollTo(id: string) {
    setOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = (window as Window & { __lenis?: { scrollTo: (el: HTMLElement, opts: { offset: number; duration: number }) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(el, { offset: -(64 + BAR_H), duration: 1.1 });
      return;
    }
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      {/* ================= DESKTOP NAV ================= */}
      <Box
        component="header"
        sx={{
          position: "fixed",
          top: `${BAR_H}px`,
          left: 0,
          right: 0,
          zIndex: 1300,
          height: 64,
          display: "flex",
          alignItems: "center",
          px: { xs: 2, md: 5 },
          justifyContent: "space-between",
          background: scrolled
            ? "rgba(5, 5, 5, 0.82)"
            : "rgba(5, 5, 5, 0.55)",
          backdropFilter: "blur(20px) saturate(140%)",
          WebkitBackdropFilter: "blur(20px) saturate(140%)",
          borderBottom: "1px solid rgba(0,200,150,0.13)",
          boxShadow: scrolled
            ? "0 8px 32px rgba(0,0,0,0.5), 0 1px 0 rgba(255,107,0,0.08) inset"
            : "none",
          transition: "background 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        {/* LOGO */}
        <Typography
          onClick={() => scrollTo("home")}
          sx={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontWeight: 800,
            fontSize: { xs: 18, md: 21 },
            letterSpacing: "-0.02em",
            cursor: "pointer",
            background: "linear-gradient(135deg, #00C896 0%, #00E5B0 60%, #00C896 100%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "none",
            transition: "background-position 0.4s ease",
            "&:hover": {
              backgroundPosition: "right center",
            },
          }}
        >
          Chirag.dev
        </Typography>

        {/* DESKTOP LINKS */}
        <Stack
          direction="row"
          spacing={0.5}
          sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
        >
          {navLinks.map((link) => (
            <Button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              sx={{
                color: active === link.id ? "#00C896" : "rgba(255,255,255,0.72)",
                fontWeight: active === link.id ? 700 : 400,
                fontSize: "0.82rem",
                letterSpacing: "0.02em",
                px: 1.5,
                py: 0.8,
                minWidth: 0,
                borderRadius: 2,
                position: "relative",
                transition: "color 0.2s ease, background 0.2s ease",
                "&:hover": {
                  color: "#00C896",
                  background: "rgba(0,200,150,0.08)",
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: 4,
                  left: "50%",
                  transform: active === link.id ? "translateX(-50%) scaleX(1)" : "translateX(-50%) scaleX(0)",
                  width: "60%",
                  height: "1.5px",
                  background: "#00C896",
                  borderRadius: 99,
                  transition: "transform 0.25s ease",
                },
                "&:hover::after": {
                  transform: "translateX(-50%) scaleX(1)",
                },
              }}
            >
              {link.label}
            </Button>
          ))}

          {/* HIRE ME */}
          <Button
            onClick={() => scrollTo("contact")}
            variant="outlined"
            sx={{
              ml: 1.5,
              borderColor: "rgba(0,200,150,0.6)",
              color: "#00C896",
              fontWeight: 700,
              fontSize: "0.82rem",
              letterSpacing: "0.04em",
              px: 2.2,
              py: 0.8,
              borderRadius: 99,
              "&:hover": {
                background: "rgba(0,200,150,0.12)",
                borderColor: "#00C896",
                boxShadow: "0 0 20px rgba(0,200,150,0.18)",
              },
            }}
          >
            Hire Me
          </Button>

          {/* ADMIN */}
          <Button
            component={Link}
            href="/admin"
            sx={{
              color: "rgba(255,255,255,0.38)",
              fontWeight: 400,
              fontSize: "0.75rem",
              ml: 0.5,
              "&:hover": { color: "rgba(255,255,255,0.65)" },
            }}
          >
            Admin
          </Button>
        </Stack>

        {/* MOBILE MENU ICON */}
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            display: { xs: "flex", md: "none" },
            color: "#00C896",
            border: "1px solid rgba(0,200,150,0.3)",
            borderRadius: 2,
            p: 0.6,
          }}
        >
          <MenuIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* ================= MOBILE DRAWER ================= */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            background: "rgba(6, 6, 6, 0.96)",
            backdropFilter: "blur(40px)",
            borderLeft: "1px solid rgba(0,200,150,0.15)",
            width: 272,
          },
        }}
      >
        <Box sx={{ p: 3, height: "100%" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: 18,
                background: "linear-gradient(135deg, #00C896, #00E5B0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Chirag.dev
            </Typography>
            <IconButton onClick={() => setOpen(false)} sx={{ color: "rgba(255,255,255,0.5)", p: 0.5 }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          <Stack spacing={0.5}>
            {navLinks.map((link) => (
              <Button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                sx={{
                  justifyContent: "flex-start",
                  color: active === link.id ? "#00C896" : "rgba(255,255,255,0.75)",
                  fontWeight: active === link.id ? 700 : 400,
                  fontSize: "0.95rem",
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  background: active === link.id ? "rgba(255,107,0,0.08)" : "transparent",
                  "&:hover": { color: "#00C896", background: "rgba(0,200,150,0.06)" },
                }}
              >
                {link.label}
              </Button>
            ))}

            <Box sx={{ mt: 2, pt: 2, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <Button
                onClick={() => scrollTo("contact")}
                variant="contained"
                fullWidth
                sx={{
                  background: "linear-gradient(90deg, #00C896, #00E5B0)",
                  color: "#111",
                  fontWeight: 800,
                  borderRadius: 99,
                  py: 1.2,
                }}
              >
                Hire Me
              </Button>
              <Button
                component={Link}
                href="/admin"
                fullWidth
                sx={{
                  mt: 1,
                  color: "rgba(255,255,255,0.35)",
                  fontWeight: 400,
                  fontSize: "0.8rem",
                  "&:hover": { color: "rgba(255,255,255,0.6)" },
                }}
              >
                Admin
              </Button>
            </Box>
          </Stack>
        </Box>
      </Drawer>

      {/* NAVBAR SPACER: announcement bar (36) + nav (64) */}
      <Box height={`${BAR_H + 64}px`} />
    </>
  );
}
