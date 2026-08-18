<template>
  <div>
    <m-popover class="flex item-center" placement="top_left">
      <template #reference>
        <!-- 换肤图标 -->
        <m-svg-icon
          :name="svgIconName"
          class="guide-theme w-3 h-3 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-900"
          fillClass="dark:fill-zinc-300"
        ></m-svg-icon>
      </template>

      <!-- 弹窗 -->
      <div class="w-[140px] overflow-hidden">
        <div
          class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
          v-for="item in themeArr"
          :key="item.id"
          @click="onItemClick(item)"
        >
          <!-- 图标 -->
          <m-svg-icon
            :name="item.icon"
            class="guide-theme w-2 h-2 cursor-pointer rounded hover:bg-zinc-100/60"
            fillClass="fill-zinc-900 dark:fill-zinc-300"
          ></m-svg-icon>
          <!-- 文本 -->
          <span class="text-zinc-800 text-sm ml-2 dark:text-zinc-300">{{
            item.name
          }}</span>
        </div>
      </div>
    </m-popover>
  </div>
</template>

<script setup>
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from '@/constants/index.js'
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
// 构建渲染数据源
const themeArr = [
  {
    id: 0,
    type: THEME_LIGHT,
    icon: 'theme-light',
    name: '极简白'
  },
  {
    id: 1,
    type: THEME_DARK,
    icon: 'theme-dark',
    name: '极夜黑'
  },
  {
    id: 0,
    type: THEME_SYSTEM,
    icon: 'theme-system',
    name: '跟随系统'
  }
]

// 监听主题的切换行为
// 根据行为保存当前需要展示的主题到 vuex 中,展示 header-theme 下的显示图标
// 根据 vuex 中保存的当前主题，修改 html的 class

// menu 切换事件
const onItemClick = (themeItem) => {
  store.commit('theme/changeThemeType', themeItem.type)
}

// 展示图标
const svgIconName = computed(() => {
  // 根据当前的themeType返回当前选中的icon
  const findTheme = themeArr.find((theme) => {
    return theme.type === store.getters.themeType
  })
  return findTheme?.icon
})
</script>
<style scoped lang="less"></style>
