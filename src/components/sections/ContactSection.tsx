"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { WaveVisualizer } from "@/components/effects/WaveVisualizer";
import { siteConfig } from "@/lib/data";
import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_je81mqe";
const CONTACT_TEMPLATE_ID = "template_7m4nx9v";
const OTP_TEMPLATE_ID = "template_r2dyfde";
const PUBLIC_KEY = "04l8ijhdr1Lmbpxok";

export function ContactSection() {
  const [focused, setFocused] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [step, setStep] = useState<"form" | "otp" | "sending">("form");
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const sendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setStep("sending");

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);

    try {
      await emailjs.send(
        SERVICE_ID,
        OTP_TEMPLATE_ID,
        {
          to_name: formData.name,
          to_email: formData.email,
          otp,
        },
        PUBLIC_KEY
      );
      setOtpSent(true);
      setStep("otp");
    } catch {
      setError("Failed to send OTP. Please try again.");
      setStep("form");
    }
  };

  const verifyAndSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (otpInput !== generatedOtp) {
      setError("Invalid OTP. Please try again.");
      return;
    }

    setStep("sending");

    try {
      await emailjs.send(
        SERVICE_ID,
        CONTACT_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        PUBLIC_KEY
      );
      setSent(true);
    } catch {
      setError("Failed to send message. Please try again.");
      setStep("otp");
    }
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
          ) : step === "otp" ? (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={verifyAndSend}
              className="space-y-6"
            >
              <div className="text-center">
                <p className="font-mono text-xs text-[var(--text-muted)]">
                  OTP sent to{" "}
                  <span className="text-[var(--neon-cyan)]">{formData.email}</span>
                </p>
              </div>

              <div>
                <label
                  htmlFor="otp"
                  className={`mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] transition-colors ${
                    focused === "otp" ? "text-[var(--neon-cyan)]" : "text-[var(--text-muted)]"
                  }`}
                >
                  Enter OTP
                </label>
                <input
                  id="otp"
                  type="text"
                  required
                  maxLength={6}
                  placeholder="6-digit code"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  onFocus={() => setFocused("otp")}
                  onBlur={() => setFocused(null)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 font-mono text-sm text-white outline-none transition-all placeholder:text-white/20 focus:border-[var(--neon-cyan)]/50 focus:shadow-[0_0_30px_rgba(0,212,255,0.12)]"
                />
              </div>

              {error && (
                <p className="font-mono text-[10px] text-red-400 text-center">{error}</p>
              )}

              <div className="flex justify-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => { setStep("form"); setError(""); setOtpInput(""); }}
                  className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] hover:text-white transition-colors"
                >
                  ← Back
                </button>
                <MagneticButton type="submit">Verify & Send →</MagneticButton>
              </div>
            </motion.form>
          ) : (
            <form onSubmit={sendOtp} className="space-y-6">
              {[
                { id: "name", label: "Name", type: "text", placeholder: "Your name" },
                { id: "email", label: "Email", type: "email", placeholder: "you@company.com" },
              ].map((field) => (
                <div key={field.id}>
                  <label
                    htmlFor={field.id}
                    className={`mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] transition-colors ${
                      focused === field.id ? "text-[var(--neon-cyan)]" : "text-[var(--text-muted)]"
                    }`}
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    type={field.type}
                    required
                    placeholder={field.placeholder}
                    value={formData[field.id as keyof typeof formData]}
                    onChange={handleChange}
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
                    focused === "message" ? "text-[var(--neon-cyan)]" : "text-[var(--text-muted)]"
                  }`}
                >
                  Project Vision
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  placeholder="Describe what we're building..."
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-5 py-4 font-mono text-sm text-white outline-none transition-all placeholder:text-white/20 focus:border-[var(--neon-cyan)]/50 focus:shadow-[0_0_30px_rgba(0,212,255,0.12)]"
                />
              </div>

              {error && (
                <p className="font-mono text-[10px] text-red-400 text-center">{error}</p>
              )}

              {step === "sending" && (
                <p className="font-mono text-[10px] text-center text-[var(--neon-cyan)] animate-pulse">
                  SENDING OTP...
                </p>
              )}

              <div className="flex justify-center pt-4">
                <MagneticButton type="submit">
                  {step === "sending" ? "Sending..." : "Launch Project →"}
                </MagneticButton>
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
          
            href={`mailto:${siteConfig.email}`}
            className="group font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] transition-colors hover:text-[var(--neon-cyan)]"
            data-cursor
          >
            <span className="border-b border-transparent group-hover:border-[var(--neon-cyan)]">
              {siteConfig.email}
            </span>
          </a>
          {Object.entries(siteConfig.socials).map(([name, url]) => (
            
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
