import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#EFF5FF",
          100: "#DCE9FF",
          200: "#B9D3FF",
          300: "#8FB6FF",
          400: "#5C93FF",
          500: "#2E72FA",
          600: "#0B67F5",
          700: "#0A56CC",
          800: "#0B459F",
          900: "#0D397D",
        },
        ink: {
          900: "#0F1222",
          800: "#171A2E",
          700: "#2B2E42",
        },
        slate: {
          25: "#FAFBFD",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(16,24,40,0.04), 0 1px 3px 0 rgba(16,24,40,0.06)",
        soft: "0 4px 24px -4px rgba(16,24,40,0.08)",
        popover: "0 12px 32px -8px rgba(16,24,40,0.16)",
        hover: "0 12px 28px -6px rgba(11,103,245,0.22)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95) translateY(4px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        dropIn: {
          "0%": { opacity: "0", transform: "translateY(-6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseOnce: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.06)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.2s ease-out",
        "scale-in": "scaleIn 0.22s cubic-bezier(0.16,1,0.3,1)",
        "drop-in": "dropIn 0.18s ease-out",
        "pulse-once": "pulseOnce 0.35s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
