module.exports = {
  extends: ['rem', 'plugin:prettier/recommended'],
  rules: {
    'unicorn/filename-case': 'off',
    'no-await-in-loop': 'off',
    'unicorn/no-abusive-eslint-disable': 'off',
    'no-multi-assign': 'off',
    camelcase: 'off',
  },
  ignores: ['**/example/**'],
}
