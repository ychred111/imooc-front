import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { useREM } from '@/utils/flexible'

useREM() // 应用启动时执行，动态设置 rem 基准

createApp(App).use(router).mount('#app')
