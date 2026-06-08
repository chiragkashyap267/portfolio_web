"use client";

import { useEffect, useState } from "react";

export default function BackgroundGrid() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render on server — prevents hydration mismatch from
  // the multi-line template literal backgroundImage value
  if (!mounted) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        backgroundImage:
          "linear-gradient(rgba(0,200,150,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,150,0.04) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(circle at center, black 40%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(circle at center, black 40%, transparent 70%)",
        pointerEvents: "none",
      }}
    />
  );
}
