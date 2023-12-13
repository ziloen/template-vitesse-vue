import {
  defineConfig,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import presetTheme from 'unocss-preset-theme'
import { presetZiloen } from 'unocss-preset-ziloen'
import type { Theme } from 'unocss/preset-uno'


// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-arguments
export default defineConfig<Theme>({
  theme: {
  },
  rules: [
    // grid-col-[start]/[end]
    [/^grid-col-(\d\/\d)/, match => {
      const [num1, num2] = match[1]!.split('/')
      return { 'grid-column': `${num1} / ${num2}` }
    }],

    // grid-row-[start]/[end]
    [/^grid-row-(\d\/\d)/, match => {
      const [num1, num2] = match[1]!.split('/')
      return { 'grid-row': `${num1} / ${num2}` }
    }],

    ['h-grow', { height: 'min-content', 'flex-grow': 1 }],
    ['w-grow', { width: 'min-content', 'flex-grow': 1 }],

    ['resizable', { resize: 'both', overflow: 'hidden' }]
  ],
  shortcuts: [
    // 
    ['col', 'flex-col grid-flow-row'],
    ['row', 'flex-row grid-flow-col'],
    // customize styles
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600 !outline-none'],
  ],
  presets: [
    presetUno({
      arbitraryVariants: false,
    }),
    presetZiloen(),
    presetIcons({
      scale: 1.2,
      warn: true
    }),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'Fira Code'
      }
    }),
    presetTheme<Theme>({
      theme: {
        light: {
          colors: {
            primary: '#3b82f6',
          }
        },
        dark: {
          colors: {
            primary: '#90cdf4',
          }
        }
      }
    })
  ],
  transformers: [
    /* support @apply */
    transformerDirectives(),
    /* support `dark:(text-white bg-black)` and `text-(xl white)` */
    transformerVariantGroup(),
  ],
})