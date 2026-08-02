import { promiseTimeout } from '@vueuse/core'
import axios from 'axios'
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
})

// 添加请求拦截器
// service.interceptors.request.use()

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
