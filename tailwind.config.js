/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      screens: {
        "3xl": "1921px",
      },
      container: {
        center: true,
      },
      fontSize: {
        xs: ["12px", "16px"],
        h6: ["20px", "28px"],
        h5: ["24px", "32px"],
        h4: ["28px", "36px"],
        h3: ["32px", "40px"],
        h2: ["40px", "48px"],
        h1: ["48px", "56px"],
      },
      colors: {
        primary: {
          10: "#FAF7F5",
          40: "#F1EAE4",
          60: "#E1D1C2",
          80: "#D0B79F",
          100: "#BF9D7D",
          120: "#7B6651",
        },
        black: {
          10: "#F9F9F9",
          40: "#ECECEC",
          60: "#909090",
          80: "#4B4B4B",
          100: "#000000",
          bg: "#140F0A",
        },
        danger: {
          10: "#FDECEF",
          20: "#F5CCD1",
          100: "#DA3E51",
          120: "#C22538",
        },
        success: {
          10: "#E8FEE7",
          20: "#BCFBBD",
          100: "#52DD7E",
          120: "#299F65",
        },
        info: {
          10: "#E6FBFE",
          20: "#B1EFFD",
          100: "#3BADEF",
          120: "#1D66AC",
        },
      },
    },
  },
  plugins: [require("flowbite/plugin"), require("@tailwindcss/forms")],
};
