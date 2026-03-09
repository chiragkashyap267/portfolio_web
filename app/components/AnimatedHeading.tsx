"use client";

import { motion } from "framer-motion";
import { Typography } from "@mui/material";

export default function AnimatedHeading({
  text,
}: {
  text: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Typography
        variant="h4"
        textAlign="center"
        fontWeight={600}
        sx={{
          background:
            "linear-gradient(90deg, #FF6B00, #fff, #FF6B00)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {text}
      </Typography>
    </motion.div>
  );
}
