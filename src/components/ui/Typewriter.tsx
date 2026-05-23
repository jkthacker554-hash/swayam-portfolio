"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TypewriterProps {
  texts: readonly string[];
  className?: string;
  speed?: number;
}

export function Typewriter({ texts, className, speed = 45 }: TypewriterProps) {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[index % texts.length];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          const next = current.slice(0, display.length + 1);
          setDisplay(next);
          if (next === current) {
            setTimeout(() => setDeleting(true), 1800);
          }
        } else {
          const next = current.slice(0, display.length - 1);
          setDisplay(next);
          if (next === "") {
            setDeleting(false);
            setIndex((i) => (i + 1) % texts.length);
          }
        }
      },
      deleting ? speed / 2 : speed
    );
    return () => clearTimeout(timeout);
  }, [display, deleting, index, texts, speed]);

  return (
    <span className={cn("font-mono text-[var(--neon-cyan)]", className)}>
      {display}
      <span className="animate-pulse text-[var(--neon-blue)]">|</span>
    </span>
  );
}
