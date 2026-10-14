/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'boc-orange': '#ff4421',
        'boc-canvas': '#181d21',
        'boc-text-on-orange': '#000000',
        'boc-text-on-canvas': '#f3f3f3',
        'boc-muted': '#adadad',
        'boc-gray': '#afabab',
        'boc-muted-2': '#545151',
        'boc-rule': '#181d21',
        'boc-online': '#b53219',
        'boc-muted-on-orange': '#b53219',
        'boc-info-shade': '#b62f17',
        'boc-info-label': '#85210f',
        'boc-offblack': '#181d21',
        'boc-black': '#111314',
        'boc-btn-grey': '#2a3137',
        'boc-btn-grey-hover': '#21272c',
      },
      fontFamily: {
        sans: ['var(--font-pp-mori)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      transitionTimingFunction: {
        'boc-brisk': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'boc-grow': 'cubic-bezier(1, 0, 0.47, 1.25)',
        'boc-reveal': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      keyframes: {
        'boc-marquee': {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(-50%, 0, 0)' }
        },
        'bocBarFadeIn': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'egg-wave': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      animation: {
        'marquee': 'boc-marquee 35s linear infinite',
        'bar-fade-in': 'bocBarFadeIn 0.3s ease-out forwards',
        'egg-wave': 'egg-wave 2s ease-in-out infinite'
      }
    },
  },
  plugins: [],
};
