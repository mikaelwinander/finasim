/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Maps to var(--color-primary)
        primary: {
          DEFAULT: 'var(--color-primary)', 
          hover: 'var(--color-primary-hover)',
        },
        // Maps to surface and background
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        // Groups text colors together under 'text-...'
        textColor: {
          main: 'var(--color-text-main)',
          muted: 'var(--color-text-muted)',
        },
        // Groups status colors
        status: {
          error: 'var(--color-error)',
          success: 'var(--color-success)',
        }
      }
    },
  },
  plugins: [],
}