import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import './permission'
import App from './App.vue'
import router from './router'
import store from './store'


import 'element-plus/dist/index.css'
import '@/assets/style/global.css'


const app = createApp(App)
app.use(ElementPlus)


app.use(store).use(router).mount('#app')

