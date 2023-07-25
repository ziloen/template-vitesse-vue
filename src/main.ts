import '@unocss/reset/tailwind.css'
import 'uno.css'
import './styles/atom.scss'
import './styles/main.css'

import messages from '@intlify/unplugin-vue-i18n/messages'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto/routes'
import App from './App.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  // custom formatter is removed.
  // formatter: {
  //   interpolate(message, values) {
  //     return [message]
  //   }
  // },
  fallbackLocale: 'en',
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  messages,
})

createApp(App)
  .use(router)
  .use(i18n)
  .use(createPinia())
  .mount('#app')