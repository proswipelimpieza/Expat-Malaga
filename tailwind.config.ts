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
        cream: "#F5F0E8",
        forest: "#1A3A2A",
        "forest-light": "#2A5540",
        terracotta: "#E8916A",
        "terracotta-dark": "#C8703F",
        ink: "#1C1B18",
        muted: "#6B6860",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        prose: "72ch",
      },
      typography: () => ({
        DEFAULT: {
          css: {
            color: "#1C1B18",
          },
        },
      }),
    },
  },
  plugins: [],
};

export default config;
