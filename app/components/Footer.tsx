"use client";

import { Box, Typography, Stack, IconButton } from "@mui/material";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 10,
        py: 4,
        borderTop: "1px solid #222",
        background:
          "linear-gradient(180deg, #0b0b0b, #050505)",
      }}
    >
      <Stack
        spacing={2}
        alignItems="center"
        textAlign="center"
      >
        {/* BRAND */}
        <Typography
          fontWeight={600}
          sx={{
            color: "#FF6B00",
            letterSpacing: 1,
          }}
        >
          © {new Date().getFullYear()} chiragkashyapstudios
        </Typography>

        {/* CONTACT */}
        <Stack direction="row" spacing={2}>
          {/* EMAIL */}
          <IconButton
            component="a"
            href="mailto:businesswithchirag267@gmail.com"
            sx={{
              color: "white",
              transition: "0.3s",
              "&:hover": {
                color: "#FF6B00",
                boxShadow:
                  "0 0 12px rgba(255,212,0,0.6)",
              },
            }}
          >
            <FaEnvelope />
          </IconButton>

          {/* LINKEDIN */}
          <IconButton
            component="a"
            href="https://www.linkedin.com/in/chirag-rajput-00405633b/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "white",
              transition: "0.3s",
              "&:hover": {
                color: "#FF6B00",
                boxShadow:
                  "0 0 12px rgba(255,212,0,0.6)",
              },
            }}
          >
            <FaLinkedin />
          </IconButton>
        </Stack>

        {/* EMAIL TEXT */}
        <Typography
          variant="body2"
          sx={{ color: "gray" }}
        >
          businesswithchirag267@gmail.com
        </Typography>
      </Stack>
    </Box>
  );
}
