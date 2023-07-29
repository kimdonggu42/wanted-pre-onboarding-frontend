module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  plugins: ['@typescript-eslint', 'react-hooks'],
  extends: ['react-app', 'plugin:@typescript-eslint/recommended', 'prettier'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        'additionalHooks': 'useRecoilCallback'
      }
    ],
    'import/no-duplicates': 'error',
    'import/order': [
      'error',
      {
        'groups': [
          ['builtin', 'external', 'internal'],
          'parent',
          'sibling',
          'index'
        ],
        'alphabetize': { 'order': 'asc' }
      }
    ],
    'eqeqeq': ['error', 'always', { 'null': 'ignore' }],
    'prefer-const': 'error',
    'no-console': 'warn',
  }
}
