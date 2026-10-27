/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      'xs': '375px',
      'sm': '480px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1440px',
    },
    extend: {
      colors: {
        bg: {
          base: '#090D16',
          subtle: '#0C111C',
          card: '#0F1626',
          elevated: '#161F33',
        },
        border: {
          subtle: '#1C263B',
          card: '#23304B',
          highlight: '#3B4B70',
        },
        text: {
          primary: '#F8FAFC',
          secondary: '#CBD5E1',
          muted: '#8292AB',
          tertiary: '#4F5E79',
        },
        accent: {
          amber: '#D97706',
          'amber-hover': '#B45309',
          cyan: '#06B6D4',
          emerald: '#10B981',
          destructive: '#EF4444',
        },
        primary: {
          DEFAULT: '#D97706',
          light: '#F59E0B',
          dark: '#B45309',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        space: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(4, 7, 13, 0.7), 0 0 0 1px #23304B',
        'card-hover': '0 12px 32px -4px rgba(4, 7, 13, 0.85), 0 0 0 1px #3B4B70',
        'amber-glow': '0 0 24px -4px rgba(217, 119, 6, 0.35)',
        'cyan-glow': '0 0 24px -4px rgba(6, 182, 212, 0.25)',
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '16px',
        'xl': '24px',
      },
    },
  },
  plugins: [],
};
