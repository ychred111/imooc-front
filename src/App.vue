<template>
  <!-- 一级路由 -->
  <div class="h-screen fixed left-0 top-0 w-screen">
    <router-view></router-view>
  </div>
</template>
<script setup>
import { isMobileTerminal } from './utils/flexible'
</script>
