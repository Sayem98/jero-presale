module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
        screens: {
          lg: "1140px",
          xl: "1140px",
          "2xl": "1200px",
        },
      },
      colors: {
        primary: {
          400: "rgba(15 ,12 ,29,1)",
          500: "#0F0C1D",
        },
        light: {
          400: "#bdd4b9",
          500: "rgb(130, 132, 201,1)",
        },
        blue: {
          DEFAULT: "rgba(16 ,81 ,139,1)",
          second: "#1D1739",
        },
        yellow: {
          DEFAULT: "rgb(239, 182, 21, 1)",
        },
        black: {
          DEFAULT: "rgb(15, 12, 29, 1)",
        },
      },
      fontFamily: {
        sans: [" sans-serif"],
        serif: ["Playfair Display SC", "serif"],
      },
    },
  },
  plugins: [],
};
