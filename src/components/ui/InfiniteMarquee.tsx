"use client";

import { testimonials } from "@/lib/data";

export function InfiniteMarquee() {
  const items = [...testimonials, ...testimonials];

  return (
    <div className="relative overflow-hidden py-4">
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[var(--bg)] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[var(--bg)] to-transparent" />

      <div className="marquee-track flex gap-6">
        {items.map((t, i) => (
          <article
            key={`${t.author}-${i}`}
            className="glass holo-border w-[min(85vw,380px)] shrink-0 rounded-2xl p-8"
          >
            <p className="text-sm italic leading-relaxed text-white/90">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="mt-6 border-t border-white/5 pt-4">
              <p className="font-[family-name:var(--font-orbitron)] text-xs font-bold uppercase tracking-widest text-[var(--neon-cyan)]">
                {t.author}
              </p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-[var(--text-muted)]">
                {t.role}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
