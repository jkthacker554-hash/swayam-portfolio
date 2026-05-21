"use client";

import { motion } from "framer-motion";
import { SplitText } from "./SplitText";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  label,
  title,
  subtitle,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-16 max-w-4xl",
        align === "center" && "mx-auto text-center"
      )}
    >
      <motion.span
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="mb-4 inline-block font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--neon-blue)]"
      >
        // {label}
      </motion.span>
      <h2 className="font-[family-name:var(--font-orbitron)] text-4xl font-bold uppercase tracking-tight text-white md:text-6xl lg:text-7xl">
        <SplitText text={title} />
      </h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-lg text-[var(--text-muted)] md:text-xl"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
