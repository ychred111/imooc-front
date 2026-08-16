// Vue 3 写法；Vue 2 使用 import Vuex from 'vue
import { createStore } from 'vuex'
import getters from './getters'
import category from './modules/category'

// 创建一个新的 store 实例
const store = createStore({
  getters,
  modules: {
    category
  }
})

export default store
