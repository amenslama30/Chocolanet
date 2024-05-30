import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'


import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/sidebar.css'
import './assets/topbar.css'
import 'bootstrap-icons/font/bootstrap-icons.css'


const app = createApp(App)
app.use(router)
app.use(store)


app.mount('#app')


