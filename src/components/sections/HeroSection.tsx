"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SplitText } from "@/components/ui/SplitText";
import { useMouse } from "@/hooks/useMouse";
import {
  heroHeadline,
  heroSubheadline,
  floatingCodeSnippets,
  siteConfig,
} from "@/lib/data";

const ParticleField = dynamic(
  () => import("@/components/effects/ParticleField").then((m) => m.ParticleField),
  { ssr: false }
);

const GlowSphere = dynamic(
  () => import("@/components/effects/GlowSphere").then((m) => m.GlowSphere),
  { ssr: false }
);

export function HeroSection() {
  const { normalized } = useMouse();
  const mouseX = useMotionValue(normalized.x);
  const mouseY = useMotionValue(normalized.y);
  const headlineX = useTransform(mouseX, [-1, 1], [-8, 8]);
  const headlineY = useTransform(mouseY, [-1, 1], [-6, 6]);

  useEffect(() => {
    mouseX.set(normalized.x);
    mouseY.set(normalized.y);
  }, [normalized.x, normalized.y, mouseX, mouseY]);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-24"
    >
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 30%, rgba(0,212,255,0.1) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 85% 70%, rgba(168,85,247,0.12) 0%, transparent 50%)",
        }}
      />

      <ParticleField mouse={normalized} className="opacity-60" />
      <GlowSphere mouse={normalized} className="opacity-90" />

      <motion.div
        className="pointer-events-none absolute h-[600px] w-[600px] rounded-full blur-[140px]"
        style={{
          left: `calc(50% + ${normalized.x * 120}px)`,
          top: `calc(35% + ${normalized.y * 100}px)`,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(0,212,255,0.18) 0%, rgba(168,85,247,0.1) 45%, transparent 70%)",
        }}
      />

      {floatingCodeSnippets.map((code, i) => (
        <motion.div
          key={code}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5, y: [0, -12, 0] }}
          transition={{
            opacity: { delay: 2 + i * 0.2 },
            y: { repeat: Infinity, duration: 4 + i, delay: i * 0.5 },
          }}
          className="glass absolute hidden max-w-[200px] rounded-lg px-3 py-2 font-mono text-[9px] text-[var(--neon-cyan)]/70 lg:block"
          style={{
            top: `${18 + i * 14}%`,
            left: i % 2 === 0 ? "6%" : undefined,
            right: i % 2 === 1 ? "6%" : undefined,
          }}
        >
          {code}
        </motion.div>
      ))}

      {[
        { label: "AI.ASSIST", pos: "top-[22%] left-[10%]" },
        { label: "REACT.SYS", pos: "top-[28%] right-[8%]" },
        { label: "SHIP.MODE", pos: "bottom-[28%] left-[12%]" },
        { label: "17 · INDIA", pos: "bottom-[32%] right-[10%]" },
      ].map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8 + i * 0.15 }}
          className={`glass absolute hidden rounded-lg px-4 py-2 font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--neon-blue)]/80 md:block ${item.pos}`}
        >
          {item.label}
        </motion.div>
      ))}

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mb-6 font-mono text-[10px] uppercase tracking-[0.5em] text-[var(--neon-cyan)]"
        >
          Neural Interface Online — Welcome
        </motion.p>

        <motion.div style={{ x: headlineX, y: headlineY }}>
          <h1 className="font-[family-name:var(--font-orbitron)] text-[clamp(1.75rem,5.5vw,3.25rem)] font-black uppercase leading-[1.1] tracking-[0.06em] text-white">
            <SplitText text={heroHeadline} as="span" delay={1.3} />
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg"
        >
          {heroSubheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3 md:gap-4"
        >
          <MagneticButton href="#projects">View Projects</MagneticButton>
          <MagneticButton href="#contact">Hire Me</MagneticButton>
          <MagneticButton href={siteConfig.resumeUrl} className="!text-[var(--neon-purple)]">
            Download Resume
          </MagneticButton>
          <MagneticButton href="#projects" className="!border-[var(--neon-cyan)]/30">
            Explore Universe
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="mt-20 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--text-muted)]">
            Scroll to enter the mind
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="h-10 w-px bg-gradient-to-b from-[var(--neon-cyan)] to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
