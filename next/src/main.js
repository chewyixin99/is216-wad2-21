import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import './assets/style.css'
import store from './store'
import { Plugin } from 'vue-responsive-video-background-player'
import VTypical from 'vue-typical'

createApp(App).use(router).use(store).use(Plugin).use(VTypical).mount('#app')

