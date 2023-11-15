/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'R':['NanumSquare']
      },
      colors: {
        'BLUE_3':'#20386B',
        'BLUE_2':'#1B4E7F',
        'BLUE_1':'#B0D3F0',
        'BLUE_4' : '#6E94AF',
        'YELLOW_1':'#FFC918',
        'WHITE':'#FFFFFF',
        'BLUE_5' : '#3A6B89',
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
