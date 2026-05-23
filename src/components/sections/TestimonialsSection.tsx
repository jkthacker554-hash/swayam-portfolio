"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { InfiniteMarquee } from "@/components/ui/InfiniteMarquee";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-pad relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--neon-blue)]/5 via-transparent to-[var(--neon-purple)]/5" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          label="Testimonials"
          title="Signals From the Field"
          subtitle="What clients and collaborators transmit after working together."
          align="center"
        />
        <InfiniteMarquee />
      </div>
    </section>
  );
}
