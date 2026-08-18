import { watch } from 'vue'
import store from '@/store/index.js'
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from '@/constants'

// 监听系统主题的变更
let matchMedia
const watchSystemThemeChange = () => {
  // 仅需初始化一次即可
  if (matchMedia) return
  matchMedia = window.matchMedia('(prefers-color-scheme:dark)')
  // 监听主题变化
  matchMedia.onchange = function () {
    changeTheme(THEME_SYSTEM)
  }
}

// 变更主题函数抽离
const changeTheme = (theme) => {
  // 定义 html 的 class
  let themeClassName = ''
  // 修改 html class
  switch (theme) {
    case THEME_LIGHT:
      themeClassName = 'light'
      break
    case THEME_DARK:
      themeClassName = 'dark'
      break
    case THEME_SYSTEM:
      themeClassName = matchMedia.matches ? 'dark' : 'light'
      break
  }
  document.querySelector('html').className = themeClassName
}
// 初始化主题
export default () => {
  watchSystemThemeChange()
  watch(() => store.getters.themeType, changeTheme, { immediate: true })
}
