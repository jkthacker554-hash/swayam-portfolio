"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useMouse } from "@/hooks/useMouse";

const ParticleField = dynamic(
  () => import("@/components/effects/ParticleField").then((m) => m.ParticleField),
  { ssr: false }
);

export function HeroSection() {
  const { normalized } = useMouse();
  const mouseX = useMotionValue(normalized.x);
  const mouseY = useMotionValue(normalized.y);

  const titleX = useTransform(mouseX, [-1, 1], [-15, 15]);
  const titleY = useTransform(mouseY, [-1, 1], [-10, 10]);

  useEffect(() => {
    mouseX.set(normalized.x);
    mouseY.set(normalized.y);
  }, [normalized.x, normalized.y, mouseX, mouseY]);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,212,255,0.08) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 60%, rgba(168,85,247,0.1) 0%, transparent 50%)",
        }}
      />

      <ParticleField mouse={normalized} className="opacity-70" />

      {/* Mouse-reactive glow */}
      <motion.div
        className="pointer-events-none absolute h-[500px] w-[500px] rounded-full blur-[120px]"
        style={{
          left: `calc(50% + ${normalized.x * 100}px)`,
          top: `calc(40% + ${normalized.y * 80}px)`,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(0,212,255,0.15) 0%, rgba(168,85,247,0.08) 50%, transparent 70%)",
        }}
      />

      {/* Floating UI elements */}
      {[
        { top: "20%", left: "8%", label: "REC ●", delay: 0 },
        { top: "30%", right: "10%", label: "4K · 60FPS", delay: 0.2 },
        { bottom: "25%", left: "12%", label: "UI/UX SYS", delay: 0.4 },
        { bottom: "30%", right: "8%", label: "MOTION ON", delay: 0.6 },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5 + item.delay }}
          className="glass absolute hidden rounded-lg px-4 py-2 font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--neon-blue)]/80 md:block"
          style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom }}
          whileHover={{ scale: 1.05, borderColor: "rgba(0,212,255,0.4)" }}
        >
          {item.label}
        </motion.div>
      ))}

      <div className="relative z-10 px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="mb-6 font-mono text-[10px] uppercase tracking-[0.5em] text-[var(--neon-blue)]"
        >
          System Online — Welcome
        </motion.p>

        <motion.h1
          style={{ x: titleX, y: titleY }}
          initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ delay: 1.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-bloom rgb-split cursor-default font-[family-name:var(--font-orbitron)] text-[clamp(4rem,18vw,14rem)] font-black leading-[0.85] tracking-[0.08em] text-white"
        >
          SWAYAM
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
          className="mx-auto mt-8 max-w-2xl font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--text-muted)] md:text-xs"
        >
          Video Editor • UI/UX Designer • Visual Storyteller
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton href="#featured">Explore Work</MagneticButton>
          <MagneticButton href="#contact" className="!border-[var(--neon-purple)]/30">
            Connect
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="mt-20 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--text-muted)]">
            Scroll to enter
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="h-8 w-px bg-gradient-to-b from-[var(--neon-blue)] to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
