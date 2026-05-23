"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects, projectCategories } from "@/lib/data";
import { cn } from "@/lib/utils";

export function ProjectsSection() {
  const [filter, setFilter] = useState<(typeof projectCategories)[number]>("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = projects.filter((p) => {
    if (filter === "All") return true;
    if (filter === "Luxury Brand") return p.category === "Luxury Brand";
    if (filter === "AI Websites") return p.category === "AI Websites";
    if (filter === "Futuristic UI") return p.category === "Futuristic UI";
    if (filter === "Landing Pages") return p.category === "Landing Pages";
    if (filter === "Portfolios") return p.category === "Portfolios";
    return p.category === "Experimental";
  });

  return (
    <section id="projects" className="section-pad relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          label="Projects"
          title="Futuristic Showcase Lab"
          subtitle="Premium digital experiences — AI websites, luxury brands, and experimental interfaces."
        />

        <div className="mb-12 flex flex-wrap gap-2">
          {projectCategories.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              data-cursor
              className={cn(
                "rounded-full px-4 py-2 font-mono text-[9px] uppercase tracking-[0.15em] transition-all md:px-5 md:text-[10px]",
                filter === f
                  ? "glass-strong text-[var(--neon-cyan)]"
                  : "text-[var(--text-muted)] hover:text-white"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.06 }}
                className="group relative"
                data-cursor
              >
                <motion.div
                  whileHover={{ y: -10 }}
                  onClick={() =>
                    setExpanded(expanded === project.id ? null : project.id)
                  }
                  className="relative aspect-[4/5] cursor-pointer overflow-hidden rounded-2xl"
                >
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br",
                      project.gradient
                    )}
                  />
                  <div className="absolute inset-0 bg-[#030308]/50" />

                  {/* Device mockup frame */}
                  <div className="absolute inset-x-6 top-6 aspect-video overflow-hidden rounded-lg border border-white/10 bg-black/40 shadow-2xl backdrop-blur-sm">
                    <div className="flex h-6 items-center gap-1.5 border-b border-white/5 px-3">
                      <span className="h-2 w-2 rounded-full bg-red-400/80" />
                      <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
                      <span className="h-2 w-2 rounded-full bg-green-400/80" />
                    </div>
                    <div
                      className={cn(
                        "flex h-[calc(100%-24px)] items-center justify-center bg-gradient-to-br opacity-80",
                        project.gradient
                      )}
                    >
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className="font-mono text-[10px] uppercase tracking-widest text-white/40"
                      >
                        Live Preview
                      </motion.div>
                    </div>
                  </div>

                  <div className="glass-strong absolute inset-x-4 bottom-4 rounded-xl p-5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--neon-cyan)]">
                        {project.category}
                      </span>
                      <span className="font-mono text-[9px] text-[var(--text-muted)]">
                        {project.year}
                      </span>
                    </div>
                    <h3 className="mt-2 font-[family-name:var(--font-orbitron)] text-lg font-bold uppercase tracking-wide text-white">
                      {project.title}
                    </h3>
                    {expanded === project.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <p className="mt-3 text-sm text-[var(--text-muted)]">
                          {project.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-[var(--neon-blue)]/20 bg-[var(--neon-blue)]/5 px-2.5 py-1 font-mono text-[8px] uppercase text-[var(--neon-cyan)]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                    <p className="mt-3 font-mono text-[9px] uppercase tracking-widest text-[var(--text-muted)] group-hover:text-[var(--neon-blue)]">
                      {expanded === project.id ? "Collapse" : "View Case Study →"}
                    </p>
                  </div>
                </motion.div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
