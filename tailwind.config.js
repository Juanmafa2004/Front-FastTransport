// tailwind.config.js
import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: {
          DEFAULT: "#003540",
          foreground: "#ffffff",
        },
        label: {
          DEFAULT: "#11121599",
        },
        status: {
          DEFAULT: "#41D171",
        },
        inactive: {
          DEFAULT: "#c50b34",
        },
        formLabel: {
          DEFAULT: "#707173",
        },
        tooltipSucces: {
          DEFAULT: "#22c55e",
        },
        tooltipProcess: {
          DEFAULT: "#facc15",
        },
        tooltipError: {
          DEFAULT: "#dc143c",
        },
        tooltipProgres: {
          DEFAULT: "#9CA3AF",
        },
        placeHolder: {
          DEFAULT: "#cfc4bc",
        }
      },
    }
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#003540",
              foreground: "#ffffff",
              100: "#e6f1fe",
              200: "#ccE3fd",
            },
            formLabel: {
              DEFAULT: "#707173",
            },
            label: {
              DEFAULT: "#11121599",
            },
            status: {
              DEFAULT: "#41D171",
            },
            inactive: {
              DEFAULT: "#c50b34",
            },
            tooltip: {
              DEFAULT: "#2940D3",
            }, tooltipProcess: {
              DEFAULT: "#facc15",
            },
            tooltipError: {
              DEFAULT: "#dc143c",
            },
            tooltipProgres: {
              DEFAULT: "#9CA3AF",
            }, placeHolder: {
              DEFAULT: "#cfc4bc",
            }
          },
        },
      },
    }),
  ]
}