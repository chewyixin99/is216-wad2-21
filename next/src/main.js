import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import './assets/style.css'
import store from './store'


createApp(App).use(router).use(store).mount('#app')

