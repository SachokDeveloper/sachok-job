import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#2563EB",
          dark: "#1D4ED8",
          light: "#EFF4FF",
        },
        ink: "#0F172A",
        muted: "#64748B",
        line: "#E6EAF0",
        pinkbrand: "#EC4899",
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      borderRadius: {
        xl2: "1rem",
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(16, 24, 40, 0.06), 0 1px 3px 0 rgba(16, 24, 40, 0.08)",
        popover: "0 12px 32px rgba(16, 24, 40, 0.16)",
      },
    },
  },
  plugins: [],
};

export default config;
