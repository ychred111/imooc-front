<template>
  <div style="height: 1000px">
    <!-- 遍历 pexelsList 数组，每个元素渲染一个 item-vue 组件 -->
    <!-- :key：Vue 内部追踪列表项的唯一标识，优化渲染性能 -->
    <!-- :data：将当前图片数据传递给子组件 -->
    <m-waterfull
      :data="pexelsList"
      nodeKey="id"
      :column="isMobileTerminal ? 2 : 5"
      :picturePreReading="false"
      class="px-1 w-full"
    >
      <!-- v-slot="{ item, width }" -->
      <template v-slot="{ item, width }">
        <item-vue :data="item" :width="width"></item-vue>
      </template>
    </m-waterfull>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getPexelsList } from '@/api/pexels'
import itemVue from './item.vue'
import { isMobileTerminal } from '@/utils/flexible.js'

// 构建数据请求
let query = {
  page: 1,
  size: 20
}
const pexelsList = ref([])
const getPexelsData = async () => {
  const res = await getPexelsList(query)
  pexelsList.value = res.list
  //   console.log(res.value)
}
getPexelsData()
</script>
