import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {},
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        "fade-in-up": "fade-in-up .4s ease-out both"
      },
      boxShadow: {
        "neon-user": "0 0 24px rgba(57,255,20,.35)",
        "neon-rater": "0 0 24px rgba(0,209,255,.35)",
        "neon-pink": "0 0 24px rgba(255,43,217,.35)"
      }
    },
    container: {
      center: true,
      padding: "1rem"
    }
  },
  plugins: [],
};
export default config;
