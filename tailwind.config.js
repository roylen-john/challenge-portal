module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        primarySoft: 'var(--color-primary-soft)',
        primaryBold: 'var(--color-primary-bold)',
        primaryBg: 'var(--color-primary-bg)',
        primaryBgSoft: 'var(--color-primary-bg-soft)',
        primaryBgSofter: 'var(--color-primary-bg-softer)',
        contrastPrimaryBg: 'var(--color-contrast-primary-bg)',
        contrastPrimaryBgSoft: 'var(--color-contrast-primary-bg-soft)',
        contrastPrimaryBgSofter: 'var(--color-contrast-primary-bg-softer)',

        neutralBg: 'var(--color-neutral-bg)',
        neutralBgSoft: 'var(--color-neutral-bg-soft)',
        neutralBgSofter: 'var(--color-neutral-bg-softer)',
        neutral: 'var(--color-neutral)',
        neutralBold: 'var(--color-neutral-bold)',
        neutralSoft: 'var(--color-neutral-soft)',
        contrastNeutralBg: 'var(--color-contrast-neutral-bg)',
        contrastNeutralBgSoft: 'var(--color-contrast-neutral-bg-soft)',
        contrastNeutralBgSofter: 'var(--color-contrast-neutral-bg-softer)',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['disabled'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
