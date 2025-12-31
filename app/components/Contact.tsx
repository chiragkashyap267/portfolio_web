"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE!,
        form,
        process.env.NEXT_PUBLIC_EMAILJS_KEY!
      );

      form.reset();
      alert("Message sent successfully ✅");
    } catch (error) {
      console.error(error);
      alert("Failed to send message ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      id="contact"
      py={10}
      px={{ xs: 2, md: 4 }}
    >
      <Typography
        variant="h4"
        textAlign="center"
        mb={6}
        fontWeight={600}
      >
        Contact Me
      </Typography>

      <Paper
        component={motion.div}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        sx={{
          maxWidth: 600,
          mx: "auto",
          p: 4,
          border: "1px solid #222",
          background: "linear-gradient(145deg, #111, #0a0a0a)",
        }}
      >
        <form onSubmit={sendEmail}>
          <Stack spacing={3}>
            <TextField
              name="from_name"
              label="Your Name"
              required
              fullWidth
            />

            <TextField
              name="from_email"
              label="Your Email"
              type="email"
              required
              fullWidth
            />

            <TextField
              name="message"
              label="Message"
              multiline
              rows={4}
              required
              fullWidth
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
