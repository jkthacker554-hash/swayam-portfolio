"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/lib/data";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className={cn(
          "fixed left-0 right-0 top-0 z-[100] px-4 py-4 transition-all duration-500 md:px-8",
          scrolled && "glass py-3"
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between">
          <a
            href="#hero"
            className="font-[family-name:var(--font-orbitron)] text-sm font-bold tracking-[0.3em] text-white"
            data-cursor
          >
            SWAYAM<span className="text-[var(--neon-blue)]">.</span>EXE
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] transition-colors hover:text-[var(--neon-blue)]"
                data-cursor
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--neon-blue)] transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="hidden lg:block">
            <MagneticButton href="#contact">Initialize</MagneticButton>
          </div>

          <button
            type="button"
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span
              className={cn(
                "h-px w-6 bg-[var(--neon-blue)] transition-all",
                menuOpen && "translate-y-[7px] rotate-45"
              )}
            />
            <span
              className={cn(
                "h-px w-6 bg-[var(--neon-blue)] transition-all",
                menuOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "h-px w-6 bg-[var(--neon-blue)] transition-all",
                menuOpen && "-translate-y-[7px] -rotate-45"
              )}
            />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex flex-col items-center justify-center gap-8 bg-[#030308]/95 backdrop-blur-xl lg:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setMenuOpen(false)}
                className="font-[family-name:var(--font-orbitron)] text-2xl uppercase tracking-widest text-white"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
