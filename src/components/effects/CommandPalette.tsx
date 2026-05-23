"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { commandPaletteItems } from "@/lib/data";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered = commandPaletteItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-[80] hidden items-center gap-2 rounded-lg border border-white/10 bg-black/60 px-3 py-2 font-mono text-[9px] uppercase tracking-widest text-[var(--text-muted)] backdrop-blur-md transition-colors hover:border-[var(--neon-blue)]/40 hover:text-[var(--neon-blue)] md:flex"
        data-cursor
      >
        <span>⌘K</span>
        <span>Command</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[15000] flex items-start justify-center bg-black/70 px-4 pt-[15vh] backdrop-blur-md"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong holo-border w-full max-w-lg overflow-hidden rounded-2xl"
            >
              <div className="border-b border-white/5 p-4">
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search commands..."
                  className="w-full bg-transparent font-mono text-sm text-white outline-none placeholder:text-white/30"
                />
              </div>
              <ul className="max-h-64 overflow-y-auto p-2">
                {filtered.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-lg px-4 py-3 font-mono text-xs text-[var(--text-muted)] transition-colors hover:bg-white/5 hover:text-[var(--neon-cyan)]"
                      data-cursor
                    >
                      <span>{item.label}</span>
                      <kbd className="rounded border border-white/10 px-2 py-0.5 text-[9px] text-[var(--neon-purple)]">
                        {item.shortcut}
                      </kbd>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
