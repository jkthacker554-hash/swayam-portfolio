"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { timeline } from "@/lib/data";

export function TimelineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="journey" className="section-pad relative" ref={ref}>
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          label="Journey"
          title="Experience Timeline"
          subtitle="Learning, freelancing, building, and evolving — one shipped project at a time."
          align="center"
        />

        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-px bg-white/10 md:left-1/2 md:-translate-x-px">
            <motion.div
              className="w-full bg-gradient-to-b from-[var(--neon-cyan)] via-[var(--neon-purple)] to-[var(--neon-blue)]"
              style={{ height: lineHeight }}
            />
          </div>

          {timeline.map((item, i) => (
            <motion.div
              key={item.year + item.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative mb-16 flex flex-col md:flex-row ${
                i % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="md:w-1/2" />
              <motion.div
                whileInView={{ y: [20, 0], opacity: [0.5, 1] }}
                viewport={{ once: true }}
                className={`glass holo-border rounded-xl md:w-1/2 ${
                  i % 2 === 0 ? "md:mr-16 md:text-right" : "md:ml-16"
                } ml-12 p-6`}
              >
                <span className="font-mono text-xs text-[var(--neon-cyan)]">
                  {item.year}
                </span>
                <h3 className="mt-1 font-[family-name:var(--font-orbitron)] text-lg font-bold uppercase text-white">
                  {item.title}
                </h3>
                <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--neon-purple)]">
                  {item.org}
                </p>
                <p className="mt-3 text-sm text-[var(--text-muted)]">
                  {item.description}
                </p>
              </motion.div>

              <div className="absolute left-4 top-6 flex h-3 w-3 -translate-x-1/2 items-center justify-center md:left-1/2">
                <motion.div
                  className="h-3 w-3 rounded-full border-2 border-[var(--neon-cyan)] bg-[var(--bg)] shadow-[0_0_20px_rgba(0,212,255,0.5)]"
                  whileInView={{ scale: [0, 1.4, 1] }}
                  viewport={{ once: true }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
