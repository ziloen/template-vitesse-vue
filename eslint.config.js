import { vue } from '@ziloen/eslint-config'

/** @type { import("@ziloen/eslint-config").FlatESLintConfig[] } */
export default [
  ...vue(),
  {
    ignores: [
      'volar.config.js',
    ]
  }
]