"use client";

import { Box, Typography, Button, Stack } from "@mui/material";
import { motion } from "framer-motion";

export default function ResumeCTA() {
  return (
    <Box
      py={10}
      textAlign="center"
      component={motion.div}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Typography variant="h4" fontWeight={600} mb={2}>
        Want to know more?
      </Typography>

      <Typography color="gray" mb={4}>
        Download my resume or get in touch with me directly.
      </Typography>

      <Stack direction="row" spacing={2} justifyContent="center">
        <Button
          variant="contained"
          size="large"
          href="/resume.pdf"
          target="_blank"
        >
          Download Resume
        </Button>

        <Button
          variant="outlined"
          size="large"
          href="#contact"
        >
          Contact Me
        </Button>
      </Stack>
    </Box>
  );
}
