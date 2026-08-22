<template>
  <div>
    <!-- 内容 -->
    <slot />
    <div ref="loadingTarget" class="h-6 py-4">
      <!-- 加载更多 -->
      <m-svg-icon
        v-show="loading"
        class="w-4 h-4 mx-auto animate-spin"
        name="infinite-load"
      ></m-svg-icon>
      <!-- 没有更多数据了 -->
      <p v-if="isFinished" class="text-center text-base text-zinc-400">
        已经没有更多数据了！
      </p>
    </div>
  </div>
</template>

<script setup>
// 无限滚动（Infinite Scroll）和瀑布流结合实现功能逻辑
// m-infinite-list（长列表组件）：
// 只负责“监测何时到底了”和“展示加载状态”。
// 它不关心数据长什么样，也不关心请求哪个接口。
// 它只负责在需要的时候大喊一声：“喂，该加载数据了！”（emit('onLoad')）。
// m-waterfull（瀑布流组件）：只负责“计算排版”。它接收数据，算出每个卡片应该在哪个位置，不关心数据是怎么来的。
// index.vue（父组件）：只负责“业务逻辑”。它组装数据、发起请求、管理页码（page）和总状态。

// ---------------------------------------------
// 无限滚动的原理
// 不用监听 scroll 事件（因为性能差且容易被父容器拦截）。
// 而是利用浏览器原生的 IntersectionObserver（交集观察器），
// 监听页面底部的一个“哨兵元素”（loadingTarget）。
// 当这个哨兵元素进入可视区域时，自动触发加载。

// ---------------------------------------------
// 细节：首屏未铺满（First Screen Not Filled）
// 三个部分：状态记录、触发逻辑（emitLoad）、 watch 监听

import { ref, watch } from 'vue'
import { useVModel, useIntersectionObserver } from '@vueuse/core'

const props = defineProps({
  // 是否处于加载状态
  modelValue: {
    type: Boolean,
    required: true
  },
  //   数据是否全部加载
  isFinished: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['onLoad', 'update:modelValue'])

// 处理 loading 状态
const loading = useVModel(props)

// 滚动的元素
const loadingTarget = ref(null)
// 记录当前是否在底部（是否交叉）
const targetIsIntersecting = ref(false)
useIntersectionObserver(
  loadingTarget,
  ([{ isIntersecting }], observerElement) => {
    // 获取当前交叉状态
    targetIsIntersecting.value = isIntersecting
    // 触发 load
    emitLoad()
  }
)

const emitLoad = () => {
  setTimeout(() => {
    // 当加载更多的视图可见时，加载更多数据
    if (targetIsIntersecting.value && !loading.value && !props.isFinished) {
      // 修改加载数据标记
      loading.value = true
      // 触发加载更多行为
      emits('onLoad')
    }
  }, 100)
}

watch(loading, (val) => {
  // 触发 load，延迟处理，等待渲染和 useIntersectionObserver 的再次触发
  setTimeout(() => {
    emitLoad()
  }, 100)
})
</script>
<style scoped lang="less"></style>
