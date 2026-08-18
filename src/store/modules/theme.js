import { THEME_LIGHT } from '@/constants'
export default {
  //  标记独立作用域
  namespaced: true,
  state: () => ({
    // 当前主题模式
    themeType: 'THEME_LIGHT'
  }),
  mutations: {
    //   切换主题模式
    changeThemeType(state, newTheme) {
      state.themeType = newTheme
    }
  }
}
