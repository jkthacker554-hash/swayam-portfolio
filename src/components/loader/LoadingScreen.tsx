"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { bootMessages, terminalLines } from "@/lib/data";

interface LoadingScreenProps {
  onComplete: () => void;
}

const NAME = "RONAK THACKER";

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [terminalIndex, setTerminalIndex] = useState(0);
  const [assembledLetters, setAssembledLetters] = useState(0);
  const [phase, setPhase] = useState<"boot" | "reveal" | "exit">("boot");
  const logoRef = useRef<HTMLHeadingElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + Math.random() * 7 + 2, 100);
        if (next >= 20 && messageIndex < 1) setMessageIndex(1);
        if (next >= 45 && messageIndex < 2) setMessageIndex(2);
        if (next >= 70 && messageIndex < 3) setMessageIndex(3);
        if (next >= 100) {
          clearInterval(interval);
          setPhase("reveal");
          return 100;
        }
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [messageIndex]);

  useEffect(() => {
    if (phase !== "boot") return;
    const t = setInterval(() => {
      setTerminalIndex((i) => (i + 1) % terminalLines.length);
    }, 900);
    return () => clearInterval(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "boot" || progress < 30) return;
    const t = setInterval(() => {
      setAssembledLetters((n) => Math.min(n + 1, NAME.length));
    }, 80);
    return () => clearInterval(t);
  }, [phase, progress]);

  useEffect(() => {
    if (phase !== "reveal") return;

    const tl = gsap.timeline({
      onComplete: () => {
        setPhase("exit");
        setTimeout(onComplete, 700);
      },
    });

    if (logoRef.current) {
      tl.fromTo(
        logoRef.current,
        { scale: 0.85, opacity: 0, filter: "blur(24px)" },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power4.out",
        }
      );
    }

    if (scanRef.current) {
      tl.fromTo(
        scanRef.current,
        { top: "0%" },
        { top: "100%", duration: 1.4, ease: "power2.inOut" },
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
          exit={{ opacity: 0, scale: 1.08, filter: "blur(40px)" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[20000] flex flex-col items-center justify-center overflow-hidden bg-[#010104]"
        >
          <div className="absolute inset-0 grid-bg opacity-50" />

          {/* Matrix-style rain columns */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            {Array.from({ length: 24 }).map((_, col) => (
              <motion.div
                key={col}
                className="absolute top-0 w-px bg-gradient-to-b from-transparent via-[var(--neon-cyan)] to-transparent"
                style={{ left: `${(col / 24) * 100}%`, height: "40%" }}
                animate={{ y: ["-100%", "300%"] }}
                transition={{
                  duration: 2 + (col % 5) * 0.4,
                  repeat: Infinity,
                  delay: col * 0.1,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          <div className="absolute inset-0">
            {Array.from({ length: 60 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-px w-px rounded-full bg-[var(--neon-blue)]"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{ opacity: [0, 1, 0], scale: [0, 2, 0] }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <div
            ref={scanRef}
            className="pointer-events-none absolute left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[var(--neon-cyan)] to-transparent opacity-70 shadow-[0_0_30px_var(--neon-blue)]"
            style={{ top: phase === "reveal" ? undefined : "25%" }}
          />

          <div className="scanlines absolute inset-0 opacity-25" />

          {/* Cyber panels */}
          <div className="absolute left-6 top-6 hidden w-48 rounded-lg border border-[var(--neon-blue)]/20 bg-black/40 p-4 font-mono text-[9px] text-[var(--neon-cyan)]/80 md:block">
            <p className="mb-2 text-[var(--neon-purple)]">SYS.BOOT</p>
            {terminalLines.slice(0, terminalIndex + 1).map((line) => (
              <p key={line} className="mb-1 opacity-70">
                {line}
              </p>
            ))}
          </div>

          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            {phase === "boot" && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-6 font-mono text-[10px] uppercase tracking-[0.5em] text-[var(--neon-blue)]"
                >
                  RONAK.EXE — AI SYSTEM BOOT
                </motion.div>

                <h1 className="mb-4 font-[family-name:var(--font-orbitron)] text-3xl font-black uppercase tracking-[0.15em] text-white md:text-5xl">
                  {NAME.split("").map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                      animate={
                        i < assembledLetters
                          ? { opacity: 1, y: 0, filter: "blur(0px)" }
                          : { opacity: 0.15, y: 0 }
                      }
                      className="inline-block"
                      style={{
                        textShadow:
                          i < assembledLetters
                            ? "0 0 20px rgba(0,212,255,0.6)"
                            : "none",
                      }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </h1>

                <motion.p
                  key={messageIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-2 font-mono text-xs uppercase tracking-[0.35em] text-[var(--neon-cyan)]"
                >
                  {bootMessages[messageIndex]}...
                </motion.p>

                <p className="mb-8 font-mono text-[10px] text-[var(--text-muted)]">
                  {terminalLines[terminalIndex]}
                </p>

                <div className="w-80 max-w-full">
                  <div className="mb-2 flex justify-between font-mono text-[10px] text-[var(--neon-blue)]">
                    <span>LOADING EXPERIENCE</span>
                    <span>{Math.floor(progress)}%</span>
                  </div>
                  <div className="h-[3px] overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      className="loader-bar-glow h-full rounded-full bg-gradient-to-r from-[var(--neon-blue)] via-[var(--neon-purple)] to-[var(--neon-cyan)]"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </>
            )}

            {phase === "reveal" && (
              <h1
                ref={logoRef}
                className="text-bloom font-[family-name:var(--font-orbitron)] text-5xl font-black uppercase tracking-[0.2em] text-white md:text-7xl"
              >
                RONAK
                <br />
                <span className="text-[var(--neon-cyan)]">THACKER</span>
              </h1>
            )}
          </div>

          <div className="absolute bottom-8 left-8 font-mono text-[9px] text-[var(--text-muted)]">
            <p>KERNEL: CREATIVE_ENGINE</p>
            <p>AI_MODULE: ACTIVE</p>
            <p>STATUS: {phase === "boot" ? "INITIALIZING" : "READY"}</p>
          </div>
          <div className="absolute bottom-8 right-8 font-mono text-[9px] text-[var(--neon-purple)]/70">
            <p>© RONAK.EXE · INDIA</p>
          </div>
        </motion.div>
      )}

      {phase === "exit" && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[19999] origin-top bg-[var(--bg)]"
        />
      )}
    </AnimatePresence>
  );
}
