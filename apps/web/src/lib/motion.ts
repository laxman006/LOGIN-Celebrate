// Single source of truth for all animation values.
// RULE: never use inline durations, easings, or transform values.
// RULE: transform + opacity ONLY — no layout-animating properties.

import type { Transition, Variants } from "framer-motion";

// ─── Timing ───────────────────────────────────────────────────────────────────
export const duration = {
  micro: 0.15,       // hover states, toggle, icon morphs
  enterExit: 0.25,   // modals, dropdowns, tooltips
  page: 0.4,         // page transitions, hero elements
} as const;

// ─── Easings ──────────────────────────────────────────────────────────────────
export const ease = {
  enter: [0.2, 0.8, 0.2, 1] as const,     // elastic overshoot feel
  exit: [0.4, 0, 1, 1] as const,          // quick collapse
  standard: [0.4, 0, 0.2, 1] as const,    // material standard
} as const;

// ─── Base transitions ─────────────────────────────────────────────────────────
export const transition = {
  micro: {
    duration: duration.micro,
    ease: ease.enter,
  } satisfies Transition,
  enter: {
    duration: duration.enterExit,
    ease: ease.enter,
  } satisfies Transition,
  exit: {
    duration: duration.enterExit,
    ease: ease.exit,
  } satisfies Transition,
  page: {
    duration: duration.page,
    ease: ease.enter,
  } satisfies Transition,
} as const;

// ─── Reusable Variants ────────────────────────────────────────────────────────

/** Fade in/out — lightest weight, for search results, tags */
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transition.enter },
  exit: { opacity: 0, transition: transition.exit },
};

/** Slide up + fade — modals, drawers, dropdowns */
export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: transition.enter },
  exit: { opacity: 0, y: 8, transition: transition.exit },
};

/** Slide down + fade — toasts, notifications from top */
export const slideDownVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: transition.enter },
  exit: { opacity: 0, y: -6, transition: transition.exit },
};

/** Scale + fade — Cmd+K dialog, popovers */
export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: transition.enter },
  exit: { opacity: 0, scale: 0.97, transition: transition.exit },
};

/** Page transition — route changes */
export const pageVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...transition.page, staggerChildren: 0.06 },
  },
  exit: { opacity: 0, y: -8, transition: transition.exit },
};

/** Card grid stagger — 40ms steps on first paint */
export const cardGridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.1,
    },
  },
};

export const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: transition.enter },
};

/** Copy confirm: check morph + pulse */
export const checkMorphVariants: Variants = {
  idle: { scale: 1, opacity: 1 },
  copied: {
    scale: [1, 1.3, 1],
    opacity: [1, 1, 1],
    transition: { duration: 0.4, times: [0, 0.4, 1], ease: "easeOut" },
  },
};

/** Pulse ring — accent glow on copy */
export const pulseRingVariants: Variants = {
  idle: { scale: 1, opacity: 0 },
  copied: {
    scale: [1, 1.8],
    opacity: [0.6, 0],
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// ─── Hero sequence ────────────────────────────────────────────────────────────
/** Staggered hero load — each child animates in sequence */
export const heroContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.page, ease: ease.enter },
  },
};

// ─── Reduced motion guard ─────────────────────────────────────────────────────
// Usage: const safeVariants = reducedMotion ? instantVariants(targetVariants) : targetVariants
export function instantVariants(variants: Variants): Variants {
  const result: Variants = {};
  for (const key of Object.keys(variants)) {
    const v = variants[key as keyof typeof variants];
    if (typeof v === "object" && v !== null && !Array.isArray(v) && typeof v !== "function") {
      const { transition: _t, ...rest } = v as Record<string, unknown>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      result[key] = { ...rest, transition: { duration: 0 } } as any;
    } else if (v !== undefined) {
      result[key] = v;
    }
  }
  return result;
}
