"use client";

import { motion } from "framer-motion";
import { WaveVisualizer } from "@/components/effects/WaveVisualizer";

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#020206]">
      <div className="section-pad mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col items-center justify-between gap-8 md:flex-row">
          <div>
            <h3 className="font-[family-name:var(--font-orbitron)] text-2xl font-bold tracking-[0.2em] text-white">
              SWAYAM<span className="text-[var(--neon-blue)]">.</span>EXE
            </h3>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--text-muted)]">
              Video Editor · UI/UX · Visual Systems
            </p>
          </div>
          <WaveVisualizer bars={24} />
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="font-mono text-[10px] text-[var(--text-muted)]">
            © {new Date().getFullYear()} SWAYAM. All systems operational.
          </p>
          <div className="flex gap-6 font-mono text-[10px] uppercase tracking-widest">
            {["Instagram", "Behance", "Dribbble", "LinkedIn"].map((s) => (
              <motion.a
                key={s}
                href="#"
                whileHover={{ color: "var(--neon-blue)" }}
                className="text-[var(--text-muted)] transition-colors"
                data-cursor
              >
                {s}
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Ambient line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--neon-blue)]/50 to-transparent" />
    </footer>
  );
}
