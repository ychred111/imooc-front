import { getCategory } from '@/api/category.js'
import { ALL_CATEGORY_ITEM } from '@/constants/index.js'

// 处理navigation bar 里面的数据 category
export default {
  //  标记独立作用域
  namespaced: true,
  // 为了保证每个使用该模块的组件都拥有独立且隔离的数据副本，防止多个组件共享同一个对象引用导致数据互相污染
  state: () => ({
    // navigationBar 展示的数据源
    category: [ALL_CATEGORY_ITEM]
  }),
  mutations: {
    /**
     * 为 categories 赋值
     */
    setCategorys(state, categorys) {
      state.categorys = [ALL_CATEGORY_ITEM, ...categorys]
    }
  },
  actions: {
    /**
     * 获取 category 数据，并自动保存到 vuex 中
     */
    async useCategoryData(context) {
      const { categorys } = await getCategory()
      context.commit('setCategorys', categorys)
    }
  }
}
