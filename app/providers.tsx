"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";
import BackgroundGrid from "./components/BackgroundGrid";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // 🚫 Disable Lenis on touch devices (best practice)
    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window ||
        navigator.maxTouchPoints > 0);

    if (isTouch) return;

    const lenis = new Lenis({
      duration: 1.5, // increased for smoother feel
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.2, // slightly faster response
    });

    let rafId: number;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BackgroundGrid />
      {children}
    </ThemeProvider>
  );
}
