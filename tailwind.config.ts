import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
  daisyui: {
    themes: [
      'cupcake',
      'light',
      'dark',
      // {
      //   mytheme: {
      //     primary: '#594AD7',
      //     secondary: '#6375E2',
      //   },
      // },
    ],
  },
};
export default config;
