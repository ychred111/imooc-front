// 手动组件全局注册
// 这是一个 Vue 插件，通过 install 方法将组件注册为全局组件
// 组件名称为 m-svg-icon，带 m- 前缀（可能代表 "mobile" 或 "my"），便于区分第三方组件
// import svgIcon from './svg-icon/index.vue'
// import popup from './popup/index.vue'

// export default {
//   install(app) {
//     app.component('m-svg-icon', svgIcon)
//     app.component('m-popup', popup)
//   }
// }

export { confirm } from './confirm'
export { message } from './message'

//自动组件注册
import { defineAsyncComponent } from 'vue'
export default {
  install(app) {
    // 获取当前路径任意文件夹下的 index.vue 文件
    const components = import.meta.glob('./*/index.vue')
    // console.log(components)
    // 遍历获取到的组件模块
    for (const [key, value] of Object.entries(components)) {
      // console.log(obj)
      // 拼接组件注册的 name
      const componentName = 'm-' + key.replace('./', '').split('/')[0]
      // 通过 defineAsyncComponent 异步导入指定路径下的组件
      app.component(componentName, defineAsyncComponent(value))
    }
  }
}
