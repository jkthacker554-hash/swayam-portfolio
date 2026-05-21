"use client";

import { motion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const spring = { stiffness: 500, damping: 28 };
  const cursorX = useSpring(0, spring);
  const cursorY = useSpring(0, spring);
  const ringX = useSpring(0, { stiffness: 150, damping: 20 });
  const ringY = useSpring(0, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    setVisible(true);

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };

    const onEnter = () => setHovering(true);
    const onLeave = () => setHovering(false);

    window.addEventListener("mousemove", move);
    document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, [cursorX, cursorY, ringX, ringY]);

  if (!visible) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[10000] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--neon-blue)] mix-blend-screen md:block"
        style={{ x: cursorX, y: cursorY }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden rounded-full border border-[var(--neon-blue)]/50 md:block"
        style={{
          x: ringX,
          y: ringY,
          width: hovering ? 56 : 32,
          height: hovering ? 56 : 32,
          marginLeft: hovering ? -28 : -16,
          marginTop: hovering ? -28 : -16,
          boxShadow: hovering
            ? "0 0 30px rgba(0,212,255,0.4), inset 0 0 20px rgba(168,85,247,0.2)"
            : "0 0 15px rgba(0,212,255,0.2)",
          transition: "width 0.3s, height 0.3s, margin 0.3s",
        }}
      />
      <motion.div
        className="pointer-events-none fixed z-[9998] hidden h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[80px] md:block"
        style={{
          left: pos.x,
          top: pos.y,
          background:
            "radial-gradient(circle, rgba(0,212,255,0.25) 0%, rgba(168,85,247,0.15) 40%, transparent 70%)",
        }}
      />
    </>
  );
}
