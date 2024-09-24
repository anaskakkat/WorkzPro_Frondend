const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        custom_lightBlue: "#BFDBFE",
        custom_button_Sp: "#01B7F2",
        custom_navyBlue: "#003383",
        custom_buttonColor: "#3B82F6",
        custom_Border: "#3B82F6",
        custom_bg_blue: "#eef3f7",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
      oswald: ["Oswald", "sans-serif"],
    },
    backgroundImage: {
      "custom-gradient-black": "linear-gradient(195deg, #42424a, #191919)",
      "custom-gradient-blue": "linear-gradient(195deg, #49a3f1, #1A73E8)",
      "custom-gradient-red": "linear-gradient(195deg, #ff6b6b, #d32f2f)",
      "custom-gradient-dark_blue": "linear-gradient(195deg, #00008b, #000033)",
      "custom-gradient-top-blue": "linear-gradient(to top, #09203f 0%, #537895 100%)",

    },
  },
  plugins: [flowbite.content(), require("tailwindcss-animate")],
  variants: {
    extend: {
      animation: ["hover"],
    },
  },
};
