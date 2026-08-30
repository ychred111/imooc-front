<template>
  <div class="bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800 rounded pb-1">
    <div
      class="relative w-full rounded cursor-zoom-in group"
      @click="onToPinsClick"
    >
      <!-- ::src="data.photo" -->
      <!-- 图片 -->
      <img
        v-lazy
        class="w-full rounded bg-transparent"
        :src="data.photo"
        :style="{
          height: (width / data.photoWidth) * data.photoHeight + 'px',
          backgroundColor: randomRGB()
        }"
        ref="imgTarget"
      />
      <!-- 遮罩层 -->
      <div
        :style="{
          height: (width / data.photoWidth) * data.photoHeight + 'px'
        }"
        class="hidden opacity-0 w-full h-full bg-zinc-900/50 absolute top-0 left-0 rounded duration-300 group-hover:opacity-100 xl:block"
      >
        <!-- 分享 -->
        <m-button class="absolute top-1.5 left-1.5">分享</m-button>
        <!-- 喜欢 -->
        <m-button
          class="absolute top-1.5 right-1.5"
          type="info"
          icon="heart"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
        />
        <!-- 下载 -->
        <m-button
          class="absolute bottom-1.5 left-1.5 bg-zinc-100/70"
          type="info"
          size="small"
          icon="download"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
          @click="onDownload"
        />
        <!-- 全屏 -->
        <m-button
          class="absolute bottom-1.5 right-1.5 bg-zinc-100/70"
          type="info"
          size="small"
          icon="full"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
          @click="onImgFullScreen"
        />
      </div>
      <!-- 标题 -->
      <p
        class="text-sm mt-1 font-bold text-zinc-900 dark:text-zinc-300 line-clamp-2"
        alt
      >
        {{ data.title }}
      </p>
      <!-- 作者 -->
      <div class="flex items-center mt-1 px-1">
        <!-- :src="data.avatar -->
        <img v-lazy class="h-2 w-2 rounded-full" :src="data.avatar" alt="" />
        <span class="text-sm text-zinc-500 ml-1">{{ data.author }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { randomRGB } from '@/utils/color'
import { saveAs } from 'file-saver'
import { message } from '@/libs'
import { ref, computed } from 'vue'
import { useFullscreen, useElementBounding } from '@vueuse/core'
const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  width: {
    type: Number,
    default: 0
  }
})

// 点击下载事件
const onDownload = () => {
  // 提示消息
  message('success', '图片开始下载')
  // 延迟一段时间执行，可以得到更好的体验
  setTimeout(() => {
    /**
     * 接收两个参数：
     * 1. 下载的图片链接
     * 2. 下载的文件名称
     */
    saveAs(props.data.photo, `${props.data.title} - 作者：${props.data.author}`)
  }, 100)
}

/**
 * pins 跳转处理，记录图片的中心点 (X|Y位置 + 宽|高的一半)
 *
 */
const imgContainerCenter = () => {
  const {
    x: imgContainerX,
    y: imgContainerY,
    width: imgContainerWidth,
    height: imgContainerHeight
  } = imgTarget.value.getBoundingClientRect()
  return {
    translateX: parseInt(imgContainerX + imgContainerWidth / 2),
    translateY: parseInt(imgContainerY + imgContainerHeight / 2)
  }
}

//全屏
// 1. 定义一个 ref 用来绑定目标 DOM 元素
const imgTarget = ref(null)
// // 2. 传入这个 ref，解构出 enter 方法
const { enter: onImgFullScreen } = useFullscreen(imgTarget)

const emits = defineEmits(['click'])
/**
 * 进入详情点击事件
 */
const onToPinsClick = () => {
  console.log(1111)
  // 通知父组件传递参数 调用监听的click事件 触发对应事件
  emits('click', {
    id: props.data.id,
    localtion: imgContainerCenter()
  })
}
</script>
<style scoped lang="less"></style>
