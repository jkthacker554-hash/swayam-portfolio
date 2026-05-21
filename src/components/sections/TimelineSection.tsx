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
    <section id="timeline" className="section-pad relative" ref={ref}>
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          label="Journey"
          title="Experience Timeline"
          subtitle="A cinematic arc through studios, brands, and independent craft."
          align="center"
        />

        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-px bg-white/10 md:left-1/2 md:-translate-x-px">
            <motion.div
              className="w-full bg-gradient-to-b from-[var(--neon-blue)] via-[var(--neon-purple)] to-[var(--neon-red)]"
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
              <div
                className={`md:w-1/2 ${
                  i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                } pl-12`}
              >
                <span className="font-mono text-xs text-[var(--neon-blue)]">{item.year}</span>
                <h3 className="mt-1 font-[family-name:var(--font-orbitron)] text-lg font-bold uppercase text-white">
                  {item.title}
                </h3>
                <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--neon-purple)]">
                  {item.org}
                </p>
                <p className="mt-3 text-sm text-[var(--text-muted)]">{item.description}</p>
              </div>

              <div className="absolute left-4 top-2 flex h-3 w-3 -translate-x-1/2 items-center justify-center md:left-1/2">
                <motion.div
                  className="h-3 w-3 rounded-full border-2 border-[var(--neon-blue)] bg-[var(--bg)]"
                  whileInView={{ scale: [0, 1.3, 1], boxShadow: "0 0 20px rgba(0,212,255,0.5)" }}
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
