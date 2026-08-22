import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { useREM } from '@/utils/flexible'
import mLibs from './libs'
import 'virtual:svg-icons-register'
import store from './store'
import useTheme from '@/utils/theme'
import mDirective from './directives'

useREM() // 应用启动时执行，动态设置 rem 基准
useTheme() //   初始化主题

createApp(App).use(store).use(router).use(mLibs).use(mDirective).mount('#app')
