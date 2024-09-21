const config = require('@rubensworks/eslint-config');

module.exports = config([
  {
    files: [ '**/*.ts' ],
    languageOptions: {
      parserOptions: {
        project: [ 'tsconfig.eslint.json' ],
      },
    },
  },
  {
    files: [
      'webpack.config.ts',
    ],
    rules: {
      'import/no-nodejs-modules': 'off',
    },
  },
]);
