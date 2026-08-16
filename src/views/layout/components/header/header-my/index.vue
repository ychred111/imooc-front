<template>
  <div>
    <m-popover class="flex item-center" placement="top_left">
      <template #reference>
        <!-- 组件 -->
        <div
          class="guide-my relative flex item-center p-0.5 rounded-sm duration-200 outline-none hover:bg-zinc-100"
        >
          <!-- 头像 -->
          <img class="w-3 h-3 rounded-sm" src="" alt="" />
          <!-- 下箭头 -->
          <m-svg-iocn
            class="w-1.5 h-1.5 ml-0.5"
            name="dowm-arrow"
            fillClas="fill-zinc-900"
          ></m-svg-iocn>
          <!-- vip 标记 -->
          <m-svg-iocn
            class="w-1.5 h-1.5 absolute right-[16px] bottom-0"
            name="vip"
          ></m-svg-iocn>
        </div>
      </template>

      <!-- 弹窗 -->
      <div class="w-[140px] overflow-hidden">
        <div
          v-for="item in menuArr"
          :key="item.id"
          class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60"
        >
          <m-svg-icon
            :name="item.icon"
            class="w-1.5 h-1.5 mr-1"
            fillClass="fill-zinc-900"
          />
          <span class="text-zinc-800 text-sm">{{ item.title }}</span>
        </div>
      </div>
    </m-popover>
  </div>
</template>

<script setup>
// 构建 menu 数据源
const menuArr = [
  {
    id: 0,
    title: '个人资料',
    icon: 'profile',
    path: '/profile'
  },
  {
    id: 1,
    title: '升级 VIP',
    icon: 'vip-profile',
    path: '/member'
  },
  {
    id: 2,
    title: '退出登录',
    icon: 'logout',
    path: ''
  }
]
</script>
<style scoped lang="less"></style>
