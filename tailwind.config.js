// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";
import { default as flattenColorPalette } from "tailwindcss/lib/util/flattenColorPalette";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // darkMode: "class",
  theme: {
    // rest of the code
    extend: {

      colors: {
        orange: {
          light: '#FFA726',
          DEFAULT: '#FB8C00',
          dark: '#EF6C00'
        },
      },
      animation: {

        'fade-in': 'fadeIn 0.5s ease-out',
        'star-particles': 'starParticles 1s ease-in-out infinite',
        'jump': 'jump 0.5s ease',
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
      keyframes: {


        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        starParticles: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-20px)', opacity: 0 },
        },
        jump: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },


        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
    },
  },
  plugins: [addVariablesForColors, require('tailwind-scrollbar-hide')],
};

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}