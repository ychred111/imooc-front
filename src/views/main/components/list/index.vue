<template>
  <div>
    <!-- 遍历 pexelsList 数组，每个元素渲染一个 item-vue 组件 -->
    <!-- :key：Vue 内部追踪列表项的唯一标识，优化渲染性能 -->
    <!-- :data：将当前图片数据传递给子组件 -->
    <item-vue v-for="item in pexelsList" :key="item.id" :data="item"></item-vue>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getPexelsList } from '@/api/pexels'
import itemVue from './item.vue'

/**
 * 构建数据请求
 */
let query = {
  page: 1,
  size: 20
}
const pexelsList = ref([])
const getPexelsData = async () => {
  const res = await getPexelsList(query)
  pexelsList.value = res.list
}
getPexelsData()
</script>
