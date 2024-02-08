import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import App from './App.vue'

import './styles/main.css'
import '@fontsource-variable/inter'
import { authGuard } from './lib/auth-guard'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
})

const pinia = createPinia()
app.use(pinia)

authGuard(router)

app.use(router)
app.use(VueQueryPlugin)
app.mount('#app')
