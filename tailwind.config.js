/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-pulse": "pulse 100s linear infinite ",
      },
    },
    colors: {
      "blue-light": "#8FB2F5",
      "gray-900": "#13131A",
      "gray-800": "#16161F",
      "gray-700": "#1C1C27",
      "gray-600": "#3B3B54",
      "gray-500": "#7F7F98",
      "gray-400": "#ABABC4",
      "gray-300": "#BFBFD4",
      "gray-200": "#E7E7EE",
      "gray-100": "#F7F8FA",
      "gray-1000": "#1E1E29",
      "gray-1100": "#FAFAFA",
      white: "#FFFFFF",
    },
  },
  plugins: [],
};
