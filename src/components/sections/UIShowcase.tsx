"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { uiProjects } from "@/lib/data";

export function UIShowcase() {
  return (
    <section id="ui" className="section-pad relative">
      <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-[var(--neon-purple)]/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="UI/UX"
          title="Interface Futures"
          subtitle="Product experiences rendered inside holographic device frames."
        />

        <div className="grid gap-10 md:grid-cols-2">
          {uiProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7 }}
              whileHover={{ rotateY: -5, rotateX: 5, z: 50 }}
              style={{ perspective: 1000 }}
              className="group relative"
            >
              {/* Device mockup */}
              <div className="glass-strong holo-border relative mx-auto max-w-md overflow-hidden rounded-[2rem] p-3">
                <div className="mb-3 flex items-center justify-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[var(--neon-red)]/80" />
                  <div className="h-2 w-2 rounded-full bg-yellow-400/80" />
                  <div className="h-2 w-2 rounded-full bg-green-400/80" />
                </div>

                <div
                  className="relative aspect-[9/16] overflow-hidden rounded-2xl md:aspect-[4/5]"
                  style={{
                    background: `linear-gradient(160deg, ${project.color}15 0%, #0a0a12 50%, ${project.color}08 100%)`,
                  }}
                >
                  {/* UI skeleton */}
                  <div className="absolute inset-4 flex flex-col gap-3">
                    <div className="h-3 w-1/3 rounded-full" style={{ background: `${project.color}40` }} />
                    <div className="mt-4 h-24 flex-1 rounded-xl border border-white/5" style={{ boxShadow: `0 0 40px ${project.color}20` }} />
                    <div className="flex gap-2">
                      {[1, 2, 3].map((n) => (
                        <div key={n} className="h-16 flex-1 rounded-lg bg-white/5" />
                      ))}
                    </div>
                    <div className="h-10 rounded-full" style={{ background: `linear-gradient(90deg, ${project.color}60, transparent)` }} />
                  </div>

                  <motion.div
                    className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${project.color}30, transparent 60%)`,
                    }}
                  />
                </div>
              </div>

              <div className="mt-6 text-center md:text-left">
                <h3 className="font-[family-name:var(--font-orbitron)] text-xl font-bold uppercase text-white">
                  {project.title}
                </h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[var(--neon-blue)]">
                  {project.platform}
                </p>
                <p className="mt-3 text-sm text-[var(--text-muted)]">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
