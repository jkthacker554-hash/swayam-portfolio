"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { WaveVisualizer } from "@/components/effects/WaveVisualizer";

export function ContactSection() {
  const [focused, setFocused] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="section-pad relative">
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative mx-auto max-w-3xl">
        <SectionHeading
          label="Transmit"
          title="Initialize Contact"
          subtitle="Open a secure channel. Response latency: < 24 hours."
          align="center"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong holo-border rounded-3xl p-8 md:p-12"
        >
          <div className="mb-8 flex items-center justify-between border-b border-white/5 pb-6">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--neon-blue)]">
                Channel Open
              </span>
            </div>
            <WaveVisualizer bars={16} className="!h-8" />
          </div>

          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center"
            >
              <p className="font-[family-name:var(--font-orbitron)] text-2xl font-bold text-[var(--neon-blue)]">
                TRANSMISSION SENT
              </p>
              <p className="mt-2 font-mono text-xs text-[var(--text-muted)]">
                Your message has been queued for response.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { id: "name", label: "Identity", type: "text", placeholder: "Your name" },
                { id: "email", label: "Frequency", type: "email", placeholder: "you@studio.com" },
              ].map((field) => (
                <div key={field.id} className="relative">
                  <label
                    htmlFor={field.id}
                    className={`mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] transition-colors ${
                      focused === field.id ? "text-[var(--neon-blue)]" : "text-[var(--text-muted)]"
                    }`}
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    type={field.type}
                    required
                    placeholder={field.placeholder}
                    onFocus={() => setFocused(field.id)}
                    onBlur={() => setFocused(null)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 font-mono text-sm text-white outline-none transition-all placeholder:text-white/20 focus:border-[var(--neon-blue)]/50 focus:shadow-[0_0_30px_rgba(0,212,255,0.15)]"
                  />
                </div>
              ))}

              <div className="relative">
                <label
                  htmlFor="message"
                  className={`mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] transition-colors ${
                    focused === "message" ? "text-[var(--neon-blue)]" : "text-[var(--text-muted)]"
                  }`}
                >
                  Payload
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  placeholder="Describe your vision..."
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-5 py-4 font-mono text-sm text-white outline-none transition-all placeholder:text-white/20 focus:border-[var(--neon-blue)]/50 focus:shadow-[0_0_30px_rgba(0,212,255,0.15)]"
                />
              </div>

              <div className="flex justify-center pt-4">
                <MagneticButton type="submit">
                  Send Transmission →
                </MagneticButton>
              </div>
            </form>
          )}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center font-mono text-[10px] text-[var(--text-muted)]"
        >
          hello@swayam.studio · Available worldwide
        </motion.p>
      </div>
    </section>
  );
}
