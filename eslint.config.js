import { format, vue } from '@ziloen/eslint-config'

/** @type { import("@ziloen/eslint-config").FlatESLintConfigItem[] } */
export default [
  ...vue,
  ...format,
  {
    ignores: [
      'volar.config.js',
    ]
  }
]