/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        bg:      '#050a18',
        bg2:     '#080f20',
        bg3:     '#0c1628',
        card:    '#0f1d35',
        card2:   '#142040',
        cyan:    '#00c8ff',
        green:   '#00e5a0',
        red:     '#ff3d5a',
        yellow:  '#ffc844',
        purple:  '#8b7cf8',
        orange:  '#ff6b35',
        imred:   '#e63312',
        t1:      '#f0f6ff',
        t2:      '#8fa8cc',
        t3:      '#4a6080',
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'live':       'livePulse 2s ease-in-out infinite',
        'fadeUp':     'fadeUp .4s ease both',
        'slideIn':    'slideIn .35s ease both',
      },
      keyframes: {
        pulseGlow: {
          '0%,100%': { opacity: '.6', transform: 'scale(1)' },
          '50%':     { opacity: '1',  transform: 'scale(1.08)' },
        },
        livePulse: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(0,229,160,.5)' },
          '50%':     { boxShadow: '0 0 0 6px rgba(0,229,160,0)' },
        },
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(16px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
        slideIn: {
          from: { opacity: 0, transform: 'translateX(-12px)' },
          to:   { opacity: 1, transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
