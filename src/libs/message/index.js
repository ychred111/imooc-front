import { h, render } from 'vue'
import messageComponent from './index.vue'
export const message = (type, content, duration = 1000) => {
  // 1. 👇 创建一个专属的 DOM 容器（这是个普通的 div，不干扰其他组件）
  const container = document.createElement('div')
  // 2. 👇 销毁逻辑：只把自己所在的容器卸载并移除！
  const onDestroy = () => {
    // 卸载容器内的 Vue 组件
    render(null, container)
    // 把容器从 DOM 树里删掉
    container.remove()
  }
  // 3. 拿到vonde
  const vonde = h(messageComponent, {
    type,
    content,
    duration,
    destroy: onDestroy
  })
  // 4. render vonde
  render(vonde, document.body)
  // 5. 将容器追加到 body 上，此时组件才会真正显示在页面上
  document.body.appendChild(container)
}
