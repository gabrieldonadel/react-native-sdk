const reactNativeConfig = require('@react-native/eslint-config/flat');
const tsEslintPlugin = require('@typescript-eslint/eslint-plugin');
const reactPlugin = require('eslint-plugin-react');
const reactNativePlugin = require('eslint-plugin-react-native');
const tsdoc = require('eslint-plugin-tsdoc');

const typescriptFiles = ['**/*.ts', '**/*.tsx'];
const [, tsEslintRecommended, tsRecommended] =
  tsEslintPlugin.configs['flat/recommended'];

module.exports = [
  {
    ignores: ['coverage/**/*', 'lib/**/*', 'docs/**/*'],
  },
  ...reactNativeConfig,
  reactPlugin.configs.flat.recommended,
  {
    plugins: {
      'react-native': reactNativePlugin,
    },
    rules: reactNativePlugin.configs.all.rules,
  },
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    ...tsEslintRecommended,
    files: typescriptFiles,
  },
  {
    ...tsRecommended,
    files: typescriptFiles,
  },
  {
    files: typescriptFiles,
    plugins: {
      tsdoc,
    },
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-var-requires': [
        'error',
        { allow: ['/package\\.json$'] },
      ],
      '@typescript-eslint/no-require-imports': [
        'error',
        { allow: ['/package\\.json$'] },
      ],
      'tsdoc/syntax': 'warn',
    },
  },
  {
    files: [
      '**/*.test.{js,ts,tsx}',
      '**/__mocks__/*',
      '**/__tests__/*',
    ],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
];
