/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      xs: '420px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'ui-serif', 'Georgia', 'serif'],
      },
      colors: {
        base: {
          DEFAULT: '#081512',
          secondary: '#10201B',
          tertiary: '#152821',
          card: 'rgba(21, 37, 32, 0.94)',
        },
        navy: {
          DEFAULT: '#102A36',
          light: '#1D4654',
        },
        forest: {
          DEFAULT: '#3D7C10',
          light: '#499A13',
        },
        sage: '#9CBF5C',
        gold: {
          DEFAULT: '#C49A4A',
          light: '#E2BF72',
          bright: '#FFC94A',
        },
        emerald: {
          bright: '#7CC63F',
        },
        ink: {
          DEFAULT: '#F4F1E8',
          secondary: '#B8C1B9',
          muted: '#A6B3AA',
        },
        canvas: '#F8F7F2',
        charcoal: '#1F332A',
        graphite: '#4A544D',
        taupe: '#6B6558',
        'sage-deep': '#5B7A1F',
        'gold-deep': '#7A5D22',

        // ------------------------------------------------------------
        // New global brand palette (added — nothing above was removed).
        // Namespaced under `brand` so it can never collide with Tailwind's
        // built-in `red` / `orange` scales or any existing token above.
        // Backed by the CSS variables defined in src/index.css so a
        // future theme tweak only has to happen in one place.
        // ------------------------------------------------------------
        brand: {
          primary: 'var(--primary)',
          'primary-hover': 'var(--primary-hover)',
          secondary: 'var(--secondary)',
          orange: 'var(--orange)',
          red: 'var(--red)',
        },

        // Semantic surface/text/border tokens for the redesign steps.
        // e.g. bg-surface, bg-surface-secondary, text-body, border-default
        surface: {
          DEFAULT: 'var(--surface)',
          secondary: 'var(--surface-secondary)',
        },
        body: {
          DEFAULT: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          inverse: 'var(--text-inverse)',
        },
        default: 'var(--border)', // used as border-default
      },
      borderColor: {
        subtle: 'rgba(196, 154, 74, 0.18)',
        'subtle-hover': 'rgba(226, 191, 114, 0.40)',
        default: 'var(--border)',
        strong: 'var(--border-strong)',
        primary: 'var(--border-primary)',
      },
      // NOTE: intentionally NOT keyed as sm/md/lg — Tailwind's default
      // `rounded-lg` / `shadow-md` etc. are already used across existing
      // components (e.g. Hero.tsx). Overriding those keys would silently
      // change current spacing/shadows before we've been asked to. These
      // are additive, differently-named tokens instead.
      borderRadius: {
        'radius-sm': 'var(--radius-sm)',
        'radius-md': 'var(--radius-md)',
        'radius-lg': 'var(--radius-lg)',
      },
      boxShadow: {
        'elevation-sm': 'var(--shadow-sm)',
        'elevation-md': 'var(--shadow-md)',
        'elevation-lg': 'var(--shadow-lg)',
        'glow-primary': 'var(--glow-primary)',
        'glow-secondary': 'var(--glow-secondary)',
      },
      transitionDuration: {
        fast: '150ms',
        normal: '280ms',
        slow: '450ms',
      },
      spacing: {
        section: 'var(--space-section)',
      },
    },
  },
  plugins: [],
}