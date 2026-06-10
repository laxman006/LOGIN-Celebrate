// Design tokens as TypeScript constants.
// Source of truth for values used in JS contexts (e.g., canvas, dynamic styles).
// CSS custom properties in globals.css are the source for Tailwind/CSS.

export const color = {
  base: "hsl(240 6% 5%)",
  surface: {
    1: "hsl(240 5% 8%)",
    2: "hsl(240 5% 11%)",
    3: "hsl(240 4% 16%)",
  },
  text: {
    primary: "hsl(240 5% 96%)",
    secondary: "hsl(240 4% 65%)",
    muted: "hsl(240 3% 40%)",
  },
  accent: {
    DEFAULT: "hsl(263 80% 70%)",
    bright: "hsl(263 90% 78%)",
    muted: "hsl(263 60% 25%)",
    fg: "hsl(240 6% 5%)",
  },
  border: {
    DEFAULT: "hsl(240 5% 18%)",
    bright: "hsl(240 5% 26%)",
  },
  semantic: {
    success: "hsl(152 65% 54%)",
    warning: "hsl(38 92% 58%)",
    destructive: "hsl(0 72% 58%)",
  },
} as const;

export const radius = {
  sm: "0.375rem",
  md: "0.5rem",
  lg: "0.75rem",
} as const;

export const font = {
  sans: "'Inter', system-ui, sans-serif",
  display: "'Inter', system-ui, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, monospace",
} as const;

// Category badge colors — consistent across registry items
export const categoryColor = {
  skill: { bg: "hsl(263 60% 25%)", text: "hsl(263 90% 78%)" },
  "claude-md": { bg: "hsl(202 60% 20%)", text: "hsl(199 89% 70%)" },
  hook: { bg: "hsl(152 40% 18%)", text: "hsl(152 65% 54%)" },
  command: { bg: "hsl(38 60% 18%)", text: "hsl(38 92% 58%)" },
  mcp: { bg: "hsl(0 40% 20%)", text: "hsl(0 72% 70%)" },
} as const;

export type Category = keyof typeof categoryColor;
