<template>
  <!-- 渲染一个 SVG 容器，aria-hidden="true" 对屏幕阅读器隐藏，提升可访问性 -->
  <svg aria-hidden="true">
    <!-- 通过 href 引用外部 SVG 符号（如 #icon-hamburger），fill 动态绑定颜色 -->
    <use :href="symbolId" :fill="color"></use>
  </svg>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  // 显示的 svg 图标名 （剔除 icon-）
  name: { type: true, required: true },
  //   直接指定 svg 图标的颜色
  color: { type: String },
  //   通过 tailwind 指定 svg 的颜色类名
  fillClass: { type: String }
})

// 显示真是的 svg 图标名称 拼接 svg 颜色类名
const symbolId = computed(() => {
  ;`#icon-${props.name}`
})
</script>
<style scoped lang="less"></style>
