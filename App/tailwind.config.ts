import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        
        // C.H.I.P. Brand Colors
        chip: {
          cyan: "hsl(var(--chip-cyan))",
          "cyan-hover": "hsl(var(--chip-cyan-hover))",
          "cyan-light": "hsl(var(--chip-cyan-light))",
        },
        
        // Text System
        text: {
          primary: "hsl(var(--text-primary))",
          secondary: "hsl(var(--text-secondary))",
        },
        
        // Chat Interface
        chat: {
          bg: "hsl(var(--chat-bg))",
          "chip-bubble": "hsl(var(--chip-bubble))",
          "user-bubble": "hsl(var(--user-bubble))",
          "user-text": "hsl(var(--user-bubble-text))",
        },
        
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          hover: "hsl(var(--secondary-hover))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius)",
        sm: "calc(var(--radius) - 2px)",
        xl: "var(--radius-xl)",
        "2xl": "calc(var(--radius-xl) + 0.5rem)",
        full: "9999px",
      },
      
      boxShadow: {
        'chip-sm': 'var(--shadow-sm)',
        'chip-md': 'var(--shadow-md)',
        'chip-lg': 'var(--shadow-lg)',
        'chip-xl': 'var(--shadow-xl)',
        'chip-hover': 'var(--shadow-hover)',
      },
      
      transitionTimingFunction: {
        'chip-smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'chip-bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
