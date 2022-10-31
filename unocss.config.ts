import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts
  // transformerDirectives,
  // transformerVariantGroup,
} from 'unocss'
import type { CSSProperties } from 'vue'

const flexKeyword = ['center', 'between', 'align', 'justify', 'center', 'stretch']

// csstypes
type N = CSSProperties

export default defineConfig({
  // rules: [
  //   [/^flex-(center|align)$/, () => ({ display: 'flex' } as CSSProperties)]
  // ],
  shortcuts: [
    // delete this two line
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600 !outline-none'],
    //
    ['h-grow', 'h-min grow'],
    ['w-grow', 'h-min grow'],
    ['col', 'flex-col'],
    ['row', 'flex-row'],
    ['resizable', 'resize overflow-hidden']
  ],
  presets: [
    presetUno(),
    presetAttributify(),
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
    })
  ]
  // transformers: [
  //   transformerDirectives(),
  //   transformerVariantGroup(),
  // ],
})
