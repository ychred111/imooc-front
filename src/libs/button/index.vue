<template>
  <button
    @click.stop="onBtnClick"
    class="text-sm text-center rounded duration-150 flex justify-center items-center"
    :class="[
      typeEnum[type],
      sizeEnum[sizeKey].button,
      { 'active:scale-105': isActiveAnim }
    ]"
  >
    <!-- 展示 loading -->
    <m-svg-icon
      v-if="loading"
      name="loading"
      class="w-2 h-2 animate-spin mr-1"
    />
    <!-- icon 按钮 -->
    <m-svg-icon
      v-if="icon"
      :name="icon"
      class="m-auto"
      :class="sizeEnum[sizeKey].icon"
      :color="iconColor"
      :fillClass="iconClass"
    />
    <!-- 文字按钮 -->
    <slot v-else />
  </button>
</template>
<script>
import { defineEmits } from 'vue'
// 1. 构建 type 风格可选项和 size 大小可选项
// 2. 通过 props 让开发者控制按钮
// 3. 区分 icon button 和 text button
// 4. 依据当前的数据，实现视图
// 5. 处理点击事件

// 1. 构建 type 风格可选项和 size 大小可选项
// 分别控制按钮的样式类型和尺寸大小
// type 可选项：表示按钮风格
// size 可选项：表示大小可选项
const typeEnum = {
  // 主要按钮： 白色文字 + 深灰背景（悬停更深，点击恢复）
  primary:
    'text-white bg-zinc-800 hover:bg-zinc-900 active:bg-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-700 dark:active:bg-zinc-700',
  //主题按钮：   白色文字 + 主色背景（使用项目自定义颜色变量）
  main: 'text-white bg-main hover:bg-hover-main active:bg-main dark:bg-zinc-900 dark:hover:bg-zinc-700 dark:active:bg-zinc-700',
  // 信息按钮：  深灰文字 + 浅灰背景（悬停变深，点击恢复）
  info: 'text-zinc-800 bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-200 dark:bg-zinc-300 dark:hover:bg-zinc-700 dark:active:bg-zinc-600'
}
const sizeEnum = {
  default: {
    button: 'w-8 h-4 text-base',
    icon: ''
  },
  'icon-default': {
    button: 'w-4 h-4',
    icon: 'w-1.5 h-1.5'
  },
  small: {
    button: 'w-7 h-3 text-base',
    icon: ''
  },
  'icon-small': {
    button: 'w-3 h-3',
    icon: 'w-1.5 h-1.5'
  }
}
// 点击事件常量
const EMITS_CLICK = 'click'
</script>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  // icon 图标
  icon: {
    type: String
  },
  // icon 颜色
  iconColor: {
    type: String
  },
  // icon 类名 （匹配 tailwind）
  iconClass: {
    type: String
  },
  // 按钮风格
  type: {
    type: String,
    default: 'main',
    validator(val) {
      // 获取所有的可选的按钮风格
      const keys = Object.keys(typeEnum)
      // 开发者指定风格是否在可选风格范围之内
      const res = keys.includes(val)
      // 如果不在就给开发者提示
      if (!res) {
        throw new Error(`你的 type 必须是${keys.join(',')}中的一种`)
      }
      return res
    }
  },
  // 大小风格
  size: {
    type: String,
    default: 'default',
    validator(val) {
      // 获取所有的可选大小 （注意剔除 icon 开头的元素，因为我们期望开发者输入 size='default' 都是不希望开发者输入 size='icon-default'）
      const keys = Object.keys(sizeEnum).filter((key) => !key.includes('icon'))
      // 开发者指定风格是否在可选风格范围之内
      const res = keys.includes(val)
      // 如果不在就给开发者提示
      if (!res) {
        throw new Error(`你的 size 必须是${keys.join(',')}中的一种`)
      }
      return res
    }
  },
  // 按钮点击时是否需要动画
  isActiveAnim: {
    type: Boolean,
    default: true
  },
  // 加载状态
  loading: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits([EMITS_CLICK])

// 因为我们在处理 size 的 prop 时，区分了 icon 按钮 和 文字按钮，所以说在指定类名时，需要通过一个计算属性 判定是否需要增加 icon- 前缀
// 处理大小的 key 值
const sizeKey = computed(() => {
  return props.icon ? 'icon-' + props.size : props.size
})

// 点击事件
const onBtnClick = () => {
  if (props.loading) return
  emits(EMITS_CLICK)
}
</script>
<style scoped lang="less"></style>
