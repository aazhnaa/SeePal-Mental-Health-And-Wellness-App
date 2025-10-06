// tailwind.config.mjs
import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors:{
        light_brand:"#e6fdff",
        brand:"#006d77",
        dark_brand : "#15616d"
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["dark", "cupcake","light", "lofi"], // just list the ones you want
  },
};
