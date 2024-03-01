/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import Vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { Features } from 'lightningcss'
import path from 'node:path'
import PostcssPresetEnv from 'postcss-preset-env'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import SvgComponent from 'unplugin-svg-component/vite'
import Components from 'unplugin-vue-components/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import VueRoute from 'unplugin-vue-router/vite'
import type { Plugin } from 'vite'
import { defineConfig } from 'vite'


export default defineConfig(({ command, mode }) => {
  const IS_PROD = process.env['NODE_ENV'] === 'production'
  const IS_DEV = process.env['NODE_ENV'] === 'development'
  const IS_BUILD = command === 'build'

  return {
    resolve: {
      alias: {
        '~': path.resolve('src'),
        '~cwd': process.cwd(),
      }
    },

    define: {
      // https://github.com/vuejs/core/blob/main/packages/vue/README.md#bundler-build-feature-flags
      /** Options API support */
      __VUE_OPTIONS_API__: false,
      /** production devtools */
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
      /** is production mode */
      IS_PROD,
      /** is development mode */
      IS_DEV,
      /** is build mode */
      IS_BUILD
    },

    server: {
      fs: {
        strict: true
      }
    },

    plugins: [
      // https://github.com/posva/unplugin-vue-router
      VueRoute({
        routesFolder: 'src/pages',
        extensions: ['.vue', '.tsx'],
        /** files to exclude from router scan */
        exclude: ['**/components/**', '*.component.tsx', '*.component.vue'],
        dts: './src/types/typed-router.d.ts',
        /** (filepath: string) => 'sync' | 'async' */
        importMode: 'async'
      }),

      // https://github.com/vue-macros/vue-macros
      VueMacros({
        plugins: {
          // https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue
          vue: Vue({
            script: {
              defineModel: true,
              propsDestructure: true
            }
          }),
          // https://github.com/vitejs/vite-plugin-vue/blob/main/packages/plugin-vue-jsx
          vueJsx: vueJsx({
            optimize: true,
            transformOn: true
          }),
        }
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
              'onScopeDispose',
              'onUnmounted',
              'onUpdated',
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
            ],
            'vue-router': [
              'useRoute',
              'useRouter'
            ],
            '@vueuse/core': [
              'unrefElement',
              'useVModel'
            ],
            ulid: ['ulid']
          }
        ],
        dts: './src/types/auto-imports.d.ts',
        // dirs: ['./src/composables'],
        vueTemplate: true
      }) as Plugin,

      // https://github.com/antfu/vite-plugin-components
      Components({
        dts: './src/types/components.d.ts',
      }),

      // https://github.com/Jevon617/unplugin-svg-component
      SvgComponent({
        iconDir: path.resolve('src/assets/svg-icons'),
        dts: true,
        dtsDir: path.resolve('src/types'),
        componentStyle: 'width: 1em; height: 1em;',
        vueVersion: 3,
        projectType: 'vue',
      }),

      // https://github.com/antfu/unocss
      // https://unocss.dev/integrations/vite
      Unocss({
        mode: 'global'
      }),

      // TODO: polyfill for web apis like `:has` query selector

      // https://github.com/vitejs/vite/tree/main/packages/plugin-legacy
      legacy({
        // render legacy chunks for non-modern browsers
        renderLegacyChunks: false,
        /** polyfills for non-modern browsers (not supports esm) */
        polyfills: false,
        /** polyfills for modern browsers (supports esm) */
        modernPolyfills: [
          // proposals
          /** Array.fromAsync() */
          'esnext.array.from-async',
          /** Promise.withResolvers() */
          'esnext.promise.with-resolvers',
          /** https://github.com/tc39/proposal-set-methods */
          'proposals/set-methods',
          /** https://github.com/tc39/proposal-iterator-helpers */
          'proposals/iterator-helpers',
          /** https://github.com/tc39/proposal-async-iterator-helpers */
          'proposals/async-iterator-helpers',

          // Web APIs
          /** structuredClone() */
          'web.structured-clone',
          /** URL.canParse() */
          'web.url.can-parse',

          // ES2023
          /** Array.prototype.findLast() */
          'es.array.find-last',
          /** Array.prototype.findLastIndex() */
          'es.array.find-last-index',
          /** TypedArray.prototype.findLast() */
          'es.typed-array.find-last',
          /** TypedArray.prototype.findLastIndex() */
          'es.typed-array.find-last-index',
          /** Array.prototype.toReversed() */
          'esnext.array.to-reversed',
          /** Array.prototype.toSorted() */
          'esnext.array.to-sorted',
          /** Array.prototype.toSpliced() */
          'esnext.array.to-spliced',
          /** Array.prototype.with() */
          'esnext.array.with',

          // ES2022
          /** AggregateError */
          'es.aggregate-error',
          /** AggregateError: cause */
          'es.aggregate-error.cause',
          /** Array.prototype.at() */
          'es.array.at',
          /** Error: cause */
          'es.error.cause',
          /** Object.hasOwn */
          'es.object.has-own',
          /** String.prototype.at() */
          'es.string.at-alternative',
          /** TypedArray.prototype.at() */
          'es.typed-array.at',
        ],
        modernTargets: 'chrome>=93, edge>=93, firefox>=91, safari>=15, chromeAndroid>=93, iOS>=15'
      })
    ],

    build: {
      // disable inline base64
      assetsInlineLimit: 0,
      minify: 'esbuild',
      cssMinify: 'lightningcss',
    },

    esbuild: {
      drop: IS_DEV ? [] : ['console', 'debugger'],
    },

    css: {
      devSourcemap: true,

      lightningcss: {
        // https://lightningcss.dev/transpilation.html#feature-flags
        include:
          Features.OklabColors |
          Features.Nesting |
          Features.MediaRangeSyntax
      },
    },

    // https://vitejs.dev/config/dep-optimization-options.html
    optimizeDeps: {
      include: ['@vueuse/core']
    },

    // https://github.com/vitest-dev/vitest
    test: {
      environment: 'jsdom'
    }
  }
})
