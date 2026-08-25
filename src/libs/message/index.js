import { h, render } from 'vue'
import messageComponent from './index.vue'
export const message = (type, content, duration = 1000) => {
  // 动画结束时的回调
  const onDestroy = () => {
    // 3. 删除 render
    render(null, document.body)
  }
  // 1. 拿到vonde
  const vonde = h(messageComponent, {
    type,
    content,
    duration,
    destroy: onDestroy
  })
  // 2. render vonde
  render(vonde, document.body)
}
