import { createApp } from 'vue'
import './zeroStyle.css'
import App from './App.vue'
import router from './router/router.ts'
import { createPinia } from 'pinia'

const app=createApp(App)
const pinia=createPinia()


app.use(router)
app.use(pinia)

app.mount('#app').$nextTick(() => {
  // Use contextBridge
  window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message)
  })
})

