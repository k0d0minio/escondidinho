"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

type FadeInProps = {
  children: ReactNode;
  className?: string;
  /** Seconds. Stagger siblings by passing increasing delays. */
  delay?: number;
  duration?: number;
  /** Initial vertical offset in px. */
  y?: number;
  /** Animate on mount instead of on scroll into view (hero use). */
  immediate?: boolean;
};

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.8,
  y = 28,
  immediate = false,
}: FadeInProps) {
  const reduceMotion = useReducedMotion();
  const hidden = { opacity: 0, y: reduceMotion ? 0 : y };
  const visible = {
    opacity: 1,
    y: 0,
    transition: { duration, delay, ease: EASE },
  };

  if (immediate) {
    return (
      <motion.div className={className} initial={hidden} animate={visible}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={visible}
      viewport={{ once: true, margin: "-72px" }}
    >
      {children}
    </motion.div>
  );
}
