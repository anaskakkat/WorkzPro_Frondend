/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        custom_lightBlue: "#BFDBFE",
        custom_button_Sp: "#01B7F2",
        custom_navyBlue: "#003383",
        custom_buttonColor: "#3B82F6",
        custom_bg_blue: "#f2f9ff",
      },
    },
  },
  plugins: [],
  variants: {
    extend: {
      animation: ['hover'],
    },
  },
};





