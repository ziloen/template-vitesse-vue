import '@unocss/reset/tailwind.css'
import 'uno.css'
import './styles/atom.scss'
import './styles/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto/routes'
import App from './App.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

createApp(App)
  .use(router)
  .use(createPinia())
  .mount('#app')