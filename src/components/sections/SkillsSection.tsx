"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skills } from "@/lib/data";

export function SkillsSection() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="skills" className="section-pad relative">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="Skills"
          title="Interactive Skills Lab"
          subtitle="Holographic proficiency meters — from core craft to AI-augmented development."
          align="center"
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              onHoverStart={() => setHovered(skill.name)}
              onHoverEnd={() => setHovered(null)}
              className="glass holo-border group relative overflow-hidden rounded-2xl p-6"
              data-cursor
            >
              {/* Holographic reflection */}
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity group-hover:opacity-60"
                style={{ background: "var(--neon-blue)" }}
              />

              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="font-[family-name:var(--font-orbitron)] text-sm font-bold uppercase tracking-wide text-white">
                    {skill.name}
                  </h3>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--neon-purple)]">
                    {skill.category}
                  </span>
                </div>
                <span className="font-mono text-lg font-bold text-[var(--neon-blue)]">
                  {skill.level}%
                </span>
              </div>

              <div className="h-1 overflow-hidden rounded-full bg-white/5">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[var(--neon-blue)] via-[var(--neon-purple)] to-[var(--neon-red)]"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.2 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    boxShadow: hovered === skill.name ? "0 0 20px rgba(0,212,255,0.6)" : "none",
                  }}
                />
              </div>

              {/* Animated grid dots */}
              <div className="mt-4 flex gap-1">
                {Array.from({ length: 8 }).map((_, j) => (
                  <motion.div
                    key={j}
                    className="h-1 w-1 rounded-full bg-[var(--neon-blue)]/30"
                    animate={{
                      opacity: j < Math.floor(skill.level / 12.5) ? 1 : 0.2,
                      scale: hovered === skill.name && j < Math.floor(skill.level / 12.5) ? [1, 1.5, 1] : 1,
                    }}
                    transition={{ repeat: hovered === skill.name ? Infinity : 0, duration: 0.8, delay: j * 0.05 }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
