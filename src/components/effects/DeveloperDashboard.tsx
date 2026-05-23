"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function DeveloperDashboard() {
  const [time, setTime] = useState("");
  const [fps] = useState(60);

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          hour12: false,
          timeZone: "Asia/Kolkata",
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const metrics = [
    { label: "Stack", value: "React · Next" },
    { label: "Mode", value: "AI-Assisted" },
    { label: "Status", value: "Shipping" },
    { label: "IST", value: time },
  ];

  return (
    <section className="border-y border-white/5 bg-[#050510]/80 py-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 px-6 md:justify-between">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-3"
        >
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--neon-cyan)] opacity-40" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-[var(--neon-cyan)]" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white">
            System Status: Operational
          </span>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {metrics.map((m) => (
            <div key={m.label} className="text-center">
              <p className="font-mono text-[8px] uppercase tracking-widest text-[var(--text-muted)]">
                {m.label}
              </p>
              <p className="mt-1 font-mono text-xs text-[var(--neon-blue)]">
                {m.value}
              </p>
            </div>
          ))}
          <div className="text-center">
            <p className="font-mono text-[8px] uppercase tracking-widest text-[var(--text-muted)]">
              Render
            </p>
            <p className="mt-1 font-mono text-xs text-[var(--neon-purple)]">
              {fps} FPS
            </p>
          </div>
        </div>

        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="rounded-full border border-[var(--neon-blue)]/20 bg-[var(--neon-blue)]/5 px-4 py-2 font-mono text-[9px] uppercase tracking-widest text-[var(--neon-cyan)]"
        >
          Built with AI + Human Creativity
        </motion.span>
      </div>
    </section>
  );
}
