/// <reference types="vitest" />

import Vue from '@vitejs/plugin-vue'
import path from 'node:path'
import PostcssPresetEnv from 'postcss-preset-env'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import Pages from 'vite-plugin-pages'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`
    }
  },
  plugins: [
    Vue({
      // reactivityTransform: true
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        // 'vue/macros',
        'vue-router',
        '@vueuse/core'
      ],
      dts: './src/types/auto-imports.d.ts',
      dirs: [
        './src/composables'
      ],
      vueTemplate: true
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: './src/types/components.d.ts'
    }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss()
  ],

  css: {
    postcss: {
      plugins: [PostcssPresetEnv({ stage: 2 })]
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/styles/variables.scss" as *;`
      }
    }
  },

  // https://github.com/vitest-dev/vitest
  test: {
    environment: 'jsdom'
  }
})
