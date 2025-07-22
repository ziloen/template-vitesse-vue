/// <reference types="vitest" />

import tailwindcss from '@tailwindcss/vite'
import legacy from '@vitejs/plugin-legacy'
import Vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { Features } from 'lightningcss'
import path from 'node:path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import VueRoute from 'unplugin-vue-router/vite'
import { defineConfig, loadEnv } from 'vite'


export default defineConfig(({ command, mode }) => {
  const cwd = process.cwd()
  const env = loadEnv(mode, cwd)

  const IS_PROD = env.PROD
  const IS_DEV = env.DEV
  const IS_BUILD = command === 'build'

  const target = '> 0.5%, last 2 versions, Firefox ESR, not dead'

  return {
    resolve: {
      alias: {
        '~': path.resolve('src'),
        '~cwd': cwd,
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

      // https://github.com/vue-macros/vue-macros
      VueMacros({
        plugins: {
          // https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue
          vue: Vue({
            script: {
              defineModel: true,
            },
            template: {
              compilerOptions: {
                // hoistStatic: true,
              }
            },
            features: {
              propsDestructure: true,
              optionsAPI: false,
              prodDevtools: false,
            }
          }),
          // https://github.com/vitejs/vite-plugin-vue/blob/main/packages/plugin-vue-jsx
          vueJsx: vueJsx({
            optimize: true,
            transformOn: true
          }),

          // https://github.com/posva/unplugin-vue-router
          vueRouter: VueRoute({
            routesFolder: 'src/pages',
            extensions: ['.vue', '.tsx'],
            /** files to exclude from router scan */
            exclude: ['**/components/**', '*.component.tsx', '*.component.vue'],
            dts: './src/types/typed-router.d.ts',
            /** (filepath: string) => 'sync' | 'async' */
            importMode: 'async'
          }),
        },
      }),

      // https://github.com/unplugin/unplugin-auto-import
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
              'useId',
              'watch',
              'watchEffect',
              'watchPostEffect',
              'watchSyncEffect',
            ],
            'vue-router': [
              'useRoute',
              'useRouter'
            ],
            '@vueuse/core': [
              'unrefElement',
              'useVModel'
            ],
          }
        ],
        dts: './src/types/auto-imports.d.ts',
        // dirs: ['./src/composables'],
        vueTemplate: true
      }),

      // https://github.com/unplugin/unplugin-vue-components
      Components({
        dts: './src/types/components.d.ts',
      }),

      tailwindcss(),

      // https://github.com/vitejs/vite/tree/main/packages/plugin-legacy
      legacy({
        // render legacy chunks for non-modern browsers
        renderLegacyChunks: false,
        targets: target,
        modernTargets: target,
        modernPolyfills: true,
      }),
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
      transformer: 'lightningcss',
      lightningcss: {
        // https://lightningcss.dev/transpilation.html#feature-flags
        // Always transpile
        include:
          Features.Colors |
          Features.Nesting |
          Features.MediaRangeSyntax,

        // Never transpile
        exclude:
          Features.LogicalProperties,

        cssModules: {
          pattern: "[hash]",
          dashedIdents: false,
        }
      },
      modules: {
        generateScopedName: "[hash:base64:8]"
      }
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
