"use client";

import {
  Box,
  Typography,
  Grid,
} from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/* ================= TYPES ================= */

type Certificate = {
  title: string;
  image: string;
  link?: string;
};

/* ================= COMPONENT ================= */

export default function Certificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/certificates", {
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to load certificates");

        const data = await res.json();
        setCertificates(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Certificates fetch error:", err);
        setCertificates([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setActiveImage(null);
      }
    }

    if (activeImage) {
      window.addEventListener("keydown", onKey);
    }

    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [activeImage]);



  return (
    <Box id="certificates" py={10} px={{ xs: 2, md: 4 }}>
      <Typography
        variant="h4"
        textAlign="center"
        mb={6}
        fontWeight={600}
        sx={{ fontSize: { xs: "1.8rem", md: "2.125rem" } }}
      >
        Certifications & Licenses
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {loading && (
          <Typography color="gray">
            Loading certificates...
          </Typography>
        )}

        {!loading && certificates.length === 0 && (
          <Typography color="gray">
            No certificates added yet.
          </Typography>
        )}

        {certificates.map((cert, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
            <CertificateCard
              cert={cert}
              onOpen={() => setActiveImage(cert.image)}
            />
          </Grid>
        ))}
      </Grid>

      {/* ================= LIGHTBOX ================= */}
      {activeImage && (
        <Box
          onClick={() => setActiveImage(null)}
          sx={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
            cursor: "zoom-out",
          }}
        >
          <motion.img
            src={activeImage}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: 8,
              border: "2px solid #FF6B00",
              background: "#000",
            }}
          />
        </Box>
      )}
    </Box>
  );
}

/* ================= CERTIFICATE CARD ================= */

function CertificateCard({
  cert,
  onOpen,
}: {
  cert: Certificate;
  onOpen: () => void;
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        onClick={onOpen}
        sx={{
          cursor: "zoom-in",
          borderRadius: 4,
          overflow: "hidden",
          background:
            "linear-gradient(145deg,#0f0f0f,#111)",
          border: "1px solid #222",
          transition: "0.4s ease",
          "&:hover": {
            boxShadow:
              "0 0 40px rgba(255,107,0,0.45)",
            borderColor: "#FF6B00",
          },
        }}
      >
        {/* IMAGE */}
        <Box
          component="img"
          src={cert.image}
          alt={cert.title}
          loading="lazy"
          sx={{
            width: "100%",
            height: 220,
            objectFit: "contain",
            backgroundColor: "#000",
            p: 2,
          }}
        />

        {/* TITLE */}
        <Box p={2}>
          <Typography
            fontWeight={600}
            color="white"
            textAlign="center"
          >
            {cert.title}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
}
