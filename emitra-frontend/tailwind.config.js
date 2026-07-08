/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1A2E4A',
          light: '#2A4A6A',
        },
        slatec: '#4F6D7A',
        emeraldc: '#0A8754',
        amberc: '#F5A623',
        errorc: '#E53E3E',
        successc: '#38A169',
      },
      fontFamily: {
        heading: ['"Clash Display"', '"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        serif: ['Boska', 'Georgia', 'serif'],
        fraunces: ['Fraunces', 'serif'],
        display: ['"Clash Display"', 'sans-serif'],
      },
      borderRadius: {
        btn: '10px',
        input: '12px',
        card: '16px',
        modal: '20px',
        hero: '24px',
      },
      spacing: {
        1: '4px', 2: '8px', 3: '12px', 4: '16px', 6: '24px', 8: '32px', 12: '48px', 16: '64px', 24: '96px',
      },
    },
  },
  plugins: [],
};
