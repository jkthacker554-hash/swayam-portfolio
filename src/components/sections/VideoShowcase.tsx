"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { videoProjects } from "@/lib/data";

export function VideoShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="video" className="section-pad relative overflow-hidden">
      <div className="absolute right-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-[var(--neon-red)]/5 blur-[100px]" />

      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="Video"
          title="Cinematic Edits"
          subtitle="Netflix-grade intros. Trailer energy. Every cut intentional."
        />

        <div className="mb-6 h-px w-full overflow-hidden rounded-full bg-white/5">
          <motion.div
            className="h-full bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-red)]"
            style={{ width: `${progress * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>

        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto pb-8 scrollbar-thin"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {videoProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="group relative h-[70vh] min-w-[85vw] flex-shrink-0 overflow-hidden rounded-2xl md:min-w-[60vw] lg:min-w-[45vw]"
              style={{ scrollSnapAlign: "start" }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030308] via-transparent to-transparent" />

              {/* Film grain overlay */}
              <div className="absolute inset-0 opacity-20 mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
              />

              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                <motion.span
                  className="mb-4 font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--neon-red)]"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                >
                  {project.year} · {project.duration}
                </motion.span>
                <h3 className="font-[family-name:var(--font-orbitron)] text-4xl font-black uppercase tracking-tight text-white md:text-6xl">
                  {project.title}
                </h3>
                <p className="mt-2 font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
                  {project.role}
                </p>

                <motion.div
                  className="mt-8 flex items-center gap-4 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <span className="glass rounded-full px-6 py-2 font-mono text-[10px] uppercase tracking-widest text-[var(--neon-blue)]">
                    Watch Reel
                  </span>
                </motion.div>
              </div>

              {/* Letterbox bars */}
              <div className="absolute left-0 right-0 top-0 h-8 bg-black/60" />
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-black/60" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
