/// <reference types="vitest" />

import Vue from '@vitejs/plugin-vue'
import path from 'node:path'
import PostcssPresetEnv from 'postcss-preset-env'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import VueRoute from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`
    }
  },
  plugins: [
    VueRoute({
      routesFolder: 'src/pages',
      extensions: ['.vue'],
      dts: './src/types/typed-router.d.ts'
    }),

    Vue({
      // reactivityTransform: true
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        // 'vue/macros',
        'vue-router',
        '@vueuse/core',
        { 'ulid': ['ulid'] }
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
      plugins: [PostcssPresetEnv({ stage: 0 })]
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
