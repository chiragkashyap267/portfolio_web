"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";
import BackgroundGrid from "./components/BackgroundGrid";
import theme from "./theme";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1,
    });

    window.__lenis = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
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
