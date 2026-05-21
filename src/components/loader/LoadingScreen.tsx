"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { bootMessages } from "@/lib/data";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [phase, setPhase] = useState<"boot" | "reveal" | "exit">("boot");
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + Math.random() * 8 + 2, 100);
        if (next >= 25 && messageIndex < 1) setMessageIndex(1);
        if (next >= 50 && messageIndex < 2) setMessageIndex(2);
        if (next >= 75 && messageIndex < 3) setMessageIndex(3);
        if (next >= 100) {
          clearInterval(interval);
          setPhase("reveal");
          return 100;
        }
        return next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [messageIndex]);

  useEffect(() => {
    if (phase !== "reveal") return;

    const tl = gsap.timeline({
      onComplete: () => {
        setPhase("exit");
        setTimeout(onComplete, 800);
      },
    });

    if (logoRef.current) {
      tl.fromTo(
        logoRef.current,
        { scale: 0.8, opacity: 0, filter: "blur(20px)" },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power4.out",
        }
      );
    }

    if (scanRef.current) {
      tl.fromTo(
        scanRef.current,
        { top: "0%" },
        { top: "100%", duration: 1.5, ease: "power2.inOut" },
        0
      );
    }

    return () => {
      tl.kill();
    };
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          ref={containerRef}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(30px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[20000] flex flex-col items-center justify-center overflow-hidden bg-[#020206]"
        >
          {/* Grid */}
          <div className="absolute inset-0 grid-bg opacity-40" />

          {/* Particles CSS */}
          <div className="absolute inset-0">
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-px w-px rounded-full bg-[var(--neon-blue)]"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 2, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Scan line */}
          <div
            ref={scanRef}
            className="pointer-events-none absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--neon-blue)] to-transparent opacity-60"
            style={{ top: phase === "reveal" ? undefined : "30%" }}
          />

          {/* Horizontal scan lines overlay */}
          <div className="scanlines absolute inset-0 opacity-30" />

          {/* Glitch bars */}
          <motion.div
            animate={{ x: [-100, 100, -50, 0] }}
            transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 2 }}
            className="absolute left-0 right-0 top-1/3 h-1 bg-[var(--neon-red)]/30 mix-blend-screen"
          />

          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            {phase === "boot" && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-8 font-mono text-[10px] uppercase tracking-[0.5em] text-[var(--neon-blue)]"
                >
                  SWAYAM SYSTEMS v2.0
                </motion.div>

                <motion.h1
                  className="glitch-active mb-6 font-[family-name:var(--font-orbitron)] text-5xl font-black uppercase tracking-[0.3em] text-white md:text-7xl"
                  animate={{
                    textShadow: [
                      "0 0 20px rgba(0,212,255,0.5)",
                      "-2px 0 #ff2d55, 2px 0 #00d4ff",
                      "0 0 40px rgba(168,85,247,0.6)",
                    ],
                  }}
                  transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 1.5 }}
                >
                  SWAYAM
                </motion.h1>

                <motion.p
                  key={messageIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-10 font-mono text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]"
                >
                  {bootMessages[messageIndex]}...
                </motion.p>

                {/* Progress */}
                <div className="w-72 max-w-full">
                  <div className="mb-2 flex justify-between font-mono text-[10px] text-[var(--neon-blue)]">
                    <span>LOADING</span>
                    <span>{Math.floor(progress)}%</span>
                  </div>
                  <div className="h-[2px] overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      className="loader-bar-glow h-full rounded-full bg-gradient-to-r from-[var(--neon-blue)] via-[var(--neon-purple)] to-[var(--neon-red)]"
                      style={{ width: `${progress}%` }}
                      transition={{ ease: "easeOut" }}
                    />
                  </div>
                </div>
              </>
            )}

            {phase === "reveal" && (
              <h1
                ref={logoRef}
                className="text-bloom font-[family-name:var(--font-orbitron)] text-6xl font-black uppercase tracking-[0.4em] text-white md:text-8xl"
              >
                SWAYAM
              </h1>
            )}
          </div>

          {/* Corner UI */}
          <div className="absolute bottom-8 left-8 font-mono text-[9px] text-[var(--text-muted)]">
            <p>KERNEL: VISUAL_ENGINE</p>
            <p>STATUS: {phase === "boot" ? "INITIALIZING" : "READY"}</p>
          </div>
          <div className="absolute bottom-8 right-8 font-mono text-[9px] text-[var(--neon-purple)]/70">
            <p>© SWAYAM.EXE</p>
          </div>
        </motion.div>
      )}

      {phase === "exit" && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[19999] origin-top bg-[var(--bg)]"
        />
      )}
    </AnimatePresence>
  );
}
