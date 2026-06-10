import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Base surfaces
        base: "hsl(var(--base))",
        surface: {
          1: "hsl(var(--surface-1))",
          2: "hsl(var(--surface-2))",
          3: "hsl(var(--surface-3))",
        },
        // Text hierarchy
        text: {
          primary: "hsl(var(--text-primary))",
          secondary: "hsl(var(--text-secondary))",
          muted: "hsl(var(--text-muted))",
        },
        // Electric accent
        accent: {
          DEFAULT: "hsl(var(--accent))",
          bright: "hsl(var(--accent-bright))",
          muted: "hsl(var(--accent-muted))",
          fg: "hsl(var(--accent-fg))",
        },
        // Semantic
        border: "hsl(var(--border))",
        "border-bright": "hsl(var(--border-bright))",
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        destructive: "hsl(var(--destructive))",
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
      },
      animation: {
        "pulse-accent": "pulse-accent 2s cubic-bezier(0.4,0,0.6,1) infinite",
        "fade-in": "fade-in 0.25s cubic-bezier(0.2,0.8,0.2,1) forwards",
        "slide-up": "slide-up 0.25s cubic-bezier(0.2,0.8,0.2,1) forwards",
      },
      keyframes: {
        "pulse-accent": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
