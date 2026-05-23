"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/data";

export function HUDOverlay() {
  const [time, setTime] = useState("");

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

  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden">
      {[
        "top-6 left-6 border-t border-l",
        "top-6 right-6 border-t border-r",
        "bottom-6 left-6 border-b border-l",
        "bottom-6 right-6 border-b border-r",
      ].map((pos, i) => (
        <div
          key={i}
          className={`absolute h-12 w-12 border-[var(--neon-cyan)]/25 ${pos}`}
        />
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        transition={{ delay: 1.5 }}
        className="absolute left-4 top-1/2 hidden -translate-y-1/2 flex-col gap-1 font-mono text-[9px] uppercase tracking-widest text-[var(--neon-cyan)]/70 lg:flex"
      >
        <span>SYS.ONLINE</span>
        <span>AI: ENHANCED</span>
        <span>STACK: REACT</span>
        <span className="mt-4 text-[var(--neon-purple)]/60">{siteConfig.tagline}</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        transition={{ delay: 1.7 }}
        className="absolute right-4 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-1 font-mono text-[9px] uppercase tracking-widest text-[var(--text-muted)] lg:flex"
      >
        <span>LOC: {siteConfig.location}</span>
        <span>AGE: {siteConfig.age}</span>
        <span>IST: {time}</span>
        <span>MODE: CINEMATIC</span>
      </motion.div>

      <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 opacity-15">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[var(--neon-cyan)]" />
        <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[var(--neon-cyan)]" />
      </div>
    </div>
  );
}
