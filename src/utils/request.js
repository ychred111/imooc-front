import { promiseTimeout } from '@vueuse/core'
import store from '@/store'
import axios from 'axios'
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
})

// 添加请求拦截器
// service.interceptors.request.use(
//   (config) => {
//     // 在发送请求之前做些什么
//     // 通常在这里从 Vuex / Pinia / localStorage 获取 Token
//     // 假设 Token 存在 localStorage
//     // const token = localStorage.getItem('token')
//     if (store.getters.token) {
//       // 把 Token 放到请求头里
//       // 如果token存在 注入token
//       config.headers.Authorization = `Bearer ${store.getters.token}`
//     }
//     return config
//   },
//   (error) => {
//     // 对请求错误做些什么
//     // console.error('请求错误:', error)
//     return Promise.reject(error)
//   }
// )

service.interceptors.request.use(
  (config) => {
    config.headers.icode = 'helloqianduanxunlianying'
    if (store.getters.token) {
      // 如果token存在 注入token
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config // 必须返回配置
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use((response) => {
  const { success, data, message } = response.data
  // 要根据 success 的成功与否决定下面的操作
  if (success) {
    return data
  } else {
    // 业务错误
    return Promise.reject(new Error(message))
  }
})

export default service
