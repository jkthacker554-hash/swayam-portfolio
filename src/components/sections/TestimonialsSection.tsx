"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/lib/data";

export function TestimonialsSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="section-pad relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--neon-blue)]/5 via-transparent to-[var(--neon-purple)]/5" />

      <div className="relative mx-auto max-w-4xl text-center">
        <SectionHeading
          label="Signals"
          title="Client Transmissions"
          align="center"
        />

        <div className="relative min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.5 }}
              className="text-xl font-light italic leading-relaxed text-white md:text-2xl"
            >
              &ldquo;{testimonials[active].quote}&rdquo;
            </motion.blockquote>
          </AnimatePresence>

          <motion.div
            key={`author-${active}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8"
          >
            <p className="font-[family-name:var(--font-orbitron)] text-sm font-bold uppercase tracking-widest text-[var(--neon-blue)]">
              {testimonials[active].author}
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
              {testimonials[active].role}
            </p>
          </motion.div>
        </div>

        <div className="mt-10 flex justify-center gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              data-cursor
              className={`h-2 rounded-full transition-all ${
                active === i
                  ? "w-8 bg-[var(--neon-blue)]"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
