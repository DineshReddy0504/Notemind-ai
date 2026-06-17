/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#15181D",
        paper: "#F5F6F8",
        surface: "#FFFFFF",
        accent: "#4C5FD5",
        accentSoft: "#E7E9FB",
        amber: "#E8A33D",
        muted: "#6B7280",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
