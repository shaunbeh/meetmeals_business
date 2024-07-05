/** @type {import('tailwindcss').Config} */
const tailwindAnimate = require('tailwindcss-animate');

module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        primary: {
          // DEFAULT: 'hsl(var(--primary))',
          DEFAULT: '#015248',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          // DEFAULT: 'hsl(var(--secondary))',
          DEFAULT: '#E96F11',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        red: '#D7443E',
        text: { primary: '#333', disabled: '#757575', tertiary: '#FFFFFF' },
        line: {
          primary: '#ddd',
        },
        icon: { primary: '#292D32' },
        surface: {
          secondary: '#f7f7f7',
          background: '#f0f0f0',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        progress: 'hsl(var(--progress))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        blue: {
          DEFAULT: 'hsl(var(--blue-text))',
          foreground: 'hsl(var(--blue-text-foreground))',
        },
        level1: {
          DEFAULT: 'hsl(var(--level1))',
          foreground: 'hsl(var(--level1-foreground))',
          card: 'hsl(var(--level1-card))',
        },
        error: {
          DEFAULT: 'hsl(var(--error-color))',
        },
      },
      fontSize: {
        // H1
        h1: ['2rem', { lineHeight: '2.5rem', fontWeight: '400' }],
        'h1-light': ['2rem', { lineHeight: '2.5rem', fontWeight: '300' }],
        'h1-medium': ['2rem', { lineHeight: '2.5rem', fontWeight: '500' }],
        'h1-bold': ['2rem', { lineHeight: '2.5rem', fontWeight: '700' }],
        'h1-extra': ['2rem', { lineHeight: '2.5rem', fontWeight: '800' }],
        'h1-black': ['2rem', { lineHeight: '2.5rem', fontWeight: '900' }],

        // h2
        h2: ['1.5rem', { lineHeight: '2rem', fontWeight: '400' }],
        'h2-light': ['1.5rem', { lineHeight: '2rem', fontWeight: '300' }],
        'h2-medium': ['1.5rem', { lineHeight: '2rem', fontWeight: '500' }],
        'h2-bold': ['1.5rem', { lineHeight: '2rem', fontWeight: '700' }],
        'h2-extra': ['1.5rem', { lineHeight: '2rem', fontWeight: '800' }],
        'h2-black': ['1.5rem', { lineHeight: '2rem', fontWeight: '900' }],

        // h3
        h3: ['1.25rem', { lineHeight: '2rem', fontWeight: '400' }],
        'h3-light': ['1.25rem', { lineHeight: '2rem', fontWeight: '300' }],
        'h3-medium': ['1.25rem', { lineHeight: '2rem', fontWeight: '500' }],
        'h3-bold': ['1.25rem', { lineHeight: '2rem', fontWeight: '700' }],
        'h3-extra': ['1.25rem', { lineHeight: '2rem', fontWeight: '800' }],
        'h3-black': ['1.25rem', { lineHeight: '2rem', fontWeight: '900' }],

        // h4
        h4: ['1.125rem', { lineHeight: '1.5rem', fontWeight: '400' }],
        'h4-light': ['1.125rem', { lineHeight: '1.5rem', fontWeight: '300' }],
        'h4-medium': ['1.125rem', { lineHeight: '1.5rem', fontWeight: '500' }],
        'h4-bold': ['1.125rem', { lineHeight: '1.5rem', fontWeight: '700' }],
        'h4-extra': ['1.125rem', { lineHeight: '1.5rem', fontWeight: '800' }],
        'h4-black': ['1.125rem', { lineHeight: '1.5rem', fontWeight: '900' }],

        // h5
        h5: ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }],
        'h5-light': ['1rem', { lineHeight: '1.5rem', fontWeight: '300' }],
        'h5-medium': ['1rem', { lineHeight: '1.5rem', fontWeight: '500' }],
        'h5-bold': ['1rem', { lineHeight: '1.5rem', fontWeight: '700' }],
        'h5-extra': ['1rem', { lineHeight: '1.5rem', fontWeight: '800' }],
        'h5-black': ['1rem', { lineHeight: '1.5rem', fontWeight: '900' }],

        // h6
        h6: ['0.75rem', { lineHeight: '1rem', fontWeight: '400' }],
        'h6-light': ['0.75rem', { lineHeight: '1rem', fontWeight: '300' }],
        'h6-medium': ['0.75rem', { lineHeight: '1rem', fontWeight: '500' }],
        'h6-bold': ['0.75rem', { lineHeight: '1rem', fontWeight: '700' }],
        'h6-extra': ['0.75rem', { lineHeight: '1rem', fontWeight: '800' }],
        'h6-black': ['0.75rem', { lineHeight: '1rem', fontWeight: '900' }],

        // sub1
        sub1: ['1.125rem', { lineHeight: '1.5rem', fontWeight: '400' }],
        'sub1-light': ['1.125rem', { lineHeight: '1.5rem', fontWeight: '300' }],
        'sub1-medium': [
          '1.125rem',
          { lineHeight: '1.5rem', fontWeight: '500' },
        ],
        'sub1-bold': ['1.125rem', { lineHeight: '1.5rem', fontWeight: '700' }],
        'sub1-extra': ['1.125rem', { lineHeight: '1.5rem', fontWeight: '800' }],
        'sub1-black': ['1.125rem', { lineHeight: '1.5rem', fontWeight: '900' }],

        // sub2
        sub2: ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }],
        'sub2-light': ['1rem', { lineHeight: '1.5rem', fontWeight: '300' }],
        'sub2-medium': ['1rem', { lineHeight: '1.5rem', fontWeight: '500' }],
        'sub2-bold': ['1rem', { lineHeight: '1.5rem', fontWeight: '700' }],
        'sub2-extra': ['1rem', { lineHeight: '1.5rem', fontWeight: '800' }],
        'sub2-black': ['1rem', { lineHeight: '1.5rem', fontWeight: '900' }],

        // sub3
        sub3: ['0.75rem', { lineHeight: '1rem', fontWeight: '400' }],
        'sub3-light': ['0.75rem', { lineHeight: '1rem', fontWeight: '300' }],
        'sub3-medium': ['0.75rem', { lineHeight: '1rem', fontWeight: '500' }],
        'sub3-bold': ['0.75rem', { lineHeight: '1rem', fontWeight: '700' }],
        'sub3-extra': ['0.75rem', { lineHeight: '1rem', fontWeight: '800' }],
        'sub3-black': ['0.75rem', { lineHeight: '1rem', fontWeight: '900' }],

        // paragraph
        par: ['0.875rem', { lineHeight: '1.5rem', fontWeight: '400' }],
        'par-light': ['0.875rem', { lineHeight: '1.5rem', fontWeight: '300' }],
        'par-medium': ['0.875rem', { lineHeight: '1.5rem', fontWeight: '500' }],

        // button
        button: ['0.875rem', { lineHeight: '1.5rem', fontWeight: '400' }],
        'button-light': [
          '0.875rem',
          { lineHeight: '1.5rem', fontWeight: '300' },
        ],
        'button-medium': [
          '0.875rem',
          { lineHeight: '1.5rem', fontWeight: '500' },
        ],

        // caption
        caption: ['0.675rem', { lineHeight: '1rem', fontWeight: '400' }],
        'caption-light': [
          '0.675rem',
          { lineHeight: '1rem', fontWeight: '300' },
        ],
        'caption-medium': [
          '0.675rem',
          { lineHeight: '1rem', fontWeight: '500' },
        ],

        // overline
        overline: ['0.5rem', { lineHeight: '1rem', fontWeight: '400' }],
        'overline-light': ['0.5rem', { lineHeight: '1rem', fontWeight: '300' }],
        'overline-medium': [
          '0.5rem',
          { lineHeight: '1rem', fontWeight: '500' },
        ],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
      },
    },
  },
  plugins: [tailwindAnimate],
};
