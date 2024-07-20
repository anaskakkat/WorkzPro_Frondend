/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightBlue: "#BFDBFE",
        navyBlue: "#003383",
        buttonColor: "#3B82F6",
        bg_blue: "#F4F9FF",
      },
    },
  },
  plugins: [],
};
