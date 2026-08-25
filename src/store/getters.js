export default {
  // 创建 categorys 快捷访问
  categorys: (state) => state.category.categorys,
  // 当前主题
  themeType: (state) => state.theme.themeType,
  // category 选中项
  currentCategory: (state) => state.app.currentCategory,
  // category选中项下标
  currentCategoryIndex: (state, getters) => {
    return getters.categorys.findIndex((item) => {
      return item.id === getters.currentCategory.id
    })
  },
  // 搜索历史
  historys: (state) => state.search.historys,
  // 搜索文本
  searchText: (state) => state.app.searchText
}
