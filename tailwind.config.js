const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */

export default {
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
      },
    },
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
      oswald: ["Oswald", "sans-serif"],
    },
  },
  plugins: [flowbite.content()],
  variants: {
    extend: {
      animation: ["hover"],
    },
  },
};
