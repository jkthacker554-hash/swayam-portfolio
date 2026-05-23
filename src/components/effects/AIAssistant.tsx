"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { aiAssistantPrompts, siteConfig } from "@/lib/data";

const responses: Record<string, string> = {
  "What can Ronak build for me?":
    "Full-stack experiences: luxury sites, AI-powered interfaces, landing pages, portfolios, and experimental WebGL projects.",
  "Show me futuristic project examples":
    "Check the Projects lab — Neural Commerce, Void OS, and Quantum Lab showcase cinematic + technical depth.",
  "How does Ronak use AI in development?":
    "AI accelerates research, prototyping, debugging, and iteration — while design decisions and shipping quality stay human-led.",
  "What's your availability?":
    "Currently accepting select freelance & collaboration projects. Hit contact — response within 24h.",
};

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; text: string }[]
  >([
    {
      role: "ai",
      text: `Neural assistant online. Ask me about ${siteConfig.name}'s work.`,
    },
  ]);

  const send = (text: string) => {
    setMessages((m) => [
      ...m,
      { role: "user", text },
      {
        role: "ai",
        text:
          responses[text] ??
          "Ronak builds futuristic web experiences with React, Three.js, GSAP, and AI-assisted workflows. Explore the site or open contact.",
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[80]">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="glass-strong holo-border mb-4 w-[min(100vw-3rem,340px)] overflow-hidden rounded-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--neon-cyan)]" />
                <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--neon-blue)]">
                  AI Assistant
                </span>
              </div>
              <span className="font-mono text-[8px] text-[var(--text-muted)]">
                v1.0
              </span>
            </div>
            <div className="max-h-48 space-y-3 overflow-y-auto p-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`font-mono text-[11px] leading-relaxed ${
                    msg.role === "user"
                      ? "text-right text-[var(--neon-purple)]"
                      : "text-[var(--text-muted)]"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 border-t border-white/5 p-3">
              {[
                { label: "What can you build?", prompt: aiAssistantPrompts[0] },
                { label: "See projects", prompt: aiAssistantPrompts[1] },
                { label: "AI workflow", prompt: aiAssistantPrompts[2] },
                { label: "Availability", prompt: aiAssistantPrompts[3] },
              ].map(({ label, prompt }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => send(prompt)}
                  className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[8px] uppercase tracking-wide text-[var(--text-muted)] transition-colors hover:border-[var(--neon-blue)]/30 hover:text-[var(--neon-cyan)]"
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="glass-strong holo-border flex h-14 w-14 items-center justify-center rounded-full font-mono text-[10px] uppercase tracking-wider text-[var(--neon-cyan)]"
        data-cursor
        aria-label="AI Assistant"
      >
        AI
      </motion.button>
    </div>
  );
}
