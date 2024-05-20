module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        blue: {
          600: "#3B82F6",
          700: "#2563EB",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
