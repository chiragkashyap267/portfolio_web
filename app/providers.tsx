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

// Refined easing: smooth cubic ease-out that feels natural and snappy
function smoothEase(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
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
      duration: 0.9,          // snappier — less perceived lag
      easing: smoothEase,
      smoothWheel: true,
      wheelMultiplier: 0.9,   // slightly less than native for comfort
      touchMultiplier: 1.5,   // responsive on touch/trackpad
      infinite: false,
    });

    window.__lenis = lenis;

    // Use a proper timestamp-based RAF to avoid drift and jitter
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Make anchor links (navbar) work smoothly with Lenis
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a[href^='#']");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href) return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.4 });
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.removeEventListener("click", handleAnchorClick);
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
