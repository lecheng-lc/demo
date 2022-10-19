import { createApp } from 'vue'
import './style.css'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import App from './App.vue'
import Router from './router'
import axios from './utils/axios'
import pinia from "./store/store"
const app = createApp(App)
app.config.globalProperties.$axios = axios
app.use(Antd).use(Router).use(pinia).mount('#app')