"use client";

import { cn } from "@/lib/utils";

export function WaveVisualizer({ bars = 32, className }: { bars?: number; className?: string }) {
  return (
    <div className={cn("flex h-12 items-end justify-center gap-[3px]", className)}>
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className="wave-bar w-[3px] origin-bottom rounded-full bg-gradient-to-t from-[var(--neon-blue)] to-[var(--neon-purple)]"
          style={{
            height: `${20 + Math.sin(i * 0.5) * 30 + Math.random() * 20}%`,
            animationDelay: `${i * 0.05}s`,
            animationDuration: `${0.8 + (i % 5) * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}
