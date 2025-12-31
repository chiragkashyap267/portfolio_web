"use client";

export default function BackgroundGrid() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        backgroundImage: `
          linear-gradient(
            rgba(255,212,0,0.05) 1px,
            transparent 1px
          ),
          linear-gradient(
            90deg,
            rgba(255,212,0,0.05) 1px,
            transparent 1px
          )
        `,
        backgroundSize: "60px 60px",
        maskImage:
          "radial-gradient(circle at center, black 40%, transparent 70%)",
        pointerEvents: "none",
      }}
    />
  );
}
