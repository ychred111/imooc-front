import { getCategory } from '@/api/category.js'
import { ALL_CATEGORY_ITEM } from '@/constants/index.js'

// 处理navigation bar 里面的数据 category
export default {
  //  标记独立作用域
  namespace: true,
  // 为了保证每个使用该模块的组件都拥有独立且隔离的数据副本，防止多个组件共享同一个对象引用导致数据互相污染
  state: () => {
    // navigation 展示的数据源
    categorys: [ALL_CATEGORY_ITEM]
  },
  mutations: {
    //   为 categorys 赋值
    setCaetgorys(state, categorys) {
      state.categorys = [ALL_CATEGORY_ITEM, ...categorys]
    }
  },
  actions: {
    //   获取 categorys 数据，并自动保存到vuex里面
    async useCaetgorysData(context) {
      const { categorys } = await getCategory()
      context.commit('setCaetgorys', categorys)
    }
  }
}
