"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { stats } from "@/lib/data";

function AnimatedStat({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.floor(eased * value));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass holo-border rounded-2xl p-6 text-center"
    >
      <p className="font-[family-name:var(--font-orbitron)] text-3xl font-bold text-white md:text-4xl">
        {count.toLocaleString()}
        <span className="text-[var(--neon-blue)]">{suffix}</span>
      </p>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
        {label}
      </p>
    </motion.div>
  );
}

export function AboutSection() {
  const tools = ["Ae", "Pr", "Fi", "Ps", "Bl", "Fr"];

  return (
    <section id="about" className="section-pad relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a18]/50 to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          label="About"
          title="I design experiences, not just visuals."
          subtitle="Blending cinematic motion with human-centered interfaces — every pixel serves a story."
        />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-lg leading-relaxed text-[var(--text-muted)]"
          >
            <p>
              I&apos;m <span className="text-white">Swayam</span> — a visual architect
              operating at the intersection of film, interface, and emotion. From
              neon-drenched brand films to operating-system-level UI, I build worlds
              that feel inevitable.
            </p>
            <p>
              My process merges editorial precision with design systems thinking.
              Every project starts with narrative — then motion, then craft.
            </p>
            <div className="glass inline-flex flex-wrap gap-3 rounded-xl p-4">
              {tools.map((t, i) => (
                <motion.span
                  key={t}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 2 + i * 0.3, delay: i * 0.2 }}
                  className="flex h-12 w-12 items-center justify-center rounded-lg border border-[var(--neon-blue)]/20 bg-[var(--neon-blue)]/5 font-mono text-xs text-[var(--neon-blue)]"
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <AnimatedStat key={s.label} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
