/// <reference types="vitest" />

import Vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
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
      extensions: ['.vue', '.tsx'],
      dts: './src/types/typed-router.d.ts'
    }),

    Vue(),

    // https://github.com/vitejs/vite-plugin-vue/blob/main/packages/plugin-vue-jsx
    vueJsx({
      optimize: true,
      transformOn: true
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        {
          vue: [
            'computed',
            'customRef',
            'defineAsyncComponent',
            'defineComponent',
            'effectScope',
            'inject',
            'nextTick',
            'onBeforeMount',
            'onBeforeUnmount',
            'onBeforeUpdate',
            'onMounted',
            'onUnmounted',
            'onUpdated',
            'onScopeDispose',
            'provide',
            'reactive',
            'readonly',
            'ref',
            'shallowReactive',
            'shallowReadonly',
            'shallowRef',
            'toRaw',
            'unref',
            'useCssModule',
            'useCssVars',
            'watch',
            'watchEffect',
            'watchPostEffect',
            'watchSyncEffect'
          ]
        },
        // 'vue/macros',
        {
          'vue-router': [
            'useRoute',
            'useRouter'
          ]
        },
        {
          '@vueuse/core': [
            'unrefElement',
            'useVModel'
          ]
        },
        { ulid: ['ulid'] }
      ],
      dts: './src/types/auto-imports.d.ts',
      dirs: [
        './src/composables'
      ],
      vueTemplate: true
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: './src/types/components.d.ts',
      resolvers: [
        name => name === 'Motion' ? { name, from: 'motion/vue' } : undefined
      ]
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
        additionalData: `@use "~/styles/variables/index.module.scss" as *;`
      }
    }
  },

  // https://github.com/vitest-dev/vitest
  test: {
    environment: 'jsdom'
  }
})
