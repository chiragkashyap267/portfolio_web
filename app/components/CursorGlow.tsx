"use client";

import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export default function CursorGlow() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(pointer: fine) and (min-width: 1024px)").matches;
  });

  // Direct motion values — no spring physics, no continuous RAF overhead
  const x = useMotionValue(-220);
  const y = useMotionValue(-220);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    const update = (event: MediaQueryListEvent) => setEnabled(event.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX - 70);
      y.set(e.clientY - 70);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [enabled, x, y]);

  if (!enabled || reduceMotion) return null;

  return (
    <motion.div
      style={{
        x,
        y,
        position: "fixed",
        width: 140,
        height: 140,
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 0,
        background: "radial-gradient(circle, rgba(255,107,0,0.18), transparent 62%)",
        mixBlendMode: "screen",
        willChange: "transform",
      }}
    />
  );
}
