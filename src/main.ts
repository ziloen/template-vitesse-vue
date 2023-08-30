import '@unocss/reset/tailwind.css'
import 'uno.css'
import './styles/atom.scss'
import './styles/main.css'

import messages from '@intlify/unplugin-vue-i18n/messages'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { CompileError, MessageCompiler, MessageContext, createI18n } from 'vue-i18n'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto/routes'
import App from './App.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

const messageCompiler: MessageCompiler = (
  message,
  { key, onCacheKey, locale, onError, warnHtmlMessage }
) => {
  if (typeof message === 'string') {

    return (ctx: MessageContext) => {
      return ctx.values
    }
  } else {
    /**
     * for AST.
     * If you would like to support it,
     * You need to transform locale mesages such as `json`, `yaml`, etc. with the bundle plugin.
     */
    onError && onError(new Error('not support for AST') as CompileError)
    return () => key
  }
}

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  // messageCompiler,
  fallbackLocale: 'en',
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  messages: messages!,
})

createApp(App)
  .use(router)
  .use(i18n)
  .use(createPinia())
  .mount('#app')