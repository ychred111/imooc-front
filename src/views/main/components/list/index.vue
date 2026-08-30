<template>
  <!-- style="height: 1000px" -->
  <div>
    <m-infinite-list
      v-model="isLoading"
      :isFinished="isFinished"
      @onLoad="getPexelsData()"
    >
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
          <item-vue :data="item" :width="width" @click="onToPins"></item-vue>
        </template>
      </m-waterfull>
    </m-infinite-list>

    <!-- 大图详情处理 -->
    <!-- 使用 pins-vue组件 \
     利用 transition 包裹
     在利用三个钩子绑定对应的状态 -->
    <transition
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <pins-vue v-if="isVisiblePins" :id="currentPins.id" />
    </transition>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { getPexelsList } from '@/api/pexels'
import itemVue from './item.vue'
import { isMobileTerminal } from '@/utils/flexible.js'
import { useStore } from 'vuex'
import { useEventListener } from '@vueuse/core'
import pinsVue from '@/views/pins/index.vue'
import gsap from 'gsap'

const store = useStore()

// 构建数据请求
let query = {
  page: 1,
  size: 20
}
const isLoading = ref(false)
const isFinished = ref(false)
const pexelsList = ref([])

const getPexelsData = async () => {
  // 数据全部加载完成则 return
  if (isFinished.value) {
    return
  }

  // 完成第一次请求之后，后续请求让 page 自增
  if (pexelsList.value.length) {
    query.page += 1
  }

  // 触发接口请求
  const res = await getPexelsList(query)
  // 初始请求清空数据源
  if (query.page === 1) {
    pexelsList.value = res.list
  } else {
    pexelsList.value.push(...res.list)
  }
  // 判断数据是否全部加载完成
  if (pexelsList.value.length === res.total) {
    isFinished.value = true
  }
  // 修改 loading 标记
  isLoading.value = false
}
getPexelsData()

/**
 * 通过此方法修改 query 请求参数，重新发起请求
 */
const resetQuery = (newQuery) => {
  query = { ...query, ...newQuery }
  // 重置状态
  isFinished.value = false
  pexelsList.value = []
  // 重新发起请求（需要你项目中定义了 getPexelsData 方法）
  getPexelsData()
}

/**
 * 监听 currentCategory 的变化
 */
watch(
  () => store.getters.currentCategory,
  (currentCategory) => {
    // 重置请求参数
    resetQuery({
      page: 1,
      categoryId: currentCategory.id
    })
  }
)

/**
 * 监听 searchText 的变化
 */
watch(
  () => store.getters.searchText,
  (val) => {
    // 重置请求参数
    resetQuery({
      page: 1,
      searchText: val
    })
  }
)

// 控制 pins 展示
const isVisiblePins = ref(false)

// 当前选中的 pins 属性
const currentPins = ref({})

/**
 * 进入 pins
 */
const onToPins = (item) => {
  // 改变地址栏地址，但是不进行跳转
  history.pushState(null, null, `/pins/${item.id}`)
  // 点击的item等于当前的item
  currentPins.value = item
  // 打开 isVisiblePins 展示 pins-vue
  isVisiblePins.value = true
}

useEventListener(window, 'popstate', () => {
  isVisiblePins.value = false
})

const beforeEnter = (el) => {
  gsap.set(el, {
    scaleX: 0,
    scaleY: 0,
    transformOrigin: '0 0',
    translateX: currentPins.value.localtion?.translateX,
    translateY: currentPins.value.localtion?.translateY,
    opacity: 0
  })
}
const enter = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    translateX: 0,
    translateY: 0,
    onComplete: done
  })
}
const leave = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 0,
    scaleY: 0,
    x: currentPins.value.localtion?.translateX,
    y: currentPins.value.localtion?.translateY,
    opacity: 0
  })
}
</script>
