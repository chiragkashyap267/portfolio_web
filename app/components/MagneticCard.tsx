"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

export default function MagneticCard({
  children,
}: {
  children: ReactNode;
}) {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(pointer: fine) and (min-width: 1024px)").matches;
  });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 160, damping: 22, mass: 0.6 });
  const smoothY = useSpring(y, { stiffness: 160, damping: 22, mass: 0.6 });

  const rotateX = useTransform(smoothY, [-36, 36], [2.4, -2.4]);
  const rotateY = useTransform(smoothX, [-36, 36], [-2.4, 2.4]);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    const update = (event: MediaQueryListEvent) => setEnabled(event.matches);
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!enabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  if (!enabled) {
    return <div style={{ width: "100%" }}>{children}</div>;
  }

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        width: "100%",
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      transition={{
        type: "spring",
        stiffness: 170,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  );
}
