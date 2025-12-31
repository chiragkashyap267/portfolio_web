"use client";


import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CursorGlow() {
    

    
  const [pos, setPos] = useState({ x: 0, y: 0 });
  

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    
    <motion.div
      animate={{
        x: pos.x - 80,
        y: pos.y - 80,
      }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 20,
      }}
      style={{
        position: "fixed",
        width: 160,
        height: 160,
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 0,
        background:
          "radial-gradient(circle, rgba(255,212,0,0.35), transparent 60%)",
        mixBlendMode: "screen",
      }}
    />
  );
}
