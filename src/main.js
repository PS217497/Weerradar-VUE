import { createApp } from 'vue'
import App from './App.vue'

import axios from 'axios'
import VueAxios from 'vue-axios'
import '@/styles/app.css'
import './registerServiceWorker'
import VueGtag from "vue-gtag"

createApp(App).use(VueGtag, {
    config: { id: "G-ED9EXLQ1QK" }
}).use(VueAxios, axios).mount('#app')
