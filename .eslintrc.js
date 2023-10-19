module.exports = {
  extends: [
    '@ziloen/eslint-config-vue',
    '@ziloen/eslint-config-format'
  ],
  parserOptions: {
    project: './tsconfig.json'
  },
  ignorePatterns: [
    'volar.config.js',
    'dist',
    '*.html'
  ]
}