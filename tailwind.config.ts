import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx,mdx}",
    "./components/**/*.{ts,tsx,js,jsx,mdx}",
    "./content/**/*.{mdx,md}",
  ],
  theme: {
    extend: {
      colors: {
        // Legacy — kept for prose/article compatibility
        cream: "#F5F0E8",
        terracotta: "#E8916A",
        "terracotta-dark": "#C8703F",
        // Updated to v2
        forest: "#2c4a1e",
        "forest-light": "#3a5c28",
        ink: "#1c1a17",
        muted: "#6b6358",
        // New v2 design tokens
        sand: "#fdfaf5",
        "sand-deep": "#f5efe3",
        sea: "#0096c7",
        "sea-dark": "#007aad",
        sky: "#e8f5fc",
        "sky-deep": "#ceeaf8",
        coral: "#e8703a",
        "coral-dark": "#d4612c",
        sun: "#f4a623",
        navy: "#013a52",
        "ink-soft": "#6b6358",
        "ink-faint": "#9a9088",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        prose: "72ch",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        lineGrow: {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        shimmer: "shimmer 4s linear infinite",
        "line-grow": "lineGrow .6s .3s both",
        "slide-up": "slideUp .65s both",
        "fade-in": "fadeIn .6s both",
      },
      typography: () => ({
        DEFAULT: {
          css: {
            color: "#1c1a17",
          },
        },
      }),
    },
  },
  plugins: [],
};

export default config;
