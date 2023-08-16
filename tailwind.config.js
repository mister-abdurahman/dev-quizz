/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Codystar", "san-serif"],
      },
      backgroundColor: {
        bg_darkest: "#343a40",
        bg_dark: "#495057",
        bg_medium: "#ced4da",
        bg_light: "#f1f3f5",
      },
    },
  },
  plugins: [],
};
