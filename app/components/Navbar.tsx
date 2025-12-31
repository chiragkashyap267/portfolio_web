"use client";

import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useState } from "react";

/* ================= NAV LINKS ================= */

const navLinks = [
  { label: "Home", id: "home" },
  { label: "Skills", id: "skills" },
  { label: "Experience", id: "experience" },
  { label: "Education", id: "education" },
  { label: "Projects", id: "projects" },
  { label: "Certificates", id: "certificates" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  function scrollTo(id: string) {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      {/* ================= DESKTOP NAV ================= */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: "rgba(10,10,10,0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #222",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* LOGO */}
          <Typography
            fontWeight={700}
            fontSize={20}
            sx={{
              color: "#FFD400",
              cursor: "pointer",
            }}
            onClick={() => scrollTo("home")}
          >
            Chirag.dev
          </Typography>

          {/* DESKTOP LINKS */}
          <Stack
            direction="row"
            spacing={3}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            {navLinks.map((link) => (
              <Button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                sx={{
                  color: "#ddd",
                  fontWeight: 500,
                  "&:hover": {
                    color: "#FFD400",
                  },
                }}
              >
                {link.label}
              </Button>
            ))}

            {/* ADMIN */}
            <Button
              component={Link}
              href="/admin"
              variant="outlined"
              sx={{
                borderColor: "#FFD400",
                color: "#FFD400",
                "&:hover": {
                  backgroundColor: "rgba(255,212,0,0.12)",
                  borderColor: "#FFD400",
                },
              }}
            >
              Admin
            </Button>
          </Stack>

          {/* MOBILE MENU ICON */}
          <IconButton
            onClick={() => setOpen(true)}
            sx={{
              display: { xs: "block", md: "none" },
              color: "#FFD400",
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* ================= MOBILE DRAWER ================= */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box
          width={260}
          height="100%"
          sx={{
            background: "#0b0b0b",
            p: 3,
          }}
        >
          <Stack spacing={2}>
            {navLinks.map((link) => (
              <Button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                sx={{
                  justifyContent: "flex-start",
                  color: "#ddd",
                  fontWeight: 500,
                  "&:hover": {
                    color: "#FFD400",
                  },
                }}
              >
                {link.label}
              </Button>
            ))}

            <Box mt={2} />

            {/* ADMIN */}
            <Button
              component={Link}
              href="/admin"
              variant="outlined"
              sx={{
                borderColor: "#FFD400",
                color: "#FFD400",
              }}
            >
              Admin
            </Button>
          </Stack>
        </Box>
      </Drawer>

      {/* NAVBAR SPACER */}
      <Box height={72} />
    </>
  );
}
