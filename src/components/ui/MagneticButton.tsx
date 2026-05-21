"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit";
}

export function MagneticButton({
  children,
  className,
  strength = 0.35,
  onClick,
  href,
  type = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0, 0)";
  };

  const inner = (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 font-mono text-xs uppercase tracking-[0.2em] transition-colors",
        "glass-strong holo-border text-[var(--neon-blue)] hover:text-white",
        className
      )}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00d4ff]/20 to-[#a855f7]/20 opacity-0 transition-opacity hover:opacity-100" />
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {inner}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className="inline-block border-0 bg-transparent p-0">
      {inner}
    </button>
  );
}
