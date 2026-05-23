"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { stats } from "@/lib/data";

function AnimatedStat({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.floor(eased * value));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass holo-border rounded-2xl p-6 text-center"
    >
      <p className="font-[family-name:var(--font-orbitron)] text-3xl font-bold text-white md:text-4xl">
        {count.toLocaleString()}
        <span className="text-[var(--neon-cyan)]">{suffix}</span>
      </p>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
        {label}
      </p>
    </motion.div>
  );
}

const orbitTech = ["React", "AI", "GSAP", "3D", "Next", "UI"];

export function AboutSection() {
  return (
    <section id="about" className="section-pad relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#080818]/60 to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          label="About"
          title="The Future Belongs to Builders Who Think."
          subtitle="AI is my amplifier. Craft, curiosity, and shipping are my foundation."
        />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-lg leading-relaxed text-[var(--text-muted)]"
          >
            <p>
              I&apos;m <span className="text-white">Ronak Thacker</span> — a{" "}
              <span className="text-[var(--neon-cyan)]">17-year-old</span>{" "}
              self-taught developer from India who builds, designs, improves,
              debugs, and ships complete digital experiences. I started young,
              explored technology deeply, and chose real skills over traditional
              shortcuts.
            </p>
            <p>
              My workflow is{" "}
              <span className="text-white">AI-assisted but human-led</span>. I
              use intelligent tools to move faster — then apply real technical
              judgment to fix, customize, optimize, and deliver products that
              feel premium in production.
            </p>
            <p>
              From freelancing to personal experiments, I&apos;ve learned by
              building in the real world. Every project teaches me how to solve
              problems faster, design sharper, and ship with confidence.
            </p>

            <div className="glass relative flex h-36 items-center justify-center overflow-hidden rounded-2xl">
              <div className="orbit-ring absolute h-28 w-28">
                {orbitTech.map((tech, i) => (
                  <span
                    key={tech}
                    className="absolute left-1/2 top-0 -translate-x-1/2 rounded-lg border border-[var(--neon-blue)]/30 bg-[var(--neon-blue)]/10 px-2.5 py-1 font-mono text-[9px] uppercase text-[var(--neon-cyan)]"
                    style={{
                      transform: `rotate(${(360 / orbitTech.length) * i}deg) translateY(-56px) rotate(-${(360 / orbitTech.length) * i}deg)`,
                      transformOrigin: "50% 56px",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <span className="relative z-10 font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--neon-purple)]">
                AI + Human
              </span>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <AnimatedStat key={s.label} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
