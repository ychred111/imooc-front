// 组件全局注册
// 这是一个 Vue 插件，通过 install 方法将组件注册为全局组件
// 组件名称为 m-svg-icon，带 m- 前缀（可能代表 "mobile" 或 "my"），便于区分第三方组件
import svgIcon from './svg-icon/index.vue'

export default {
  install(app) {
    app.component('m-svg-icon', svgIcon)
  }
}
