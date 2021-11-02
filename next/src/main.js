import { createApp } from 'vue'
// import axios from 'axios'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import './assets/style.css'


createApp(App).use(router).mount('#app')
// App.config.globalProperties.axios=axios