import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
        serif: ["var(--font-merriweather)", "Georgia", "serif"],
        // Design System Typography
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Mood colors
        mood: {
          joyful: "var(--mood-joyful)",
          calm: "var(--mood-calm)",
          sad: "var(--mood-sad)",
          angry: "var(--mood-angry)",
          anxious: "var(--mood-anxious)",
          neutral: "var(--mood-neutral)",
        },
        // Accent colors
        yellow: "var(--yellow)",
        pink: "var(--pink)",
        cyan: "var(--cyan)",
        lime: "var(--lime)",
        purple: "var(--purple)",
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
      },
      borderWidth: {
        3: "3px",
        4: "4px",
      },
      boxShadow: {
        neo: "var(--shadow-sm)",
        "neo-md": "var(--shadow-md)",
        "neo-lg": "var(--shadow-lg)",
        brutal: "4px 4px 0px 0px #000000",
        "brutal-lg": "8px 8px 0px 0px #000000",
        none: "none",
      },
      keyframes: {
        "mood-shift": {
          from: { opacity: "0.8" },
          to: { opacity: "1" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.8" },
          "50%": { transform: "scale(1.02)", opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "color-cycle": {
          "0%, 100%": { color: "#fde047" },
          "20%": { color: "#fb923c" },
          "40%": { color: "#f472b6" },
          "60%": { color: "#5eead4" },
          "80%": { color: "#86efac" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      animation: {
        "mood-shift": "mood-shift 600ms ease",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        breathe: "breathe 4s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
        "color-cycle": "color-cycle 8s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-joy": "linear-gradient(to right, #fde047, #fb923c, #f9a8d4)",
        "gradient-calm": "linear-gradient(to right, #99f6e4, #6ee7b7, #86efac)",
        "gradient-sad": "linear-gradient(to right, #bfdbfe, #a5b4fc, #cbd5e1)",
        "gradient-angry":
          "linear-gradient(to right, #ef4444, #fb7185, #fb923c)",
        "gradient-anxious":
          "linear-gradient(to right, #d8b4fe, #c084fc, #e879f9)",
        "gradient-neutral":
          "linear-gradient(to right, #e5e7eb, #cbd5e1, #a1a1aa)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "mesh-ambient":
          "radial-gradient(at 40% 20%, rgba(253, 224, 71, 0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(251, 146, 60, 0.3) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(167, 243, 208, 0.3) 0px, transparent 50%), radial-gradient(at 80% 50%, rgba(196, 181, 253, 0.3) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(134, 239, 172, 0.3) 0px, transparent 50%), radial-gradient(at 80% 100%, rgba(249, 168, 212, 0.3) 0px, transparent 50%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
