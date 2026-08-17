<template>
  <div class="relative" @mouseenter="mouseenter" @mouseleave="mouseleave">
    <!-- 具名插槽 -->
    <div ref="referenceTarget">
      <slot name="reference"></slot>
    </div>
    <!-- 气泡展示动画 -->
    <transition class="slide">
      <div
        ref="contentTarget"
        class="absolute p-1 z-20 bg-white dark:bg-zinc-900 border dark:border-zinc-700 rounded-md"
        v-show="isVisable"
        :style="contentStyle"
      >
        <!-- 匿名插槽 -->
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<script>
// 延长关闭时间
const DELAY_TIME = 500
const PROP_TOP_LEFT = 'top_left'
const PROP_TOP_RIGTH = 'top_rigth'
const PROP_BOTTON_LEFT = 'botton_left'
const PROP_BOTTON_RIGTH = 'botton_rigth'

// 定义指定的位置的 Enum
const placementEnum = [
  PROP_TOP_LEFT,
  PROP_TOP_RIGTH,
  PROP_BOTTON_LEFT,
  PROP_BOTTON_RIGTH
]
</script>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { useElementSize } from '@vueuse/core'

const props = defineProps({
  // 控制气泡弹出的位置，并给开发者错误的提示
  placement: {
    type: String,
    default: 'botton_left',
    validator(val) {
      const result = placementEnum.includes(val)
      if (!result) {
        throw new Error(
          `你的 placementEnum 必须是 ${placementEnum.join(',')}中一种`
        )
      }
      return result
    }
  }
})

// 计算弹层
const contentStyle = ref({
  top: 0,
  left: 0
})

let timeout
const isVisable = ref(false)
// 鼠标移入移除事件
const mouseenter = () => {
  isVisable.value = true
  // 再次触发时，清理延时装置
  if (timeout) {
    clearTimeout(timeout)
  }
}

const mouseleave = () => {
  timeout = setTimeout(() => {
    isVisable.value = false
    timeout = null
  }, DELAY_TIME)
}

const contentTarget = ref(null)
const referenceTarget = ref(null)

// 监听展示的变化，在展示时间计算气泡位置也就是 contentStyle
watch(isVisable, (val) => {
  if (!val) return
  // 等待dom元素渲染成功之后
  // vue 在数据改变之后，需要等待一段时间 DOM 才会变化
  // 所以我们可以通过 nextTick 函数的参数，来监听 DOM 变化之后的回调
  nextTick(() => {
    // DOM 更新完成后执行的操作
    // switch (props.placement) {
    //   // 左上
    //   case PROP_TOP_LEFT:
    //     contentStyle.value.top = 0
    //     contentStyle.value.left =
    //       -useElementSize(contentTarget.value).width + 'px'
    //     break

    //   // 右上
    //   case PROP_TOP_RIGHT:
    //     contentStyle.value.top = 0
    //     contentStyle.value.left =
    //       useElementSize(referenceTarget.value).width + 'px'
    //     break

    //   // 左下
    //   case PROP_BOTTOM_LEFT:
    //     contentStyle.value.top =
    //       useElementSize(referenceTarget.value).height + 'px'
    //     contentStyle.value.left =
    //       -useElementSize(contentTarget.value).width + 'px'
    //     break

    //   // 右下
    //   case PROP_BOTTOM_RIGHT:
    //     contentStyle.value.top =
    //       useElementSize(referenceTarget.value).height + 'px'
    //     contentStyle.value.left =
    //       useElementSize(referenceTarget.value).width + 'px'
    //     break
    // }

    switch (props.placement) {
      // 左上
      case PROP_TOP_LEFT:
        contentStyle.value.top = 0
        contentStyle.value.left =
          -useElementSize(contentTarget.value).width + 'px'
        break
      // 右上
      case PROP_TOP_RIGHT:
        contentStyle.value.top = 0
        contentStyle.value.left =
          useElementSize(referenceTarget.value).width + 'px'
        break
      // 左下
      case PROP_BOTTOM_LEFT:
        contentStyle.value.top =
          useElementSize(referenceTarget.value).height + 'px'
        contentStyle.value.left =
          -useElementSize(contentTarget.value).width + 'px'
        break
      // 右下
      case PROP_BOTTOM_RIGHT:
        contentStyle.value.top =
          useElementSize(referenceTarget.value).height + 'px'
        contentStyle.value.left =
          useElementSize(referenceTarget.value).width + 'px'
        break
    }
  })
})
</script>
<style lang="scss" scoped>
.slide-enter-active {
  transition:
    opacity 0.3s,
    transform 0.3s;
}

.slide-leave-active {
  transition:
    opacity 0.3s,
    transform 0.3s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
