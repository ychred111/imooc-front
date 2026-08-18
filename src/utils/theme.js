import { watch } from 'vue'
import store from '@/store/index.js'
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from '@/constants'

export default () => {
  watch(
    () => store.getters.themeType,
    (val) => {
      // 定义 html 的 class
      let themeClassName = ''
      // 修改 html class
      switch (val) {
        case THEME_LIGHT:
          themeClassName = 'light'
          break
        case THEME_DARK:
          themeClassName = 'dark'
          break
      }
      document.querySelector('html').className = themeClassName
    },
    { immediate: true }
  )
}
