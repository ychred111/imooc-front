<template>
  <div class="relative" @mouseenter="mouseenter" @mouseleave="mouseleave">
    <!-- 具名插槽 -->
    <div>
      <slot name="reference"></slot>
    </div>
    <!-- 气泡展示动画 -->
    <transition class="slide">
      <div
        class="absolute p-1 z-20 bg-white border rounded-md"
        v-show="isVisable"
      >
        <!-- 匿名插槽 -->
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isVisable = ref(false)
// 鼠标移入移除事件
const mouseenter = () => {
  isVisable.value = true
}
const mouseleave = () => {
  isVisable.value = false
}
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
