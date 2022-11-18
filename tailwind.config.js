/** @type {import('tailwindcss').Config} */

const defaultColors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#f4da25",
        "main-contra": "#3a1d1d",
        sub: "#FFE77A",
        "sub-contra": "#2C5F2D",
        // BASIC
        basic: "#F0F0F0",
        "basic-active": "#F0F0F0",
        "basic-contra": "#000000",
        // DEFAULT
        default: "#d4d4d4",
        "default-active": "#e6e6e6",
        "default-contra": "#131313",
        // PRIMARY
        primary: "#1266F1",
        "primary-active": "#0c56d0",
        "primary-contra": "#FFFFFF",
        // SECONDARY
        secondary: "#B23CFD",
        "secondary-active": "#a316fd",
        "secondary-contra": "#FFFFFF",
        // SUCCESS
        success: "#00B74A",
        "success-active": "#00913b",
        "success-contra": "#FFFFFF",
        // INFO
        info: "#39C0ED",
        "info-active": "#16b5ea",
        "info-contra": "#ffffff",
        // WARNING
        warning: "#FFA900",
        "warning-active": "#d99000",
        "warning-contra": "#ffffff",
        // DANGER
        danger: "#F93154",
        "danger-active": "#f80c35",
        "danger-contra": "#ffffff",
        // LINK
        link: "#39C0ED",
        "link-active": "#39C0ED",
        "link-contra": "#ffffff",
        // LIGHT
        light: "#FBFBFB",
        "light-active": "#e6e6e6",
        "light-contra": "#262626",
        // DARK
        dark: "#262626",
        "dark-active": "#131313",
        "dark-contra": "#FBFBFB",
        ...defaultColors,
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      // smaller
      jm: { max: "500px" },
      xs: { max: "299px" },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/line-clamp"),
  ],
};
