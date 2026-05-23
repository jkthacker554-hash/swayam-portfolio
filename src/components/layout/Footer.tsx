"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/data";

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#010104]">
      <div className="section-pad mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="text-center md:text-left">
            <motion.h3
              animate={{
                textShadow: [
                  "0 0 20px rgba(0,212,255,0.3)",
                  "0 0 40px rgba(168,85,247,0.4)",
                  "0 0 20px rgba(0,212,255,0.3)",
                ],
              }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="font-[family-name:var(--font-orbitron)] text-2xl font-bold tracking-[0.2em] text-white"
            >
              RONAK<span className="text-[var(--neon-cyan)]">.</span>EXE
            </motion.h3>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--text-muted)]">
              AI-Powered Website Developer · India
            </p>
            <p className="mt-4 font-mono text-[9px] italic text-[var(--neon-purple)]/60">
              — digitally signed, Ronak Thacker
            </p>
          </div>

          <div className="flex gap-6 font-mono text-[10px] uppercase tracking-widest">
            {Object.keys(siteConfig.socials).map((s) => (
              <motion.a
                key={s}
                href={siteConfig.socials[s as keyof typeof siteConfig.socials]}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  color: "var(--neon-cyan)",
                  textShadow: "0 0 20px rgba(0,212,255,0.5)",
                }}
                className="text-[var(--text-muted)] transition-colors"
                data-cursor
              >
                {s}
              </motion.a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="font-mono text-[10px] text-[var(--text-muted)]">
            © {new Date().getFullYear()} {siteConfig.name}. All systems operational.
          </p>
          <p className="font-mono text-[9px] uppercase tracking-widest text-[var(--neon-blue)]/50">
            Built with AI + Human Creativity
          </p>
        </div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--neon-cyan)]/50 to-transparent" />
    </footer>
  );
}
