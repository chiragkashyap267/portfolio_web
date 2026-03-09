"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function WelcomeOverlay() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        // Hide after 2.4 seconds
        const timer = setTimeout(() => setVisible(false), 2400);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="welcome-overlay"
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        scale: 1.04,
                        filter: "blur(12px)",
                    }}
                    transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
                    style={{ pointerEvents: visible ? "all" : "none" }}
                >
                    {/* Radial orange glow in center */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background:
                                "radial-gradient(ellipse 60% 45% at 50% 50%, rgba(255,107,0,0.12), transparent 70%)",
                            pointerEvents: "none",
                        }}
                    />

                    {/* Dot grid noise */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            backgroundImage:
                                "radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)",
                            backgroundSize: "28px 28px",
                            pointerEvents: "none",
                        }}
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 28, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 16,
                            position: "relative",
                        }}
                    >
                        {/* Brand mark line */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.55, ease: "easeOut", delay: 0.3 }}
                            style={{
                                width: 52,
                                height: 2,
                                background: "linear-gradient(90deg, transparent, #FF6B00, transparent)",
                                borderRadius: 99,
                                marginBottom: 4,
                            }}
                        />

                        {/* Main welcome text */}
                        <span
                            style={{
                                fontFamily: "var(--font-inter), system-ui, sans-serif",
                                fontSize: "clamp(13px, 2vw, 14px)",
                                fontWeight: 300,
                                letterSpacing: "0.22em",
                                textTransform: "uppercase",
                                color: "rgba(255,255,255,0.5)",
                            }}
                        >
                            Welcome to the Portfolio of
                        </span>

                        {/* Name */}
                        <span
                            style={{
                                fontFamily: "var(--font-inter), system-ui, sans-serif",
                                fontSize: "clamp(38px, 7vw, 72px)",
                                fontWeight: 800,
                                letterSpacing: "-0.03em",
                                lineHeight: 1,
                                background:
                                    "linear-gradient(135deg, #ffffff 30%, rgba(255,255,255,0.6) 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            Chirag Kashyap
                        </span>

                        {/* Role */}
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.55 }}
                            style={{
                                fontFamily: "var(--font-inter), system-ui, sans-serif",
                                fontSize: "clamp(13px, 2vw, 15px)",
                                fontWeight: 400,
                                letterSpacing: "0.12em",
                                textTransform: "uppercase",
                                color: "#FF6B00",
                            }}
                        >
                            Full Stack Developer &amp; Web Specialist
                        </motion.span>

                        {/* Loading bar */}
                        <motion.div
                            style={{
                                marginTop: 24,
                                width: 180,
                                height: 1.5,
                                background: "rgba(255,255,255,0.1)",
                                borderRadius: 99,
                                overflow: "hidden",
                            }}
                        >
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2.1, ease: "easeInOut", delay: 0.2 }}
                                style={{
                                    height: "100%",
                                    background: "linear-gradient(90deg, #FF6B00, #FFAE73)",
                                    borderRadius: 99,
                                }}
                            />
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
