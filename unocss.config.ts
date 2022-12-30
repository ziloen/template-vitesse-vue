import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives
  // transformerVariantGroup,
} from 'unocss'
import type { CSSProperties } from 'vue'

const flexStyle: Record<string, CSSProperties> = {
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  between: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  align: {
    display: 'flex',
    alignItems: 'center'
  },
  justify: {
    display: 'flex',
    justifyContent: 'center'
  },
  stretch: {
    display: 'flex',
    alignItems: 'stretch'
  }
} /* satisfies Record<string, CSSProperties> */

const flexReg = new RegExp(`^flex-(${Object.keys(flexStyle).join('|')})$`)

// csstypes

export default defineConfig({
  rules: [
    /** Grid Area TODO: support grid-area-[name] grid-area-1/2/1/2  (?\d\/){0,3}\d  */
    [/^grid-area-(\d)\/(\d)/, match => {
      const [, rowStart, colStart] = match
      return { 'grid-row-start': rowStart, 'grid-column-start': colStart }
    }],
    /** Flex Layout */
    [flexReg, match => {
      return flexStyle[match[1]]
    }]
  ],
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
  ],
  transformers: [
    /* support @apply */
    transformerDirectives()
    // transformerVariantGroup(),
  ]
})
