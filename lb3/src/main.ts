import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { setupTaskStorePersistence } from './stores/taskStore'
import './style.css'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
setupTaskStorePersistence()
app.mount('#app')
