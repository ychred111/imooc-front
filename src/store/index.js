// Vue 3 写法；Vue 2 使用 import Vuex from 'vue
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import getters from './getters'
import category from './modules/category'
import theme from './modules/theme'
import app from './modules/app'
import search from './modules/search'

// 创建一个新的 store 实例
const store = createStore({
  getters,
  modules: {
    category,
    theme,
    app,
    search
  },
  plugins: [
    createPersistedState({
      // 保存到 localStorage 中的数据
      key: 'imooc-front',
      // 需要保存的模块
      paths: ['category', 'theme', 'search']
    })
  ]
})

export default store
