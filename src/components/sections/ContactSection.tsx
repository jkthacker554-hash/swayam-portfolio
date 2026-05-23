"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { WaveVisualizer } from "@/components/effects/WaveVisualizer";
import { siteConfig } from "@/lib/data";

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
          label="Contact"
          title="Let's Build Something Insane."
          subtitle="Open channel for collaborations, freelance projects, and ambitious ideas."
          align="center"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong holo-border rounded-3xl p-8 md:p-12"
        >
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-6">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--neon-cyan)]">
                Available for Projects
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
              <p className="font-[family-name:var(--font-orbitron)] text-2xl font-bold text-[var(--neon-cyan)]">
                TRANSMISSION SENT
              </p>
              <p className="mt-2 font-mono text-xs text-[var(--text-muted)]">
                Your vision is in the queue. Ronak will respond within 24 hours.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { id: "name", label: "Name", type: "text", placeholder: "Your name" },
                {
                  id: "email",
                  label: "Email",
                  type: "email",
                  placeholder: "you@company.com",
                },
              ].map((field) => (
                <div key={field.id}>
                  <label
                    htmlFor={field.id}
                    className={`mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] transition-colors ${
                      focused === field.id
                        ? "text-[var(--neon-cyan)]"
                        : "text-[var(--text-muted)]"
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
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 font-mono text-sm text-white outline-none transition-all placeholder:text-white/20 focus:border-[var(--neon-cyan)]/50 focus:shadow-[0_0_30px_rgba(0,212,255,0.12)]"
                  />
                </div>
              ))}

              <div>
                <label
                  htmlFor="message"
                  className={`mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] transition-colors ${
                    focused === "message"
                      ? "text-[var(--neon-cyan)]"
                      : "text-[var(--text-muted)]"
                  }`}
                >
                  Project Vision
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  placeholder="Describe what we're building..."
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-5 py-4 font-mono text-sm text-white outline-none transition-all placeholder:text-white/20 focus:border-[var(--neon-cyan)]/50 focus:shadow-[0_0_30px_rgba(0,212,255,0.12)]"
                />
              </div>

              <div className="flex justify-center pt-4">
                <MagneticButton type="submit">Launch Project →</MagneticButton>
              </div>
            </form>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6"
        >
          <a
            href={`mailto:${siteConfig.email}`}
            className="group font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] transition-colors hover:text-[var(--neon-cyan)]"
            data-cursor
          >
            <span className="border-b border-transparent group-hover:border-[var(--neon-cyan)]">
              {siteConfig.email}
            </span>
          </a>
          {Object.entries(siteConfig.socials).map(([name, url]) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] transition-colors hover:text-[var(--neon-blue)]"
              data-cursor
            >
              {name}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
