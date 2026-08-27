<template>
  <div
    ref="containerTarget"
    class="group relative p-0.5 rounded-xl border-white duration-500 hover:bg-red-100/40"
  >
    <div>
      <!-- 搜索图标 -->
      <m-svg-icon
        class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] left-2"
        name="search"
        color="#707070"
      ></m-svg-icon>
      <!-- 输入框 -->
      <input
        type="text"
        class="block w-full h-[44px] pl-4 text-sm outline-0 bg-zinc-100 dark:bg-zinc-800 caret-zinc-400 rounded-xl text-zinc-900 dark:text-zinc-200 tracking-wide font-semibold border border-zinc-100 dark:border-zinc-700 duration-500 group-hover:bg-white dark:group-hover:bg-zinc-900 group-hover:border-zinc-200 dark:group-hover:border-zinc-700 focus:border-red-300"
        placeholder="搜索"
        v-model="inputValue"
        @keyup.enter="onSearchHandlder"
        @focus="onFocusHandlder"
        @blur="onBlurHandlder"
      />
      <!-- 删除按钮 -->
      <m-svg-icon
        class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] right-9 duration-500 cursor-pointer"
        name="input-delete"
        v-show="inputValue"
        @click="onClearClick"
      ></m-svg-icon>

      <!-- 分割线 -->
      <div
        class="opacity-0 h-1.5 w-[1px] absolute translate-y-[-50%] top-[50%] right-[62px] duration-500 bg-zinc-200 group-hover:opacity-100"
      ></div>
      <!-- TODO: 搜索按钮(通用组件) -->
      <m-button
        class="absolute translate-y-[-50%] top-[50%] right-1 rounded-full group-hover: opacity-100"
        icon="search"
        iconColor="#ffffff"
        @click="onSearchHandlder"
      ></m-button>
    </div>
    <!-- ----------------------------------------------------- -->
    <!-- 下拉区 -->
    <transition name="slide">
      <div
        class="max-h-[368px] w-full text-base overflow-auto bg-white dark:bg-zinc-800 absolute z-20 left-0 top-[56px] p-2 rounded border border-zinc-200 dark:border-zinc-600 duration-200 hover:shadow-3xl scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent"
        v-if="$slots.dropdown"
        v-show="isFocus"
      >
        <slot name="dropdown" />
      </div>
    </transition>
  </div>
</template>

<script>
//双向绑定
const EMIT_UPDATE_MODELVALUE = 'update:modelValue'
// 触发搜索（点击或回车）事件
const EMIT_SEARCH = 'search'
// 删除所有文本事件
const EMIT_CLEAR = 'clear'
// 输入事件
const EMIT_INPUT = 'input'
// 获取焦点事件
const EMIT_FOCUS = 'focus'
// 失去焦点事件
const EMIT_BLUR = 'blur'
</script>

<script setup>
// 输入内容实现双向数据绑定
// 搜索按钮在hover时展示，并且为圆角
// 一建清空文本
// 搜索触发功能
// 控制下拉展示区的展示
// 事件处理

import { useVModel, onClickOutside } from '@vueuse/core'
import { ref, defineEmits, watch } from 'vue'

const props = defineProps({
  modelValue: {
    require: true,
    type: String
  }
})

const inputValue = useVModel(props)

// 监听用户输入行为
watch(inputValue, (val) => {
  emits(EMIT_INPUT, val)
})

const emits = defineEmits([
  EMIT_UPDATE_MODELVALUE,
  EMIT_SEARCH,
  EMIT_CLEAR,
  EMIT_INPUT,
  EMIT_FOCUS,
  EMIT_BLUR
])

// 一建清空输入框文本
const onClearClick = () => {
  inputValue.value = ''
  emits(EMIT_CLEAR, '')
}

// 搜索触发功能
const onSearchHandlder = () => {
  emits(EMIT_SEARCH, inputValue.value)
  // console.log('search')
}

// input 是否获取到焦点
const isFocus = ref(false)
const containerTarget = ref(null)
// 获取焦点
const onFocusHandlder = () => {
  isFocus.value = true
  emits(EMIT_FOCUS)
}

// 失去焦点
const onBlurHandlder = () => {
  emits(EMIT_BLUR)
}

onClickOutside(containerTarget, () => {
  isFocus.value = false
})
</script>
<style lang="scss" scoped>
.slide-enter-active {
  transition: all 0.5s;
}

.slide-leave-active {
  transition: all 0.5s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(40px);
  opacity: 0;
}
</style>
