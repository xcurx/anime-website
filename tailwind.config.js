/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize:{
        ss:['10px','12px']
      },
      screens:{
        'sm':'500px'
      },
      truncate: {
        lines: {
          2: {
            overflow: 'hidden',
            display: '-webkit-box',
            '-webkit-box-orient': 'vertical',
            '-webkit-line-clamp': '2',
            'text-overflow': 'ellipsis',
          },
          3: {
            overflow: 'hidden',
            display: '-webkit-box',
            '-webkit-box-orient': 'vertical',
            '-webkit-line-clamp': '3',
            'text-overflow': 'ellipsis',
          },
          // Add more line clamps as needed
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.truncate-2-lines': {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '2',
          'text-overflow': 'ellipsis',
        },
        '.truncate-3-lines': {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '3',
          'text-overflow': 'ellipsis',
        },
        // Add more line clamps as needed
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}

