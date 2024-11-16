import './assets/css/style.css'
import './assets/js/jquery.min.js'
import './assets/js/bootstrap.min.js'
import './assets/js/main.js'  
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
 
import { createApp } from 'vue'
import App from './App.vue'
import router from './router' 
const app = createApp(App)

app.use(router)

app.mount('#app')
