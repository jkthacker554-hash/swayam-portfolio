"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { whyHirePoints } from "@/lib/data";

export function WhyHireSection() {
  return (
    <section id="why-hire" className="section-pad relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(168,85,247,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          label="Why Hire Me"
          title="Built Different. Built for the Future."
          subtitle="The future belongs to developers who know how to use AI intelligently — and ship work that proves it."
          align="center"
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {whyHirePoints.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass holo-border group relative overflow-hidden rounded-2xl p-8"
              data-cursor
            >
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[var(--neon-blue)]/10 blur-3xl transition-opacity group-hover:opacity-100 opacity-0" />
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--neon-purple)]">
                0{i + 1}
              </span>
              <h3 className="mt-4 font-[family-name:var(--font-orbitron)] text-xl font-bold uppercase tracking-wide text-white">
                {point.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">
                {point.body}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto mt-16 max-w-3xl text-center text-lg leading-relaxed text-white/80"
        >
          I may be{" "}
          <span className="text-[var(--neon-cyan)]">17</span>, but I build like
          someone who&apos;s been obsessed with the craft for a lifetime. Hire me
          for momentum, not promises.
        </motion.p>
      </div>
    </section>
  );
}
