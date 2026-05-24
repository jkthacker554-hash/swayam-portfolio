"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";

const filters = ["All", "Video", "UI/UX"] as const;

export function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const filtered = projects.filter((p) => {
    if (filter === "All") return true;
return true;	  });

  return (
    <section id="featured" className="section-pad relative overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="Featured"
          title="Selected Works"
          subtitle="Curated experiences across motion and interface design."
        />

        <div className="mb-12 flex flex-wrap gap-3">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              data-cursor
              className={cn(
                "rounded-full px-6 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-all",
                filter === f
                  ? "glass-strong text-[var(--neon-blue)]"
                  : "text-[var(--text-muted)] hover:text-white"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-2xl"
                data-cursor
              >
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br",
                    project.gradient
                  )}
                />
                <div className="absolute inset-0 bg-[#030308]/40 transition-opacity group-hover:opacity-20" />

                {/* Dynamic light ring */}
                <div className="absolute -inset-px rounded-2xl opacity-0 transition-opacity group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(0,212,255,0.4), rgba(168,85,247,0.4), rgba(255,45,85,0.3))",
                    filter: "blur(1px)",
                  }}
                />

                <div className="glass-strong absolute inset-4 flex flex-col justify-end rounded-xl p-6 opacity-90 transition-all group-hover:inset-3">
                  <span className="mb-2 font-mono text-[9px] uppercase tracking-widest text-[var(--neon-blue)]">
                    {project.category}
                  </span>
                  <h3 className="font-[family-name:var(--font-orbitron)] text-xl font-bold uppercase tracking-wide text-white">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--text-muted)] opacity-0 transition-opacity group-hover:opacity-100">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 px-3 py-1 font-mono text-[9px] uppercase text-[var(--text-muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Play icon for video */}
                             </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
