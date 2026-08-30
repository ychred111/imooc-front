<template>
  <div>
    <m-popover class="flex item-center" placement="top_left">
      <template #reference>
        <!-- 组件 -->
        <div
          v-if="$store.getters.token"
          class="guide-my relative flex item-center p-0.5 rounded-sm duration-200 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900"
        >
          <!-- 头像 -->
          <img
            v-lazy
            class="w-3 h-3 rounded-sm"
            :src="$store.getters.userInfo.avatar"
            alt=""
          />
          <!-- 下箭头 -->
          <m-svg-icon
            class="w-1.5 h-1.5 ml-0.5"
            name="dowm-arrow"
            fillClas="fill-zinc-900 dark:fill-zinc-300"
          ></m-svg-icon>
          <!-- vip 标记 -->
          <m-svg-icon
            v-if="$store.getters.userInfo.vipLevel"
            class="w-1.5 h-1.5 absolute right-[16px] bottom-0"
            name="vip"
          ></m-svg-icon>
        </div>

        <!-- 登陆按钮 -->
        <div v-else>
          <m-button
            class="guide-my"
            icon="profile"
            iconColor="#fff"
            @click="onToLogin"
          ></m-button>
        </div>
      </template>

      <!-- 弹窗 -->
      <div class="w-[140px] overflow-hidden" v-if="$store.getters.token">
        <div
          v-for="item in menuArr"
          :key="item.id"
          class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
          @click="onItemClick(item.path)"
        >
          <m-svg-icon
            :name="item.icon"
            class="w-1.5 h-1.5 mr-1"
            fillClass="fill-zinc-900 dark:fill-zinc-300"
          />
          <span class="text-zinc-800 dark:text-zinc-300 text-sm">{{
            item.title
          }}</span>
        </div>
      </div>
    </m-popover>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { confirm } from '@/libs'
import { useStore } from 'vuex'
const store = useStore()
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

// 登陆点击事件
const router = useRouter()
const onToLogin = () => {
  router.push('/login')
}

/**
 * menu Item 点击事件，也可以根据其他的 key 作为判定，比如 name
 */
const onItemClick = (path) => {
  // 有路径则进行路径跳转
  if (path) {
    // 配置跳转方式
    store.commit('app/changeRouterType', 'push')
    router.push(path)
    return
  }
  // 无路径则为退出登录
  confirm('您确定要退出登录吗？').then(() => {
    // 退出登录不存在跳转路径
    store.dispatch('user/logout')
  })
}
</script>
<style scoped lang="less"></style>
