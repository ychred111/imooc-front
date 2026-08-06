import { computed } from 'vue'
import { PC_DEVICE_WIDTH } from '@/constants'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()
/**
 * 判断当前是否为移动设备，判断依据为屏幕的宽度是否大于指定值（1280）
 */
export const isMobileTerminal = computed(() => {
  return width.value < PC_DEVICE_WIDTH
})
// 动态 rem 基准值：有了这个动态 rem，所有使用 rem 单位的样式都会随屏幕宽度变化，实现移动端适配
export const useREM = () => {
  // 限制根元素 fontSize 最大为 40px，避免在大屏设备上字体过大
  const MAX_FONT_SIZE = 40
  // 等待 DOM 结构解析完成后执行，确保 html 标签存在
  document.addEventListener('DOMContentLoaded', () => {
    const html = document.querySelector('html')
    // 计算基准值：屏幕宽度 ÷ 10。例如 iPhone 6（375px）→ 37.5px
    let fontSize = window.innerWidth / 10
    // 如果计算值超过 40px，则取 40px，否则取计算值
    fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize
    // 将计算后的值设置为 <html> 的 font-size，作为 rem 基准
    html.style.fontSize = fontSize + 'px'
  })
}
