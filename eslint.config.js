import { format, vue } from '@ziloen/eslint-config'

/** @type { import("@ziloen/eslint-config").FlatESLintConfigItem[] } */
export default [
  ...vue,
  ...format,
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        extraFileExtensions: ['.vue']
      }
    }
  }
]