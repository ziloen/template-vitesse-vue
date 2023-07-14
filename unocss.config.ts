import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
} from 'unocss'

export default defineConfig({
  rules: [
    /** Grid Area TODO: support grid-area-[name] grid-area-1/2/1/2  (?\d\/){0,3}\d  */
    [/^grid-area-(\d)\/(\d)/, match => {
      const [, rowStart, colStart] = match
      return { 'grid-row-start': rowStart, 'grid-column-start': colStart }
    }],
    ['anchor-auto', { 'overflow-anchor': 'auto' }],
    ['anchor-none', { 'overflow-anchor': 'none' }],
    ['flex-center', { display: 'flex', 'justify-content': 'center', 'align-items': 'center' }],
    ['flex-between', { display: 'flex', 'justify-content': 'space-between' }],
    ['flex-align', { display: 'flex', 'align-items': 'center' }],
    ['flex-justify', { display: 'flex', 'justify-content': 'center' }],
    ['flex-stretch', { display: 'flex', 'align-items': 'stretch' }],
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
    presetUno({
      arbitraryVariants: false,
    }),
    // presetAttributify(),
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
  ],
  theme: {
    colors: {

    }
  }
})
