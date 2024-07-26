/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'radial-black-transparent': 'radial-gradient(circle, rgba(0,0,0,0.2778361344537815) 0%, rgba(1,1,15,1) 42%)',
      },
      backgroundColor:{
        'radial': 'rgb(0,0,0)'
      },
      fontFamily:{
        system:'system-ui, -apple-system, BlinkMacSystemFont'
      },
      fontSize:{
        ss:['10px','12px'],
        sz:['8px','10px']
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
      scrollbar: {
        width: '2px',
        thumb: '#303030',
        track: '#282828',
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
    require('tailwind-scrollbar'),
  ],
}

