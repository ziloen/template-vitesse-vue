import '@unocss/reset/tailwind.css'
import 'uno.css'
import './styles/atom.scss'
import './styles/main.css'

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
  fallbackLocale: 'en',
  // messageResolver: (obj, path) => path.split('.').reduce((o, i) => o[i], obj),
  messages: {
    en: {
      hello: 'Hello {name}!',
      contactUsLink: 'Click <link>here</link> to contact us',
    }
  }
})

createApp(App)
  .use(router)
  .use(i18n)
  .use(createPinia())
  .mount('#app')