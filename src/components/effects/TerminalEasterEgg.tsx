"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const lines = [
  "$ ronak --mode=terminal",
  "> Access granted.",
  "> Loading developer mind...",
  "> Skills: React, Three.js, GSAP, AI",
  "> Status: Ready to ship insane experiences.",
  "> Type 'hire' to open contact.",
];

export function TerminalEasterEgg() {
  const [open, setOpen] = useState(false);
  const [buffer, setBuffer] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "`") {
        e.preventDefault();
        setOpen((o) => !o);
        setBuffer("");
        return;
      }
      if (!open) return;
      if (e.key === "Escape") {
        setOpen(false);
        setBuffer("");
        return;
      }
      if (e.key === "Backspace") {
        e.preventDefault();
        setBuffer((b) => b.slice(0, -1));
        return;
      }
      if (e.key.length === 1 && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setBuffer((b) => b + e.key);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (buffer.toLowerCase() === "hire") {
      window.location.hash = "contact";
      setOpen(false);
      setBuffer("");
    }
  }, [buffer]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-24 left-6 z-[85] w-[min(100vw-3rem,420px)] overflow-hidden rounded-xl border border-[var(--neon-cyan)]/30 bg-black/90 shadow-[0_0_60px_rgba(0,212,255,0.15)] backdrop-blur-xl"
        >
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/90" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/90" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/90" />
            <span className="ml-2 font-mono text-[9px] text-[var(--text-muted)]">
              terminal — press ` to close
            </span>
          </div>
          <div className="max-h-48 space-y-1 overflow-y-auto p-4 font-mono text-[11px] text-[var(--neon-cyan)]/90">
            {lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p className="mt-2 text-[var(--text-muted)]">
              &gt; {buffer}
              <span className="animate-pulse">_</span>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
