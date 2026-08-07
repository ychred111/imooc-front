<template>
  <div class="">
    <teleport to="body">
      <!-- 蒙版 -->
      <transition name="fade">
        <div
          v-if="isOpen"
          class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
          @click="isOpen = false"
        ></div>
      </transition>

      <!-- 内容 -->
      <transition name="popup-down-up">
        <div
          v-if="isOpen"
          v-bind="$attrs"
          class="w-screen bg-white z-50 fixed bottom-0"
        >
          <slot></slot>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup>
import { useScroll, useScrollLock, useVModel } from '@vueuse/core'
import { defineProps, defineEmits, watch } from 'vue'
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})
// 不需要主动触发
// const emits = defineEmits(['update:modelValue'])

// 通过 useVModel 获取响应式数据 isOpen，当 isOpen 改变时，会自动触发 'update:modelValue'
const isOpen = useVModel(props)

// 滚动锁定
const isLocked = useScrollLock(document.body)
watch(
  // 监听 isOpen 的变化即可
  () => isOpen,
  (val) => {
    isLocked.value = val
  },
  { immediate: true }
)
</script>
<style lang="scss" scoped>
// fade（淡入淡出动画） 用于蒙版层的显示/隐藏

// fade 展示动画
// 设置过渡持续时间为 0.3 秒，作用于所有 CSS 属性
.fade-enter-active {
  transition: all 0.3s;
}
.fade-leave-active {
  transition: all 0.3s;
}

// 控制动画的起始和结束状态，透明度从 0 → 1（进入）或 1 → 0（离开）
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
// popup-down-up（上下滑动动画） 用于内容面板的弹出/收起
// popup-down-up 展示动画
// 同样设置 0.3 秒过渡
.popup-down-up-enter-active {
  transition: all 0.3s;
}
.popup-down-up-leave-active {
  transition: all 0.3s;
}

// 通过 transform: translateY(100%) 实现从底部滑入滑出的效果（100% 表示从自身高度下方滑入）
.popup-down-up-enter-from,
.popup-down-up-leave-to {
  transform: translateY(100%);
}
</style>
