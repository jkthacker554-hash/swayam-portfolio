"use client";

import { motion } from "framer-motion";

export function HUDOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden">
      {/* Corner brackets */}
      {[
        "top-6 left-6 border-t border-l",
        "top-6 right-6 border-t border-r",
        "bottom-6 left-6 border-b border-l",
        "bottom-6 right-6 border-b border-r",
      ].map((pos, i) => (
        <div
          key={i}
          className={`absolute h-12 w-12 border-[var(--neon-blue)]/30 ${pos}`}
        />
      ))}

      {/* Side data */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2 }}
        className="absolute left-4 top-1/2 hidden -translate-y-1/2 flex-col gap-1 font-mono text-[9px] uppercase tracking-widest text-[var(--neon-blue)]/60 lg:flex"
      >
        <span>SYS.ONLINE</span>
        <span>RENDER: GPU</span>
        <span>FPS: 60</span>
        <span className="mt-4 text-[var(--neon-purple)]/60">SWAYAM.EXE</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2.2 }}
        className="absolute right-4 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-1 font-mono text-[9px] uppercase tracking-widest text-[var(--text-muted)] lg:flex"
      >
        <span>COORD: 40.7128° N</span>
        <span>MODE: CINEMATIC</span>
        <span>BUILD: v2.0.26</span>
      </motion.div>

      {/* Center crosshair - subtle */}
      <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 opacity-20">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[var(--neon-blue)]" />
        <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[var(--neon-blue)]" />
      </div>
    </div>
  );
}
