const styleguide = require('@vercel/style-guide/prettier');

module.exports = {
  ...styleguide,
  printWidth: 110,
  plugins: [...styleguide.plugins, 'prettier-plugin-tailwindcss'],
  ignore: ['**/*.env.local'],
};
