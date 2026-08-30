<template>
  <!-- 一级路由 -->
  <div class="h-screen fixed left-0 top-0 w-screen">
    <router-view></router-view>
  </div>
</template>
<script setup>
import { isMobileTerminal } from './utils/flexible'
import { onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

onMounted(() => {
  // 如果有 Token，就去请求用户信息
  if (store.state.user.token) {
    store.dispatch('user/profile')
  }
})
</script>
