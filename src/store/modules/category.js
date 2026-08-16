import { getCategory } from '@/api/category.js'
import { ALL_CATEGORY_ITEM, CATEGORY_NOMAR_DATA } from '@/constants/index.js'

// 处理navigation bar 里面的数据 category
export default {
  //  标记独立作用域
  namespaced: true,
  // 为了保证每个使用该模块的组件都拥有独立且隔离的数据副本，防止多个组件共享同一个对象引用导致数据互相污染
  state: () => ({
    // navigationBar 展示的数据源
    // 1.让 categorys 具备一个初始化数据
    // 2.从服务端获取数据，替换初始化数据
    // 3.为了防止初始化数据太老，我们把每次获取到的新数据，都作为下一次的初始化数据
    category: CATEGORY_NOMAR_DATA
  }),
  mutations: {
    /**
     * 为 categories 赋值
     */
    setCategorys(state, newCategorys) {
      state.categorys = [ALL_CATEGORY_ITEM, ...newCategorys]
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
